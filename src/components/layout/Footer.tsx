import { IconArrowUpRight, LogoMark } from '@/components/icons'
import { footer, navLinks, siteMeta } from '@/data/content'

export function Footer() {
  return (
    <footer className="hairline-t bg-[var(--color-bg-alt)]">
      <div className="page-container pb-10 pt-16 md:pb-12 md:pt-20">
        <p className="max-w-3xl text-balance text-[clamp(1.4rem,1.1rem+1.6vw,2.1rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-[var(--color-deep)]">
          {siteMeta.tagline}
        </p>

        <div className="mt-12 flex flex-col gap-12 border-t border-[var(--hairline)] pt-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 text-[var(--color-deep)]">
              <LogoMark className="h-6 w-6" />
              <p className="text-[1.02rem] font-semibold tracking-[-0.01em]">
                {siteMeta.brand}
              </p>
            </div>
            <p className="mt-3 text-[0.9rem] text-[var(--color-text-secondary)]">
              {siteMeta.company}
            </p>
            <p className="mt-5 text-[0.85rem] leading-relaxed text-[var(--color-text-muted)]">
              {footer.note}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            <div>
              <p className="mono-label mb-4 text-[var(--color-text-muted)]">
                {footer.columns.nav}
              </p>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="text-[0.9rem] text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-structure)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono-label mb-4 text-[var(--color-text-muted)]">
                {footer.columns.connect}
              </p>
              <a
                href={siteMeta.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 text-[0.9rem] text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-structure)]"
              >
                GitHub
                <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-[var(--duration-fast)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[var(--hairline)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8rem] text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {siteMeta.companyBrand} · AI 研究小组
          </p>
          <p className="mono-label text-[var(--color-text-muted)]">
            {siteMeta.companyEn}
          </p>
        </div>
      </div>
    </footer>
  )
}
