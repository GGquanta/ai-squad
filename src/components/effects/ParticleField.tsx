import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  /** 基础漂移速度，斥力扰动后向其回归 */
  bvx: number
  bvy: number
  r: number
  a: number
  /** photon ↔ royal 之间的颜色插值 */
  cr: number
  cg: number
  cb: number
}

type Props = {
  className?: string
  density?: number
  connectDistance?: number
}

const PHOTON = [18, 181, 245] as const
const ROYAL = [10, 61, 156] as const
const EDGE_FADE = 72
const POINTER_RADIUS = 130

/**
 * 轻量 Canvas 粒子场：品牌蓝光点 + 近距细线。
 * 空间网格近邻查找；指针轻微斥力（仅桌面）；离屏与不可见标签页暂停；
 * 移动端与 prefers-reduced-motion 不渲染。
 */
export function ParticleField({
  className = '',
  density = 0.000045,
  connectDistance = 110,
}: Props) {
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
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let running = false
    let inView = true
    const pointer = { x: -1e4, y: -1e4, active: false }

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

      const count = Math.max(18, Math.floor(width * height * density))
      particles = Array.from({ length: count }, () => {
        const vx = (Math.random() - 0.5) * 0.28
        const vy = (Math.random() - 0.5) * 0.28
        const t = Math.random()
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          bvx: vx,
          bvy: vy,
          r: Math.random() * 1.4 + 0.6,
          a: Math.random() * 0.35 + 0.15,
          cr: Math.round(PHOTON[0] + (ROYAL[0] - PHOTON[0]) * t),
          cg: Math.round(PHOTON[1] + (ROYAL[1] - PHOTON[1]) * t),
          cb: Math.round(PHOTON[2] + (ROYAL[2] - PHOTON[2]) * t),
        }
      })
    }

    /** 画布边缘渐隐系数 */
    const edgeFade = (p: Particle) => {
      const f = Math.min(
        p.x / EDGE_FADE,
        (width - p.x) / EDGE_FADE,
        p.y / EDGE_FADE,
        (height - p.y) / EDGE_FADE,
      )
      return Math.max(0, Math.min(1, f))
    }

    const step = (p: Particle) => {
      if (pointer.active) {
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const dist = Math.hypot(dx, dy)
        if (dist > 0.5 && dist < POINTER_RADIUS) {
          const force = ((1 - dist / POINTER_RADIUS) * 0.055) / dist
          p.vx += dx * force
          p.vy += dy * force
        }
      }
      // 扰动后缓慢回归基础漂移
      p.vx = p.vx * 0.955 + p.bvx * 0.045
      p.vy = p.vy * 0.955 + p.bvy * 0.045

      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > width) {
        p.vx *= -1
        p.bvx *= -1
        p.x = Math.max(0, Math.min(width, p.x))
      }
      if (p.y < 0 || p.y > height) {
        p.vy *= -1
        p.bvy *= -1
        p.y = Math.max(0, Math.min(height, p.y))
      }
    }

    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        step(p)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.cr}, ${p.cg}, ${p.cb}, ${p.a * edgeFade(p)})`
        ctx.fill()
      }

      // 空间网格近邻查找，避免 O(n²) 全量比对
      const cell = connectDistance
      const cols = Math.max(1, Math.ceil(width / cell))
      const rows = Math.max(1, Math.ceil(height / cell))
      const grid: number[][] = Array.from({ length: cols * rows }, () => [])
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(p.x / cell)))
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(p.y / cell)))
        grid[cy * cols + cx]!.push(i)
      }

      ctx.lineWidth = 1
      const compare = (i: number, j: number) => {
        const a = particles[i]!
        const b = particles[j]!
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.hypot(dx, dy)
        if (dist < connectDistance) {
          const alpha =
            (1 - dist / connectDistance) * 0.17 * Math.min(edgeFade(a), edgeFade(b))
          if (alpha <= 0.004) return
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(10, 61, 156, ${alpha})`
          ctx.stroke()
        }
      }

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const bucket = grid[cy * cols + cx]!
          // 同格内两两比较
          for (let m = 0; m < bucket.length; m++) {
            for (let n = m + 1; n < bucket.length; n++) {
              compare(bucket[m]!, bucket[n]!)
            }
          }
          // 与右、左下、下、右下四个方向的邻格比较（避免重复）
          for (const [ox, oy] of [
            [1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
          ] as const) {
            const nx = cx + ox
            const ny = cy + oy
            if (nx < 0 || nx >= cols || ny >= rows) continue
            const neighbor = grid[ny * cols + nx]!
            for (const i of bucket) {
              for (const j of neighbor) {
                compare(i, j)
              }
            }
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const syncRunning = () => {
      const should = inView && !document.hidden
      if (should && !running) {
        running = true
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

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active =
        pointer.x >= 0 && pointer.x <= rect.width && pointer.y >= 0 && pointer.y <= rect.height
    }
    const onPointerLeave = () => {
      pointer.active = false
    }

    resize()
    observer.observe(canvas)
    syncRunning()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [connectDistance, density, reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  )
}
