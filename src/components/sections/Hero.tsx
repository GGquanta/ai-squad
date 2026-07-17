import { ParticleField } from '@/components/effects/ParticleField'
import { Reveal } from '@/components/layout/Reveal'
import { hero } from '@/data/content'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(18,181,245,0.08),_transparent_55%),linear-gradient(180deg,#FAFAF9_0%,#F4F6F8_100%)]"
    >
      <ParticleField className="opacity-80" />
      <div className="page-container relative flex min-h-[100svh] flex-col justify-center pb-20 pt-28 md:pb-28 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-6">{hero.eyebrow}</p>
          <h1 className="max-w-4xl text-balance text-[length:var(--size-hero)] font-semibold tracking-[-0.03em] text-[var(--color-deep)]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[length:var(--size-body)] leading-[1.85] text-[var(--color-text-secondary)]">
            {hero.lead}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center rounded-[var(--btn-radius)] bg-[var(--color-structure)] px-5 py-3 text-[0.95rem] font-medium text-white shadow-[var(--shadow-soft)] transition-[transform,box-shadow,background] duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:bg-[var(--color-deep)] hover:shadow-[var(--shadow-lift)]"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-[var(--btn-radius)] border border-[var(--color-border-strong)] bg-white/70 px-5 py-3 text-[0.95rem] font-medium text-[var(--color-text)] backdrop-blur-sm transition-[transform,border-color,background] duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:border-[var(--color-structure)] hover:bg-white"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
