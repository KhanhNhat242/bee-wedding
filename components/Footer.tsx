import BrandMark from './BrandMark'
import { FacebookIcon } from './Icons'
import { navItems, site, tel } from '@/lib/site-config'

const Footer = () => {
  return (
    <footer className="bg-ink text-ivory/75">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-16 pb-10 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-4">
            <BrandMark size={56} />
            <span className="font-serif text-2xl tracking-[0.28em] text-ivory">BEE WEDDING</span>
          </div>
          <p className="mt-5 max-w-sm font-serif text-lg text-ivory/70 italic">{site.slogan}</p>
        </div>

        <nav aria-label="Liên kết cuối trang">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Khám phá</p>
          <ul className="mt-5 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Liên hệ</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>{site.address}</li>
            {site.hotlines.map((h) => (
              <li key={h.value}>
                <a href={tel(h.value)} className="transition-colors hover:text-gold">
                  {h.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <FacebookIcon width={16} height={16} />
                facebook.com/BeeWeddingND
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs tracking-[0.15em] text-ivory/45 md:px-8">
          © {site.fullName}
        </p>
      </div>
    </footer>
  )
}

export default Footer
