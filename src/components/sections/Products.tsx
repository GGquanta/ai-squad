import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { products } from '@/data/content'

export function Products() {
  return (
    <Section
      id="products"
      index="03"
      eyebrow={products.eyebrow}
      title={products.title}
      intro={products.intro}
      background={
        <div
          className="dot-grid absolute inset-x-0 top-0 h-[26rem] [mask-image:linear-gradient(180deg,#000_12%,transparent_92%)]"
          aria-hidden
        />
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.items.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.04} className="h-full">
            <article className="card gradient-ring group flex h-full flex-col p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
              <div className="flex items-center gap-4">
                <img
                  src={product.icon}
                  alt=""
                  width={96}
                  height={96}
                  className="h-24 w-24 shrink-0 rounded-2xl object-contain transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="min-w-0">
                  <h3 className="text-[1.22rem] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                    {product.name}
                  </h3>
                  <p className="mono-label mt-1.5 text-[var(--color-text-muted)] transition-colors duration-[var(--duration-fast)] group-hover:text-[var(--color-structure)]">
                    {product.nameEn}
                  </p>
                </div>
              </div>

              <p className="mt-5 flex-1 text-[0.95rem] leading-[1.75] text-[var(--color-text-secondary)]">
                {product.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--hairline)] pt-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--hairline)] bg-[var(--mist)] px-2.5 py-0.5 text-[0.72rem] font-medium text-[var(--color-structure)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
