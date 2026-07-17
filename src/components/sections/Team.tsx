import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { team } from '@/data/content'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [ref, visible] = useInViewOnce<HTMLSpanElement>()
  const [display, setDisplay] = useState(0)
  const reduced = usePrefersReducedMotion()
  const started = useRef(false)

  useEffect(() => {
    if (!visible || reduced || started.current) return
    started.current = true

    const duration = 900
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, value, visible])

  const shown = reduced ? value : display

  return (
    <span ref={ref} className="tabular">
      {shown}
      {suffix}
    </span>
  )
}

export function Team() {
  return (
    <Section id="team" eyebrow={team.eyebrow} title={team.title}>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <Reveal>
          <div className="space-y-5 text-[length:var(--size-body)] leading-[1.85] text-[var(--color-text-secondary)]">
            <p>{team.mission}</p>
            <p>{team.composition}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-3 gap-3 rounded-[var(--card-radius)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)] sm:gap-4 sm:p-6">
            {team.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[var(--color-structure)] sm:text-[2rem]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-[0.8rem] text-[var(--color-text-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <p className="mt-12 rounded-[var(--card-radius)] border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(18,181,245,0.06),rgba(10,61,156,0.04))] px-5 py-5 text-[0.98rem] leading-[1.9] text-[var(--color-text-secondary)] sm:px-7 sm:py-6">
          {team.playful.prefix}
          {team.playful.segments.map((seg, i) => (
            <span key={seg.brands}>
              {i > 0 ? '；是' : ' '}
              <span className="font-medium text-[var(--color-text)]">{seg.brands}</span>
              的
              <span className="relative -top-px ml-0.5 align-baseline text-[0.72em] tracking-wide text-[var(--color-structure)]">
                [{seg.note}]
              </span>
            </span>
          ))}
          。
        </p>
      </Reveal>
    </Section>
  )
}
