import type { ReactNode } from 'react'
import { Reveal } from '@/components/layout/Reveal'

type Props = {
  id?: string
  /** 编辑式区块序号，如 '01' */
  index?: string
  eyebrow?: string
  title?: string
  intro?: string
  children: ReactNode
  className?: string
  alt?: boolean
  /** 绝对定位的装饰背景层（粒子 / 纹理），置于内容之下 */
  background?: ReactNode
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className = '',
  alt = false,
  background,
}: Props) {
  return (
    <section
      id={id}
      className={`section-pad relative scroll-mt-24 ${
        alt ? 'hairline-t bg-[var(--color-bg-alt)]' : ''
      } ${className}`}
    >
      {background}
      <div className="page-container relative">
        {(eyebrow || title || intro) && (
          <Reveal>
            <header className="mb-14 md:mb-16">
              {(index || eyebrow) && (
                <div className="mb-7 flex items-center gap-4 md:mb-9">
                  {index ? (
                    <span className="mono-label font-medium text-[var(--color-accent)]">
                      {index}
                    </span>
                  ) : null}
                  {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
                  <span className="h-px flex-1 bg-[var(--hairline)]" aria-hidden />
                </div>
              )}
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
                {title ? (
                  <h2 className="text-balance text-[length:var(--size-h2)] font-semibold tracking-[-0.025em] text-[var(--color-text)]">
                    {title}
                  </h2>
                ) : null}
                {intro ? (
                  <p className="max-w-xl text-[0.98rem] leading-[1.8] text-[var(--color-text-secondary)] lg:justify-self-end lg:pb-1.5">
                    {intro}
                  </p>
                ) : null}
              </div>
            </header>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
