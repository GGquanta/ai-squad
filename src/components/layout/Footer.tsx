import { footer, navLinks, siteMeta } from '@/data/content'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
      <div className="page-container py-12 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-[1.05rem] font-semibold text-[var(--color-deep)]">
              {siteMeta.brand}
            </p>
            <p className="mt-2 text-[0.9rem] text-[var(--color-text-secondary)]">
              {siteMeta.company}
            </p>
            <p className="mt-4 text-[0.85rem] leading-relaxed text-[var(--color-text-muted)]">
              {footer.note}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-[0.9rem] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-structure)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteMeta.github}
              target="_blank"
              rel="noreferrer"
              className="text-[0.9rem] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-structure)]"
            >
              GitHub
            </a>
          </div>
        </div>

        <p className="mt-10 text-[0.8rem] text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} {siteMeta.companyBrand} · AI 研究小组
        </p>
      </div>
    </footer>
  )
}
