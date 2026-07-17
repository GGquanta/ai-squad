import { ParticleField } from '@/components/effects/ParticleField'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { vision } from '@/data/content'

export function Vision() {
  return (
    <Section id="vision" alt className="relative overflow-hidden" eyebrow={vision.eyebrow} title={vision.title}>
      <ParticleField density={0.00003} className="opacity-50" />
      <div className="relative">
        <Reveal>
          <div className="max-w-3xl space-y-5 text-[length:var(--size-body)] leading-[1.85] text-[var(--color-text-secondary)]">
            {vision.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {vision.pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <article className="h-full rounded-[var(--card-radius)] border border-[var(--color-border)] bg-white/90 p-6 backdrop-blur-sm">
                <h3 className="text-[1.1rem] font-semibold text-[var(--color-deep)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.75] text-[var(--color-text-secondary)]">
                  {pillar.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
