import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { team } from '@/data/content'

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

      <Reveal delay={0.12}>
        <figure className="card relative mt-12 overflow-hidden px-6 py-8 text-center sm:px-10 sm:py-9">
          <span
            className="pointer-events-none absolute -top-2 left-4 select-none text-[5rem] font-semibold leading-none text-[var(--royal)] opacity-[0.08] sm:left-6 sm:text-[6rem]"
            aria-hidden
          >
            「
          </span>
          <blockquote className="relative mx-auto max-w-3xl text-[1rem] leading-[2.05] text-[var(--color-text-secondary)] sm:text-[1.05rem]">
            {team.playful.prefix}
            {team.playful.segments.map((seg, i) => {
              const spaceBeforeDe = /[A-Za-z0-9]$/.test(seg.brands) ? ' ' : ''
              return (
                <span key={seg.brands}>
                  {i > 0 ? '；是 ' : ' '}
                  <span className="font-medium text-[var(--color-text)]">
                    {seg.brands}
                  </span>
                  {spaceBeforeDe}的
                  <span className="hl-note">{seg.note}</span>
                </span>
              )
            })}
            。
          </blockquote>
        </figure>
      </Reveal>
    </Section>
  )
}
