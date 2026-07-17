import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { products } from '@/data/content'

export function Products() {
  return (
    <Section
      id="products"
      eyebrow={products.eyebrow}
      title={products.title}
      intro={products.intro}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.items.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.04}>
            <article className="group flex h-full flex-col rounded-[var(--card-radius)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:border-[rgba(10,61,156,0.18)] hover:shadow-[var(--shadow-lift)]">
              <div className="flex items-start gap-4">
                <img
                  src={product.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl"
                />
                <div>
                  <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                    {product.name}
                    <span className="ml-2 text-[0.85rem] font-medium text-[var(--color-text-muted)]">
                      {product.nameEn}
                    </span>
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[var(--mist)] px-2 py-0.5 text-[0.72rem] font-medium text-[var(--color-structure)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-5 flex-1 text-[0.95rem] leading-[1.75] text-[var(--color-text-secondary)]">
                {product.summary}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
