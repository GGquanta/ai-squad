import {
  IconArrowUpRight,
  IconBranch,
  IconOpenSource,
  IconPresent,
  IconSpark,
} from '@/components/icons'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { join, siteMeta } from '@/data/content'

const cultureIcons = [IconBranch, IconSpark, IconPresent, IconOpenSource]

export function JoinUs() {
  return (
    <Section
      id="join"
      index="05"
      eyebrow={join.eyebrow}
      title={join.title}
      intro={join.intro}
    >
      {/* 培养三阶段：桌面横向时间线，移动端顺排 */}
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
        {join.stages.map((stage, index) => (
          <Reveal key={stage.period} delay={index * 0.06} className="h-full">
            <article className="relative h-full">
              <div className="relative mb-5 flex h-3.5 items-center">
                <span className="relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[var(--hairline-royal)] bg-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--photon)]" />
                </span>
                {index < join.stages.length - 1 ? (
                  <span
                    className="absolute left-6 right-[-2rem] top-1/2 hidden h-px -translate-y-1/2 bg-[var(--hairline-strong)] lg:block"
                    aria-hidden
                  />
                ) : null}
              </div>
              <p className="mono-label font-medium text-[var(--color-structure)]">
                {stage.period}
              </p>
              <ul className="mt-4 space-y-3">
                {stage.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.92rem] leading-relaxed text-[var(--color-text-secondary)]"
                  >
                    <span
                      className="mt-[0.68rem] h-1 w-1 shrink-0 rounded-full bg-[var(--color-structure)]"
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

      {/* 工作方式与文化 */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {join.culture.map((item, index) => {
          const Icon = cultureIcons[index % cultureIcons.length]!
          return (
            <Reveal key={item.title} delay={index * 0.04} className="h-full">
              <article className="card h-full p-5">
                <Icon className="h-[1.35rem] w-[1.35rem] text-[var(--color-structure)]" />
                <h3 className="mt-4 text-[1rem] font-semibold text-[var(--color-text)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--color-text-secondary)]">
                  {item.desc}
                </p>
              </article>
            </Reveal>
          )
        })}
      </div>

      {/* 在招方向 */}
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {join.roles.map((role, index) => (
          <Reveal key={role.title} delay={index * 0.05} className="h-full">
            <article className="card group h-full p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em]">
                  {role.title}
                </h3>
                <span
                  className="mono-label pt-1.5 text-[var(--color-text-muted)]"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-3 text-[0.95rem] leading-[1.75] text-[var(--color-text-secondary)]">
                {role.focus}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* 全页唯一深色点睛：深蓝渐变 CTA 横幅 */}
      <Reveal delay={0.08}>
        <div
          className="relative mt-20 overflow-hidden rounded-[1.25rem] px-6 py-14 text-center shadow-[var(--shadow-band)] sm:px-10 md:py-16"
          style={{ backgroundImage: 'var(--grad-deep-band)' }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 62% 110% at 84% -18%, rgba(18, 181, 245, 0.3), transparent 62%), radial-gradient(ellipse 40% 80% at 8% 118%, rgba(18, 181, 245, 0.14), transparent 58%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(255,255,255,0.13)_1px,transparent_1.5px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_80%_100%_at_50%_0%,#000_30%,transparent_85%)]"
            aria-hidden
          />

          <h3 className="relative text-balance text-[clamp(1.5rem,1.2rem+1.6vw,2.2rem)] font-semibold tracking-[-0.02em] text-[var(--band-text)]">
            {join.cta.label}
          </h3>
          <p className="relative mx-auto mt-4 max-w-2xl text-[0.95rem] leading-[1.9] text-[var(--band-text-dim)]">
            {join.cta.note}
          </p>
          <a
            href={siteMeta.github}
            target="_blank"
            rel="noreferrer"
            className="group relative mt-9 inline-flex items-center gap-2 rounded-[var(--btn-radius)] bg-white py-3 pl-5 pr-4 text-[0.95rem] font-medium text-[var(--color-deep)] transition-[transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(4,10,40,0.35)]"
          >
            {join.cta.action.label}
            <IconArrowUpRight className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
