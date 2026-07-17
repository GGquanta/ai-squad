import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { join } from '@/data/content'

export function JoinUs() {
  return (
    <Section id="join" eyebrow={join.eyebrow} title={join.title} intro={join.intro}>
      <div className="grid gap-4 lg:grid-cols-3">
        {join.stages.map((stage, index) => (
          <Reveal key={stage.period} delay={index * 0.05}>
            <article className="h-full rounded-[var(--card-radius)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
              <p className="text-[0.8rem] font-semibold tracking-wide text-[var(--color-accent)]">
                {stage.period}
              </p>
              <ul className="mt-4 space-y-3">
                {stage.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.92rem] leading-relaxed text-[var(--color-text-secondary)]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-structure)]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {join.culture.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.04}>
            <article className="rounded-[var(--card-radius)] border border-[var(--color-border)] bg-[var(--mist)]/70 p-5">
              <h3 className="text-[1rem] font-semibold text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--color-text-secondary)]">
                {item.desc}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {join.roles.map((role, index) => (
          <Reveal key={role.title} delay={index * 0.05}>
            <article className="rounded-[var(--card-radius)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em]">
                {role.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.75] text-[var(--color-text-secondary)]">
                {role.focus}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <div className="mt-12 rounded-[var(--card-radius)] border border-[var(--color-border)] bg-[linear-gradient(120deg,rgba(10,61,156,0.06),rgba(18,181,245,0.08))] px-6 py-8 text-center sm:px-10">
          <p className="text-[1.05rem] font-medium text-[var(--color-deep)]">
            {join.cta.label}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">
            {join.cta.note}
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
