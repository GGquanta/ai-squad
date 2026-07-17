import type { ReactNode } from 'react'

type Props = {
  id?: string
  eyebrow?: string
  title?: string
  intro?: string
  children: ReactNode
  className?: string
  alt?: boolean
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
  alt = false,
}: Props) {
  return (
    <section
      id={id}
      className={`section-pad scroll-mt-24 ${alt ? 'bg-[var(--color-bg-alt)]' : ''} ${className}`}
    >
      <div className="page-container">
        {(eyebrow || title || intro) && (
          <header className="mb-12 max-w-3xl md:mb-14">
            {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
            {title ? (
              <h2 className="text-balance text-[length:var(--size-h2)] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                {title}
              </h2>
            ) : null}
            {intro ? (
              <p className="mt-4 text-[length:var(--size-body)] leading-[1.8] text-[var(--color-text-secondary)]">
                {intro}
              </p>
            ) : null}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
