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
      {suffix ? (
        <span className="ml-0.5 align-baseline text-[0.4em] font-medium tracking-normal text-[var(--color-text-secondary)]">
          {suffix}
        </span>
      ) : null}
    </span>
  )
}

export function Team() {
  return (
    <Section id="team" index="01" eyebrow={team.eyebrow} title={team.title}>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-[length:var(--size-body)] leading-[1.9] text-[var(--color-text-secondary)]">
            {team.mission}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-[length:var(--size-body)] leading-[1.9] text-[var(--color-text-secondary)]">
            {team.composition}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-16 grid grid-cols-3 border-t border-[var(--hairline)] pt-8 md:pt-10">
          {team.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`${
                index > 0 ? 'border-l border-[var(--hairline)] pl-5 sm:pl-8' : ''
              } pr-3`}
            >
              <p className="font-mono text-[clamp(2.3rem,1.5rem+3.4vw,3.9rem)] font-medium leading-none tracking-[-0.04em] text-[var(--color-structure)]">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-[0.82rem] text-[var(--color-text-muted)] sm:text-[0.88rem]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <figure className="card mt-16 overflow-hidden bg-[linear-gradient(135deg,rgba(18,181,245,0.05),rgba(255,255,255,0.6)_45%,rgba(10,61,156,0.04))] px-6 py-7 sm:px-9 sm:py-8">
          <span
            className="pointer-events-none absolute -top-3 left-3 select-none font-serif text-[6rem] leading-none text-[var(--royal)] opacity-[0.07] sm:text-[7.5rem]"
            aria-hidden
          >
            「
          </span>
          <blockquote className="relative text-[0.98rem] leading-[1.95] text-[var(--color-text-secondary)]">
            {team.playful.prefix}
            {team.playful.segments.map((seg, i) => (
              <span key={seg.brands}>
                {i > 0 ? '；是' : ' '}
                <span className="font-medium text-[var(--color-text)]">
                  {seg.brands}
                </span>
                的
                <span className="mono-label relative -top-px ml-1 text-[var(--color-structure)]">
                  [{seg.note}]
                </span>
              </span>
            ))}
            。
          </blockquote>
        </figure>
      </Reveal>
    </Section>
  )
}
