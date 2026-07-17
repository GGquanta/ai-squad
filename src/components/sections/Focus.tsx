import { IconArrowUpRight, IconCheck } from '@/components/icons'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { focusAreas } from '@/data/content'

export function Focus() {
  return (
    <Section
      id="focus"
      alt
      index="02"
      eyebrow={focusAreas.eyebrow}
      title={focusAreas.title}
      intro={focusAreas.intro}
    >
      <div>
        {focusAreas.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.04}>
            <article className="group border-t border-[var(--hairline)]">
              <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2.5 py-6 transition-transform duration-200 ease-[var(--ease-out)] sm:py-7 lg:grid-cols-[3.5rem_minmax(0,17rem)_minmax(0,1fr)_2.5rem] lg:gap-x-8 lg:group-hover:translate-x-1.5">
                <span className="mono-label text-[var(--color-text-muted)] transition-colors duration-[var(--duration-fast)] group-hover:text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[1.1rem] font-semibold tracking-[-0.015em] text-[var(--color-text)] sm:text-[1.18rem]">
                  {item.title}
                </h3>
                <p className="col-start-2 text-[0.95rem] leading-[1.75] text-[var(--color-text-secondary)] lg:col-start-3">
                  {item.desc}
                </p>
                <IconArrowUpRight
                  className="hidden h-[1.1rem] w-[1.1rem] -translate-x-1 self-center text-[var(--color-structure)] opacity-0 transition-[opacity,transform] duration-[var(--duration-fast)] group-hover:translate-x-0 group-hover:opacity-100 lg:block"
                  aria-hidden
                />
              </div>
            </article>
          </Reveal>
        ))}
        <div className="hairline-t" aria-hidden />
      </div>

      <Reveal delay={0.12}>
        <div className="mt-14 rounded-[var(--card-radius)] border border-[var(--hairline-royal)] bg-[linear-gradient(120deg,rgba(10,61,156,0.05),rgba(18,181,245,0.07))] p-6 sm:p-8">
          <h3 className="text-[1.1rem] font-semibold text-[var(--color-deep)]">
            {focusAreas.goals.title}
          </h3>
          <ul className="mt-6 grid gap-5 md:grid-cols-3 md:gap-8">
            {focusAreas.goals.items.map((goal) => (
              <li
                key={goal}
                className="flex gap-3 text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]"
              >
                <span
                  className="mt-0.5 flex h-5.5 w-5.5 flex-none items-center justify-center rounded-full bg-[rgba(10,61,156,0.1)] text-[var(--color-structure)]"
                  aria-hidden
                >
                  <IconCheck className="h-3.5 w-3.5" />
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
