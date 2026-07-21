import { useEffect, useRef, useState } from 'react'
import { LogoMark } from '@/components/icons'
import { navLinks, siteMeta } from '@/data/content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setScrolled(window.scrollY > 12)
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // iOS Safari：地址栏伸缩 / visualViewport 偏移时，固定顶栏可能离开视口顶端。
  // 将 header 钉到 visualViewport 顶部，避免栏体与屏幕顶端之间露缝。
  useEffect(() => {
    const header = headerRef.current
    const vv = window.visualViewport
    if (!header || !vv) return

    let raf = 0
    const sync = () => {
      raf = 0
      const offset = vv.offsetTop
      header.style.transform = offset ? `translate3d(0, ${offset}px, 0)` : ''
    }
    const onChange = () => {
      if (!raf) raf = requestAnimationFrame(sync)
    }

    sync()
    vv.addEventListener('resize', onChange)
    vv.addEventListener('scroll', onChange)
    window.addEventListener('scroll', onChange, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      vv.removeEventListener('resize', onChange)
      vv.removeEventListener('scroll', onChange)
      window.removeEventListener('scroll', onChange)
      header.style.transform = ''
    }
  }, [])

  useEffect(() => {
    const ids = ['top', ...navLinks.map((link) => link.id)]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // 视口中线附近的区块视为当前区块
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActive(id === 'top' ? null : id)
          }
        }
      },
      { rootMargin: '-45% 0px -52% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      ref={headerRef}
      className={`site-nav fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background,box-shadow,backdrop-filter] duration-[var(--duration-fast)] ${
        solid
          ? 'site-nav--solid border-b border-[var(--hairline)] bg-[var(--nav-solid)] shadow-[var(--shadow-soft)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="page-container flex h-16 items-center justify-between md:h-[4.25rem]">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[var(--color-deep)]"
          onClick={() => setOpen(false)}
        >
          <LogoMark className="h-7 w-7 object-contain" />
          <span className="text-[0.95rem] font-semibold tracking-[-0.01em]">
            {siteMeta.brandShort}
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="主导航">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-1 text-[0.9rem] transition-colors duration-[var(--duration-fast)] ${
                  isActive
                    ? 'font-medium text-[var(--color-structure)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-structure)]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[var(--photon)] transition-transform duration-[var(--duration-enter)] ease-[var(--ease-out)] ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden
                />
              </a>
            )
          })}
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
        <div className="hairline-t bg-[var(--paper)] md:hidden">
          <nav className="page-container flex flex-col py-4" aria-label="移动导航">
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="nav-item-in flex items-center justify-between rounded-[var(--btn-radius)] px-3 py-3.5 text-[1.02rem] text-[var(--color-text)]"
                style={{ animationDelay: `${index * 45}ms` }}
                onClick={() => setOpen(false)}
              >
                <span>{link.label}</span>
                <span className="mono-label text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
            ))}
          </nav>
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-px" aria-hidden>
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--royal),var(--photon))]"
        />
      </div>
    </header>
  )
}
