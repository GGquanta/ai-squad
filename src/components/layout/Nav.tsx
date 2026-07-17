import { useEffect, useState } from 'react'
import { navLinks, siteMeta } from '@/data/content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-[var(--duration-fast)] ${
        scrolled || open
          ? 'border-b border-[var(--color-border)] bg-[var(--frost)] shadow-[var(--shadow-soft)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="page-container flex h-16 items-center justify-between md:h-[4.25rem]">
        <a
          href="#top"
          className="text-[0.95rem] font-semibold tracking-[-0.01em] text-[var(--color-deep)]"
          onClick={() => setOpen(false)}
        >
          {siteMeta.brandShort}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="主导航">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-[0.9rem] text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-structure)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-[var(--btn-radius)] md:hidden"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? '关闭' : '菜单'}</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full rounded-full bg-[var(--color-text)] transition-transform duration-200 ${
                open ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-[var(--color-text)] transition-opacity duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-[var(--color-text)] transition-transform duration-200 ${
                open ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--color-border)] bg-[var(--paper)] md:hidden">
          <nav className="page-container flex flex-col gap-1 py-4" aria-label="移动导航">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="rounded-[var(--btn-radius)] px-3 py-3 text-[1.05rem] text-[var(--color-text)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
