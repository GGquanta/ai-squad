import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ParticleField } from '@/components/effects/ParticleField'
import { IconArrowRight } from '@/components/icons'
import { hero, siteMeta } from '@/data/content'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

/** 遮罩行上升：标题逐行从行框内升起 */
function MaskedLine({
  children,
  delay,
  className = '',
}: {
  children: ReactNode
  delay: number
  className?: string
}) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <span className={`block ${className}`}>{children}</span>
  }

  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '115%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function FadeIn({
  children,
  delay,
  className = '',
}: {
  children: ReactNode
  delay: number
  className?: string
}) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ backgroundImage: 'var(--grad-hero-glow)' }}
    >
      <div className="blueprint-grid absolute inset-0" aria-hidden />
      <ParticleField className="opacity-80" />

      <div className="page-container relative flex min-h-[100svh] flex-col">
        <div className="flex flex-1 flex-col justify-center pb-16 pt-28 md:pt-32">
          <FadeIn delay={0}>
            <p className="eyebrow mb-7">
              <span className="eyebrow-dot" aria-hidden />
              {hero.eyebrow}
            </p>
          </FadeIn>

          <h1 className="max-w-5xl text-[length:var(--size-display)] font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--color-deep)]">
            <MaskedLine delay={0.08}>{hero.titleLines[0]}</MaskedLine>
            <MaskedLine delay={0.18} className="grad-text">
              {hero.titleLines[1]}
            </MaskedLine>
          </h1>

          <FadeIn delay={0.34}>
            <p className="mt-7 max-w-2xl text-[length:var(--size-body)] leading-[1.85] text-[var(--color-text-secondary)]">
              {hero.lead}
            </p>
          </FadeIn>

          <FadeIn delay={0.46}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={hero.primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-[var(--btn-radius)] bg-[var(--color-structure)] py-3 pl-5 pr-4 text-[0.95rem] font-medium text-white shadow-[var(--shadow-soft)] transition-[transform,box-shadow,background] duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:bg-[var(--color-deep)] hover:shadow-[var(--shadow-lift)]"
              >
                {hero.primaryCta.label}
                <IconArrowRight className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5" />
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-[var(--btn-radius)] border border-[var(--hairline-strong)] bg-white/70 px-5 py-3 text-[0.95rem] font-medium text-[var(--color-text)] backdrop-blur-sm transition-[transform,border-color,background] duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:border-[var(--hairline-royal)] hover:bg-white"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.65}>
          <div className="flex items-end justify-between gap-6 pb-8">
            <p className="mono-label max-w-[60%] text-[var(--color-text-muted)]">
              {siteMeta.company} · {siteMeta.companyEn}
            </p>
            <div className="flex flex-col items-center gap-2.5">
              <span className="mono-label uppercase text-[var(--color-text-muted)]">
                {hero.scrollHint}
              </span>
              <span className="scroll-line" aria-hidden />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
