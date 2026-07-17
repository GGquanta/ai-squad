import { ParticleField } from '@/components/effects/ParticleField'
import { IconNodes, IconShieldCheck, IconVenn } from '@/components/icons'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { vision } from '@/data/content'

const pillarIcons = [IconVenn, IconShieldCheck, IconNodes]

/** 缓慢自转的量子轨道装饰 */
function OrbitDecoration() {
  return (
    <div
      className="pointer-events-none absolute -right-28 top-1/2 hidden -translate-y-1/2 opacity-[0.14] lg:block"
      aria-hidden
    >
      <svg
        width="480"
        height="480"
        viewBox="0 0 480 480"
        fill="none"
        className="orbit-spin"
      >
        <ellipse
          cx="240"
          cy="240"
          rx="230"
          ry="92"
          stroke="#0A3D9C"
          strokeOpacity="0.55"
          transform="rotate(-18 240 240)"
        />
        <ellipse
          cx="240"
          cy="240"
          rx="230"
          ry="92"
          stroke="#0A3D9C"
          strokeOpacity="0.32"
          transform="rotate(42 240 240)"
        />
        <ellipse
          cx="240"
          cy="240"
          rx="230"
          ry="92"
          stroke="#12B5F5"
          strokeOpacity="0.45"
          transform="rotate(102 240 240)"
        />
        <circle cx="240" cy="240" r="5" fill="#0A3D9C" fillOpacity="0.6" />
        <circle cx="458" cy="169" r="4" fill="#12B5F5" />
        <circle cx="69" cy="86" r="3" fill="#0A3D9C" fillOpacity="0.7" />
        <circle cx="192" cy="464" r="3.5" fill="#12B5F5" fillOpacity="0.8" />
      </svg>
    </div>
  )
}

export function Vision() {
  return (
    <Section
      id="vision"
      alt
      index="04"
      eyebrow={vision.eyebrow}
      title={vision.title}
      className="overflow-hidden"
      background={
        <>
          <ParticleField density={0.000022} className="opacity-45" />
          <OrbitDecoration />
        </>
      }
    >
      <Reveal>
        <p className="max-w-3xl text-balance text-[length:var(--size-lede)] font-medium leading-[1.72] tracking-[-0.012em] text-[var(--color-text)]">
          {vision.paragraphs[0]}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-6 max-w-3xl text-[length:var(--size-body)] leading-[1.85] text-[var(--color-text-secondary)]">
          {vision.paragraphs[1]}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-x-10 gap-y-10 md:grid-cols-3">
        {vision.pillars.map((pillar, index) => {
          const Icon = pillarIcons[index % pillarIcons.length]!
          return (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <article className="relative h-full border-t border-[var(--hairline-strong)] pt-6">
                <span
                  className="absolute left-0 top-[-1.5px] h-[2px] w-12 bg-[linear-gradient(90deg,var(--royal),var(--photon))]"
                  aria-hidden
                />
                <Icon className="h-6 w-6 text-[var(--color-structure)]" />
                <h3 className="mt-4 text-[1.1rem] font-semibold text-[var(--color-deep)]">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-[1.75] text-[var(--color-text-secondary)]">
                  {pillar.desc}
                </p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
