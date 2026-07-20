import { IconCheck } from '@/components/icons'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { focusAreas } from '@/data/content'

/**
 * 职责条目：编辑部式「章节目录」——
 * 大号 mono 序号作锚点，中英双层题名，描述独占舒适栏宽；
 * 发丝分隔 + 顶缘短彩线，不用卡片、不加无链接箭头。
 */
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
      <div className="border-t border-[var(--hairline)]">
        {focusAreas.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <article className="group relative border-b border-[var(--hairline)]">
              {/* 顶缘品牌短彩线：默认收敛，hover 延展 */}
              <span
                className="pointer-events-none absolute left-0 top-[-1px] h-[2px] w-8 bg-[linear-gradient(90deg,var(--royal),var(--photon))] transition-[width] duration-300 ease-[var(--ease-out)] group-hover:w-16"
                aria-hidden
              />

              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-3 py-7 transition-[padding] duration-200 sm:gap-x-7 sm:py-8 lg:grid-cols-[4.5rem_minmax(12rem,20rem)_minmax(0,1fr)] lg:gap-x-10 lg:py-9 lg:group-hover:pl-1.5">
                <span
                  className="font-mono text-[1.75rem] font-medium leading-none tracking-[-0.04em] text-[var(--color-text-muted)] tabular-nums transition-colors duration-[var(--duration-fast)] group-hover:text-[var(--color-accent)] sm:text-[2rem]"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="min-w-0 self-start pt-1 lg:pt-1.5">
                  <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[var(--color-text)] sm:text-[1.25rem]">
                    {item.title}
                  </h3>
                  <p className="mono-label mt-2 text-[var(--color-text-muted)] transition-colors duration-[var(--duration-fast)] group-hover:text-[var(--color-structure)]">
                    {item.label}
                  </p>
                </div>

                <p className="col-span-2 max-w-[38rem] text-[0.95rem] leading-[1.85] text-[var(--color-text-secondary)] lg:col-span-1 lg:col-start-3 lg:max-w-none lg:pt-1.5 xl:max-w-[36rem]">
                  {item.desc}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.14}>
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
