import { useEffect, useRef, useState } from 'react'
import { LogoMark } from '@/components/icons'
import { navLinks, siteMeta } from '@/data/content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const ids = ['top', ...navLinks.map((link) => link.id)]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

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

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // 桌面断点以上关闭移动菜单，避免横竖屏切换后 body 仍锁滚动
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const floating = scrolled || open
  const compactBar = floating

  return (
    <header
      className={`site-nav${floating ? ' site-nav--float' : ''}${open ? ' site-nav--open' : ''}`}
    >
      {open ? (
        <button
          type="button"
          className="site-nav__scrim md:hidden"
          aria-label="关闭菜单"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="site-nav__shell">
        <div
          className={`site-nav__bar page-container flex items-center justify-between ${
            compactBar ? 'h-12 md:h-14' : 'h-16 md:h-[4.25rem]'
          }`}
        >
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
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? '关闭' : '菜单'}</span>
            <span className="flex w-5 flex-col gap-[5px]">
              <span
                className={`site-nav__burger-line ${
                  open ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`site-nav__burger-line ${open ? 'opacity-0 scale-x-50' : ''}`}
              />
              <span
                className={`site-nav__burger-line ${
                  open ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-nav-panel"
          className="site-nav__panel md:hidden"
          aria-hidden={!open}
          inert={open ? undefined : true}
        >
          <div className="site-nav__panel-inner">
            <div className="site-nav__divider" aria-hidden />
            <nav
              className="site-nav__panel-nav page-container"
              aria-label="移动导航"
            >
              {navLinks.map((link, index) => {
                const isActive = active === link.id
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`site-nav__link${open ? ' nav-item-in' : ''}`}
                    style={
                      open
                        ? { animationDelay: `${80 + index * 42}ms` }
                        : undefined
                    }
                    aria-current={isActive ? 'true' : undefined}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={
                        isActive
                          ? 'font-medium text-[var(--color-structure)]'
                          : undefined
                      }
                    >
                      {link.label}
                    </span>
                    <span
                      className={`mono-label ${
                        isActive
                          ? 'text-[var(--photon)]'
                          : 'text-[var(--color-text-muted)]'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </a>
                )
              })}
            </nav>
          </div>
        </div>

        <div
          className={`site-nav__progress ${
            floating ? 'inset-x-5' : 'inset-x-0'
          }`}
          aria-hidden
        >
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--royal),var(--photon))]"
          />
        </div>
      </div>
    </header>
  )
}
