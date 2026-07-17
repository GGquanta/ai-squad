import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { focusAreas } from '@/data/content'

export function Focus() {
  return (
    <Section
      id="focus"
      alt
      eyebrow={focusAreas.eyebrow}
      title={focusAreas.title}
      intro={focusAreas.intro}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.04}>
            <article className="h-full rounded-[var(--card-radius)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
              <p className="tabular text-[0.8rem] font-medium text-[var(--color-accent)]">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-[length:var(--size-h3)] font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.75] text-[var(--color-text-secondary)]">
                {item.desc}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 rounded-[var(--card-radius)] border border-[var(--color-border)] bg-white/80 p-6 sm:p-8">
          <h3 className="text-[1.1rem] font-semibold text-[var(--color-text)]">
            {focusAreas.goals.title}
          </h3>
          <ul className="mt-4 space-y-3">
            {focusAreas.goals.items.map((goal) => (
              <li
                key={goal}
                className="flex gap-3 text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-structure)]"
                  aria-hidden
                />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
