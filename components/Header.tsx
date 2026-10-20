'use client'

import { useEffect, useState } from 'react'
import BrandMark from './BrandMark'
import { CloseIcon, MenuIcon, PhoneIcon } from './Icons'
import { navItems, site, tel } from '@/lib/site-config'

// Header trong suốt khi nằm trên hero, chuyển sang nền ngà mờ khi cuộn xuống.
const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open
  const hotline = site.hotlines[0]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'glass-panel border-b border-line text-ink shadow-[0_8px_30px_-20px_rgba(43,38,32,0.35)]' : 'text-ivory'
        }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="w-30 flex items-center gap-3" onClick={() => setOpen(false)}>
          <BrandMark size={60} />
        </a>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-2 text-[13px] font-medium tracking-[0.18em] uppercase"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={tel(hotline.value)}
            className={`hidden items-center gap-2 border px-5 py-2.5 text-[13px] font-medium tracking-[0.12em] transition-colors duration-300 sm:flex ${solid
              ? 'border-gold text-gold-deep hover:bg-gold hover:text-ivory'
              : 'border-ivory/60 hover:border-ivory hover:bg-ivory hover:text-ink'
              }`}
          >
            <PhoneIcon width={16} height={16} />
            {hotline.display}
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`fixed inset-x-0 top-18 bottom-0 bg-ivory transition-all duration-500 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
      >
        <nav aria-label="Điều hướng mobile" className="flex h-full flex-col items-center justify-center gap-7 pb-20">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`font-serif text-3xl text-ink transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
            >
              {item.label}
            </a>
          ))}
          <span className="mt-4 h-px w-16 bg-gold" />
          <a href={tel(hotline.value)} className="flex items-center gap-2 text-sm tracking-[0.15em] text-gold-deep">
            <PhoneIcon width={16} height={16} />
            {hotline.display}
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
