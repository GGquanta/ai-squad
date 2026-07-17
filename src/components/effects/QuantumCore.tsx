import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Props = {
  className?: string
}

type Vec3 = { x: number; y: number; z: number }

const POINT_COUNT = 240
const RING_STEPS = 110

const rotateX = (p: Vec3, a: number): Vec3 => ({
  x: p.x,
  y: p.y * Math.cos(a) - p.z * Math.sin(a),
  z: p.y * Math.sin(a) + p.z * Math.cos(a),
})

const rotateY = (p: Vec3, a: number): Vec3 => ({
  x: p.x * Math.cos(a) + p.z * Math.sin(a),
  y: p.y,
  z: -p.x * Math.sin(a) + p.z * Math.cos(a),
})

const rotateZ = (p: Vec3, a: number): Vec3 => ({
  x: p.x * Math.cos(a) - p.y * Math.sin(a),
  y: p.x * Math.sin(a) + p.y * Math.cos(a),
  z: p.z,
})

/** fibonacci 球面点阵 */
function spherePoints(): Vec3[] {
  const pts: Vec3[] = []
  const ga = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < POINT_COUNT; i++) {
    const t = (i + 0.5) / POINT_COUNT
    const y = 1 - 2 * t
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    pts.push({ x: Math.cos(ga * i) * r, y, z: Math.sin(ga * i) * r })
  }
  return pts
}

const RINGS = [
  { tiltX: 0.5, tiltZ: 0.18, radius: 1.32, speed: 0.00048, phase: 0.4 },
  { tiltX: -0.32, tiltZ: 0.62, radius: 1.18, speed: -0.00036, phase: 2.3 },
  { tiltX: 0.12, tiltZ: -0.7, radius: 1.46, speed: 0.0003, phase: 4.6 },
] as const

/**
 * 自研 Canvas 伪 3D「量子核」：fibonacci 点阵球 + 三条轨道环 + 游动光子。
 * 缓慢自转 + 指针倾斜视差；离屏与后台标签页暂停；
 * prefers-reduced-motion 下仅绘制静态帧。
 */
export function QuantumCore({ className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    // 容器在 lg 以下隐藏，直接跳过初始化
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    let raf = 0
    let running = false
    let inView = true
    let size = 0

    const points = spherePoints()

    let spin = 0.7
    const baseTiltX = -0.22
    let tiltX = baseTiltX
    let targetTiltX = baseTiltX
    let yawOffset = 0
    let targetYawOffset = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      size = parent.clientWidth
      canvas.width = Math.floor(size * dpr)
      canvas.height = Math.floor(size * dpr)
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const project = (p: Vec3, radius: number, cx: number, cy: number) => {
      const scale = 1 + p.z * 0.16
      return { x: cx + p.x * radius * scale, y: cy + p.y * radius * scale }
    }

    const drawFrame = (now: number) => {
      if (size < 40) return
      ctx.clearRect(0, 0, size, size)

      const cx = size / 2
      const cy = size / 2
      const R = size * 0.3

      // 中心光晕
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.9)
      glow.addColorStop(0, 'rgba(18, 181, 245, 0.1)')
      glow.addColorStop(0.55, 'rgba(18, 181, 245, 0.035)')
      glow.addColorStop(1, 'rgba(18, 181, 245, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, size, size)

      const orient = (p: Vec3) => rotateX(rotateY(p, spin + yawOffset), tiltX)

      // 轨道环：分段描边，透明度随深度变化
      ctx.lineWidth = 1
      for (const ring of RINGS) {
        let prev: { x: number; y: number; z: number } | null = null
        for (let s = 0; s <= RING_STEPS; s++) {
          const a = (s / RING_STEPS) * Math.PI * 2
          let p: Vec3 = { x: Math.cos(a), y: 0, z: Math.sin(a) }
          p = rotateX(rotateZ(p, ring.tiltZ), ring.tiltX)
          p = orient(p)
          const proj = project(p, R * ring.radius, cx, cy)
          if (prev) {
            const depth = ((p.z + prev.z) / 2 + 1) / 2
            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(proj.x, proj.y)
            ctx.strokeStyle = `rgba(10, 61, 156, ${0.05 + depth * 0.16})`
            ctx.stroke()
          }
          prev = { ...proj, z: p.z }
        }
      }

      // 球面点阵
      for (let i = 0; i < points.length; i++) {
        const p = orient(points[i]!)
        const depth = (p.z + 1) / 2
        const proj = project(p, R, cx, cy)
        const accent = i % 12 === 0
        const r = (accent ? 1.7 : 1.15) * (0.75 + depth * 0.45)
        const alpha = 0.14 + depth * (accent ? 0.6 : 0.42)
        ctx.beginPath()
        ctx.arc(proj.x, proj.y, r, 0, Math.PI * 2)
        ctx.fillStyle = accent
          ? `rgba(18, 181, 245, ${alpha})`
          : `rgba(10, 61, 156, ${alpha})`
        ctx.fill()
      }

      // 轨道上的游动光子
      for (const ring of RINGS) {
        const a = ring.phase + now * ring.speed
        let p: Vec3 = { x: Math.cos(a), y: 0, z: Math.sin(a) }
        p = rotateX(rotateZ(p, ring.tiltZ), ring.tiltX)
        p = orient(p)
        const depth = (p.z + 1) / 2
        const proj = project(p, R * ring.radius, cx, cy)
        const haloR = 7 + depth * 5
        const halo = ctx.createRadialGradient(
          proj.x,
          proj.y,
          0,
          proj.x,
          proj.y,
          haloR,
        )
        halo.addColorStop(0, `rgba(18, 181, 245, ${0.2 + depth * 0.3})`)
        halo.addColorStop(1, 'rgba(18, 181, 245, 0)')
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(proj.x, proj.y, haloR, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(proj.x, proj.y, 1.9 + depth * 0.9, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(18, 181, 245, ${0.45 + depth * 0.5})`
        ctx.fill()
      }

      // 核心
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(10, 61, 156, 0.75)'
      ctx.fill()
    }

    if (reduced) {
      // 静态帧：保留视觉结构，不产生任何运动
      resize()
      drawFrame(0)
      const onResize = () => {
        resize()
        drawFrame(0)
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    const loop = (now: number) => {
      if (!running) return
      spin += 0.0021
      tiltX += (targetTiltX - tiltX) * 0.045
      yawOffset += (targetYawOffset - yawOffset) * 0.045
      drawFrame(now)
      raf = requestAnimationFrame(loop)
    }

    const syncRunning = () => {
      const should = inView && !document.hidden && size >= 40
      if (should && !running) {
        running = true
        raf = requestAnimationFrame(loop)
      } else if (!should && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? true
        syncRunning()
      },
      { threshold: 0 },
    )

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0) return
      const nx = (event.clientX - (rect.left + rect.width / 2)) / rect.width
      const ny = (event.clientY - (rect.top + rect.height / 2)) / rect.height
      targetYawOffset = Math.max(-0.8, Math.min(0.8, nx)) * 0.34
      targetTiltX = baseTiltX + Math.max(-0.8, Math.min(0.8, ny)) * 0.26
    }

    const onVisibility = () => syncRunning()
    const onResize = () => {
      resize()
      syncRunning()
    }

    resize()
    observer.observe(canvas)
    syncRunning()
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return (
    <canvas ref={canvasRef} className={className} aria-hidden="true" />
  )
}
