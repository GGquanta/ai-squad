import { useEffect, useRef } from 'react'
import { heroTokenStream } from '@/data/content'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Props = {
  className?: string
}

/**
 * 单条 decode 流的宏观阶段：
 * pause     — 等待下一轮生成（模拟调度 / KV cache 就绪）
 * decode    — 逐 token：compute → sample → settle
 * rollback  — 拒绝采样 / 回退重写
 * hold      — 序列完成，光标等待
 * dissolve  — 整行渐隐后换句
 */
type Phase = 'pause' | 'decode' | 'rollback' | 'hold' | 'dissolve'

/** decode 内子阶段：对应 logits → top-k 采样 → 提交 */
type DecodeStep = 'compute' | 'sample' | 'settle'

type CharState = {
  ch: string
  alpha: number
  target: number
}

type Candidate = {
  ch: string
  /** 相对权重，用于滚动减速时的视觉强调 */
  weight: number
}

type Stream = {
  x: number
  y: number
  prefix: string
  text: string
  chars: CharState[]
  phase: Phase
  decodeStep: DecodeStep
  phaseElapsed: number
  nextAction: number
  rollbackTarget: number
  cursorAlpha: number
  cursorPhase: number
  excerptIdx: number
  baseAlpha: number
  /** 当前 token 的 top-k 候选（含最终选中项） */
  candidates: Candidate[]
  /** 采样轮盘位置（浮点索引） */
  reelPos: number
  reelVelocity: number
  reelTarget: number
  settleFlash: number
  tokenIdx: number
}

const PHOTON = [18, 181, 245] as const
const ROYAL = [10, 61, 156] as const
const FONT_SIZE = 12
const CHAR_W = 7.2
const DISSOLVE_MS = 1100
const HOLD_MS = 2400
const PAUSE_MS = 320
const ROLLBACK_CHANCE = 0.18
const EDGE_FADE = 88
const CANDIDATE_K = 6

const EXCERPTS = heroTokenStream.excerpts

/** 与目标字符同族的干扰项，模拟 vocabulary 近邻 */
const LETTER_POOL = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGIT_POOL = '0123456789'
const PUNCT_POOL = '.,;:!?—-()[]{}"\''
const MIXED_POOL = LETTER_POOL + DIGIT_POOL + '_<>/=+*'

function pickExcerpt(exclude?: number) {
  let idx = Math.floor(Math.random() * EXCERPTS.length)
  if (exclude !== undefined && EXCERPTS.length > 1) {
    while (idx === exclude) idx = Math.floor(Math.random() * EXCERPTS.length)
  }
  return { idx, text: EXCERPTS[idx]!.text }
}

function poolFor(ch: string): string {
  if (ch === ' ') return ' ··__--'
  if (/[0-9]/.test(ch)) return DIGIT_POOL
  if (/[a-zA-Z]/.test(ch)) return LETTER_POOL
  if (/[,.;:!?\-—()[\]{}"']/.test(ch)) return PUNCT_POOL
  return MIXED_POOL
}

/**
 * 构造 top-k 候选：正确 token 权重最高，其余为同族干扰项。
 * 视觉上模拟 softmax 后的 nucleus / top-k 采样。
 */
function buildCandidates(chosen: string): Candidate[] {
  const pool = poolFor(chosen)
  const set = new Set<string>([chosen])
  const distractors: string[] = []
  let guard = 0
  while (distractors.length < CANDIDATE_K - 1 && guard < 40) {
    guard++
    const c = pool[Math.floor(Math.random() * pool.length)]!
    if (set.has(c)) continue
    set.add(c)
    distractors.push(c)
  }
  while (distractors.length < CANDIDATE_K - 1) {
    distractors.push(MIXED_POOL[Math.floor(Math.random() * MIXED_POOL.length)]!)
  }

  const items: Candidate[] = distractors.map((ch, i) => ({
    ch,
    weight: 0.12 + (distractors.length - i) * 0.04 + Math.random() * 0.08,
  }))
  // 将正确字符插入中间偏下位置，便于轮盘减速后落入
  const insertAt = 2 + Math.floor(Math.random() * 2)
  items.splice(insertAt, 0, { ch: chosen, weight: 0.55 + Math.random() * 0.25 })
  return items.slice(0, CANDIDATE_K)
}

function lerpAlpha(current: number, target: number, dt: number, speed = 6) {
  const next = current + (target - current) * Math.min(1, dt * speed)
  if (Math.abs(next - target) < 0.008) return target
  return next
}

function edgeFade(x: number, y: number, w: number, h: number) {
  const f = Math.min(x / EDGE_FADE, (w - x) / EDGE_FADE, y / EDGE_FADE, (h - y) / EDGE_FADE)
  return Math.max(0, Math.min(1, f))
}

function streamCountFor(w: number) {
  if (w >= 1400) return 6
  if (w >= 1100) return 5
  return 4
}

/** 将 0..n-1 打散为横向槽位，避免与纵向 index 同序排成左上→右下对角线 */
function horizontalSlot(index: number, total: number) {
  if (total <= 1) return 0
  // 与质数步进错开，使相邻行起点落在不同水平带
  return ((index * 5) % total) / (total - 1)
}

function createStream(
  index: number,
  total: number,
  width: number,
  height: number,
  excerptIdx: number,
): Stream {
  const text = EXCERPTS[excerptIdx]!.text
  // 纵向均匀；横向在可用带宽内均匀散布（右侧留白给量子核与句长延伸）
  const bandTop = height * 0.1
  const bandHeight = height * 0.72
  const y =
    bandTop + (bandHeight / Math.max(1, total - 1)) * index + (Math.random() - 0.5) * 18
  const xMin = width * 0.04
  const xMax = width * 0.58
  const x =
    xMin + (xMax - xMin) * horizontalSlot(index, total) + (Math.random() - 0.5) * width * 0.03

  return {
    x,
    y,
    prefix: `δ${String(index + 1).padStart(2, '0')} `,
    text,
    chars: [],
    phase: 'pause',
    decodeStep: 'compute',
    phaseElapsed: 0,
    nextAction: PAUSE_MS * (0.4 + (index % 5) * 0.28) + Math.random() * 400,
    rollbackTarget: 0,
    cursorAlpha: 0.4,
    cursorPhase: Math.random() * Math.PI * 2,
    excerptIdx,
    baseAlpha: 0.14 + (index % 4) * 0.025,
    candidates: [],
    reelPos: 0,
    reelVelocity: 0,
    reelTarget: 0,
    settleFlash: 0,
    tokenIdx: 0,
  }
}

/**
 * Hero 背景：多路并行 LLM decode 可视化。
 * 每 token = compute（停顿）→ sample（top-k 轮盘滚动）→ settle（块光标提交）。
 * 移动端与 prefers-reduced-motion 不渲染；离屏暂停。
 */
export function TokenStreamField({ className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    let raf = 0
    let running = false
    let inView = true
    let width = 0
    let height = 0
    let streams: Stream[] = []
    let fontReady = false
    let lastTs = 0
    let charWidth = CHAR_W
    const monoFamily =
      getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() ||
      "'DM Mono', ui-monospace, monospace"

    const measureCharWidth = () => {
      ctx.font = `${FONT_SIZE}px ${monoFamily}`
      charWidth = ctx.measureText('M').width || CHAR_W
    }

    const initStreams = () => {
      const count = streamCountFor(width)
      const used = new Set<number>()
      streams = Array.from({ length: count }, (_, i) => {
        let pick = pickExcerpt()
        while (used.has(pick.idx) && used.size < EXCERPTS.length) {
          pick = pickExcerpt(pick.idx)
        }
        used.add(pick.idx)
        return createStream(i, count, width, height, pick.idx)
      })
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measureCharWidth()
      initStreams()
    }

    const beginToken = (stream: Stream) => {
      const idx = stream.tokenIdx
      if (idx >= stream.text.length) {
        stream.phase = 'hold'
        stream.phaseElapsed = 0
        stream.nextAction = HOLD_MS
        return
      }
      const ch = stream.text[idx]!
      stream.candidates = buildCandidates(ch)
      stream.reelTarget = stream.candidates.findIndex((c) => c.ch === ch)
      if (stream.reelTarget < 0) stream.reelTarget = 0
      stream.reelPos = Math.random() * stream.candidates.length
      // 空格快速通过；标点稍慢；字母走完整采样
      if (ch === ' ') {
        stream.decodeStep = 'settle'
        stream.phaseElapsed = 0
        stream.nextAction = 40 + Math.random() * 30
        stream.reelVelocity = 0
        stream.reelPos = stream.reelTarget
      } else {
        stream.decodeStep = 'compute'
        stream.phaseElapsed = 0
        // 模拟 attention / FFN 延迟：句首与词首更长
        const wordStart = idx === 0 || stream.text[idx - 1] === ' '
        stream.nextAction = (wordStart ? 90 : 45) + Math.random() * (wordStart ? 110 : 70)
        stream.reelVelocity = 0
      }
      stream.settleFlash = 0
      stream.phase = 'decode'
    }

    const startSampling = (stream: Stream) => {
      stream.decodeStep = 'sample'
      stream.phaseElapsed = 0
      // 高速滚动若干圈后减速停在目标索引
      const loops = 2 + Math.floor(Math.random() * 2)
      stream.reelVelocity = 18 + Math.random() * 10
      stream.reelPos = stream.reelTarget - loops * stream.candidates.length - Math.random()
      stream.nextAction = 280 + Math.random() * 220
    }

    const commitToken = (stream: Stream) => {
      const ch = stream.text[stream.tokenIdx]!
      stream.chars.push({ ch, alpha: 0, target: stream.baseAlpha })
      stream.settleFlash = 1
      stream.tokenIdx += 1
      stream.candidates = []
      stream.reelVelocity = 0

      // 词边界偶发拒绝采样回退
      if (
        ch === ' ' &&
        stream.tokenIdx > 8 &&
        stream.tokenIdx < stream.text.length - 4 &&
        Math.random() < ROLLBACK_CHANCE
      ) {
        const rollbackCount = 3 + Math.floor(Math.random() * 5)
        stream.rollbackTarget = Math.max(0, stream.chars.length - rollbackCount)
        stream.phase = 'rollback'
        stream.phaseElapsed = 0
        stream.nextAction = 50 + Math.random() * 30
        return
      }

      if (stream.tokenIdx >= stream.text.length) {
        stream.phase = 'hold'
        stream.phaseElapsed = 0
        stream.nextAction = HOLD_MS
      } else {
        beginToken(stream)
      }
    }

    const resetStream = (stream: Stream) => {
      const pick = pickExcerpt(stream.excerptIdx)
      stream.excerptIdx = pick.idx
      stream.text = pick.text
      stream.chars = []
      stream.tokenIdx = 0
      stream.candidates = []
      stream.phase = 'pause'
      stream.decodeStep = 'compute'
      stream.phaseElapsed = 0
      stream.nextAction = PAUSE_MS + Math.random() * 600
      stream.rollbackTarget = 0
      stream.cursorAlpha = 0.35
      stream.settleFlash = 0
    }

    const updateStream = (stream: Stream, dt: number) => {
      stream.phaseElapsed += dt * 1000
      stream.cursorPhase += dt
      stream.settleFlash = Math.max(0, stream.settleFlash - dt * 3.2)

      for (const c of stream.chars) {
        c.alpha = lerpAlpha(c.alpha, c.target, dt)
      }

      if (stream.phase === 'pause') {
        stream.cursorAlpha = 0.2 + Math.sin(stream.cursorPhase * 3) * 0.08
        if (stream.phaseElapsed >= stream.nextAction) {
          stream.tokenIdx = 0
          beginToken(stream)
        }
        return
      }

      if (stream.phase === 'decode') {
        if (stream.decodeStep === 'compute') {
          // 计算期：块光标脉冲，偶发微闪表示 logits 波动
          stream.cursorAlpha = 0.45 + Math.sin(stream.cursorPhase * 14) * 0.22
          if (stream.phaseElapsed >= stream.nextAction) {
            startSampling(stream)
          }
          return
        }

        if (stream.decodeStep === 'sample') {
          // 轮盘：指数减速逼近目标索引（模拟 nucleus / top-k 收敛）
          const k = stream.candidates.length || 1
          let aim = stream.reelTarget
          while (aim < stream.reelPos) aim += k
          const dist = aim - stream.reelPos
          stream.reelVelocity = Math.max(0.8, dist * 6.5)
          stream.reelPos += stream.reelVelocity * dt
          stream.cursorAlpha = 0.55 + Math.sin(stream.cursorPhase * 22) * 0.2

          const settled =
            dist < 0.04 || (stream.phaseElapsed >= stream.nextAction && dist < 0.35)
          if (settled) {
            stream.reelPos = stream.reelTarget
            stream.reelVelocity = 0
            stream.decodeStep = 'settle'
            stream.phaseElapsed = 0
            stream.nextAction = 70 + Math.random() * 50
          }
          return
        }

        if (stream.decodeStep === 'settle') {
          stream.cursorAlpha = 0.7
          stream.reelPos = stream.reelTarget
          if (stream.phaseElapsed >= stream.nextAction) {
            commitToken(stream)
          }
          return
        }
      }

      if (stream.phase === 'rollback') {
        stream.cursorAlpha = 0.5 + Math.sin(stream.cursorPhase * 18) * 0.25
        if (stream.phaseElapsed >= stream.nextAction) {
          const last = stream.chars[stream.chars.length - 1]
          if (last) {
            last.target = 0
            if (last.alpha < 0.02) {
              stream.chars.pop()
              stream.tokenIdx = Math.max(0, stream.tokenIdx - 1)
            }
          }
          if (stream.chars.length <= stream.rollbackTarget) {
            stream.tokenIdx = stream.chars.length
            beginToken(stream)
          } else {
            stream.phaseElapsed = 0
            stream.nextAction = 42 + Math.random() * 28
          }
        }
        return
      }

      if (stream.phase === 'hold') {
        stream.cursorAlpha = 0.28 + Math.sin(stream.cursorPhase * 4.5) * 0.18
        if (stream.phaseElapsed >= stream.nextAction) {
          stream.phase = 'dissolve'
          stream.phaseElapsed = 0
          for (const c of stream.chars) c.target = 0
        }
        return
      }

      if (stream.phase === 'dissolve') {
        stream.cursorAlpha = lerpAlpha(stream.cursorAlpha, 0, dt, 8)
        const allGone = stream.chars.length === 0 || stream.chars.every((c) => c.alpha < 0.02)
        if (allGone || stream.phaseElapsed >= DISSOLVE_MS) {
          resetStream(stream)
        }
      }
    }

    const drawBlockCursor = (
      x: number,
      y: number,
      fade: number,
      alpha: number,
      flash: number,
    ) => {
      const a = Math.min(0.85, alpha + flash * 0.35) * fade
      if (a <= 0.01) return
      ctx.fillStyle = `rgba(${PHOTON[0]}, ${PHOTON[1]}, ${PHOTON[2]}, ${a * 0.55})`
      ctx.fillRect(x, y - 1, charWidth, FONT_SIZE + 3)
    }

    /** 在块光标内绘制 top-k 候选轮盘 */
    const drawSampleReel = (stream: Stream, x: number, y: number, fade: number) => {
      const k = stream.candidates.length
      if (k === 0) return

      const cellH = FONT_SIZE + 2
      ctx.save()
      ctx.beginPath()
      ctx.rect(x, y - 1, charWidth, cellH + 2)
      ctx.clip()

      const pos = stream.reelPos
      const base = Math.floor(pos)
      const frac = pos - base

      for (let offset = -2; offset <= 2; offset++) {
        const idx = ((base + offset) % k + k) % k
        const cand = stream.candidates[idx]!
        const cy = y + (offset - frac) * cellH
        const dist = Math.abs(offset - frac)
        const a = Math.max(0, (1 - dist * 0.55) * stream.baseAlpha * 1.6 * fade)
        if (a <= 0.01) continue
        const isCenter = dist < 0.35
        const r = isCenter ? PHOTON[0] : ROYAL[0]
        const g = isCenter ? PHOTON[1] : ROYAL[1]
        const b = isCenter ? PHOTON[2] : ROYAL[2]
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a * (0.55 + cand.weight)})`
        ctx.fillText(cand.ch === ' ' ? '·' : cand.ch, x + 1, cy)
      }
      ctx.restore()

      // 光标两侧隐约显示其余候选（logits 旁注）
      const sideX = x + charWidth + 3
      ctx.font = `${Math.max(9, FONT_SIZE - 2)}px ${monoFamily}`
      let sy = y - cellH
      for (let i = 0; i < Math.min(3, k); i++) {
        const cand = stream.candidates[i]!
        if (cand.ch === stream.text[stream.tokenIdx]) continue
        const a = 0.06 * fade * cand.weight
        ctx.fillStyle = `rgba(${ROYAL[0]}, ${ROYAL[1]}, ${ROYAL[2]}, ${a})`
        ctx.fillText(cand.ch === ' ' ? '·' : cand.ch, sideX, sy)
        sy += cellH * 0.85
      }
      ctx.font = `${FONT_SIZE}px ${monoFamily}`
    }

    const drawStream = (stream: Stream) => {
      ctx.font = `${FONT_SIZE}px ${monoFamily}`
      ctx.textBaseline = 'top'

      let x = stream.x
      const y = stream.y
      const fade = edgeFade(stream.x + 40, stream.y, width, height)

      // 前缀：decode head 编号
      ctx.fillStyle = `rgba(${ROYAL[0]}, ${ROYAL[1]}, ${ROYAL[2]}, ${0.12 * fade})`
      ctx.fillText(stream.prefix, x, y)
      x += ctx.measureText(stream.prefix).width

      for (const c of stream.chars) {
        const a = c.alpha * fade
        const w = charWidth
        if (a > 0.004) {
          const t = c.alpha / Math.max(stream.baseAlpha, 0.01)
          const r = Math.round(PHOTON[0] + (ROYAL[0] - PHOTON[0]) * (1 - t))
          const g = Math.round(PHOTON[1] + (ROYAL[1] - PHOTON[1]) * (1 - t))
          const b = Math.round(PHOTON[2] + (ROYAL[2] - PHOTON[2]) * (1 - t))
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
          ctx.fillText(c.ch, x, y)
        }
        x += w
      }

      const showCursor =
        stream.phase === 'decode' ||
        stream.phase === 'hold' ||
        stream.phase === 'pause' ||
        stream.phase === 'rollback'

      if (showCursor) {
        drawBlockCursor(x, y, fade, stream.cursorAlpha, stream.settleFlash)

        if (stream.phase === 'decode' && stream.decodeStep === 'sample') {
          drawSampleReel(stream, x, y, fade)
        } else if (stream.phase === 'decode' && stream.decodeStep === 'settle') {
          // 落定瞬间：目标字符叠在块光标上，随后提交进序列
          const ch = stream.text[stream.tokenIdx]
          if (ch && ch !== ' ') {
            ctx.fillStyle = `rgba(${PHOTON[0]}, ${PHOTON[1]}, ${PHOTON[2]}, ${0.75 * fade})`
            ctx.fillText(ch, x + 1, y)
          }
        } else if (stream.phase === 'decode' && stream.decodeStep === 'compute') {
          // 计算期：块内快速闪烁随机字符，表示正在扫 vocabulary
          const pool = MIXED_POOL
          const flicker = pool[Math.floor((stream.cursorPhase * 40) % pool.length)]!
          ctx.fillStyle = `rgba(${ROYAL[0]}, ${ROYAL[1]}, ${ROYAL[2]}, ${0.2 * fade * stream.cursorAlpha})`
          ctx.fillText(flicker, x + 1, y)
        }
      }
    }

    const draw = (ts: number) => {
      if (!running || !fontReady) return
      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0.016
      lastTs = ts

      ctx.clearRect(0, 0, width, height)

      for (const stream of streams) {
        updateStream(stream, dt)
        drawStream(stream)
      }

      // 右侧 / 边缘轻 mask，避免压量子核与主文案
      const mask = ctx.createLinearGradient(width * 0.55, 0, width * 0.92, 0)
      mask.addColorStop(0, 'rgba(250, 250, 249, 0)')
      mask.addColorStop(1, 'rgba(250, 250, 249, 0.55)')
      ctx.fillStyle = mask
      ctx.fillRect(0, 0, width, height)

      raf = requestAnimationFrame(draw)
    }

    const syncRunning = () => {
      const should = inView && !document.hidden && fontReady
      if (should && !running) {
        running = true
        lastTs = 0
        raf = requestAnimationFrame(draw)
      } else if (!should && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    }

    const onVisibility = () => syncRunning()

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? true
        syncRunning()
      },
      { threshold: 0 },
    )

    const startWhenReady = () => {
      fontReady = true
      measureCharWidth()
      syncRunning()
    }

    resize()
    observer.observe(canvas)
    document.fonts.ready.then(startWhenReady).catch(startWhenReady)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  )
}
