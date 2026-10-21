import BrandMark from './BrandMark'
import { FacebookIcon, MapPinIcon, PhoneIcon } from './Icons'
import { navItems, site, tel } from '@/lib/site-config'

const Footer = () => {
  return (
    <footer className="bg-ink text-ivory/75">
      {/* Tablet: logo + slogan chiếm hàng trên, 2 cột link chia đôi hàng dưới; từ lg mới chia 3 cột */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-16 pb-10 md:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="md:col-span-2 lg:col-span-1">
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
          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a
                href={site.maps}
                target="_blank"
                rel="noopener noreferrer"
                title={site.address}
                className="inline-flex items-center gap-3 transition-colors hover:text-gold"
              >
                <MapPinIcon width={16} height={16} className="shrink-0 text-gold" />
                Địa chỉ
              </a>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon width={16} height={16} className="shrink-0 text-gold" />
              {/* Mỗi số không bị ngắt giữa chừng; thiếu chỗ thì chỉ xuống dòng sau dấu "/" */}
              <span>
                {site.hotlines.map((h, i) => (
                  <span key={h.value}>
                    {i > 0 && <span className="mx-1.5 text-ivory/40">/</span>}
                    <a href={tel(h.value)} className="whitespace-nowrap transition-colors hover:text-gold">
                      {h.display}
                    </a>
                  </span>
                ))}
              </span>
            </li>
            <li>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-gold"
              >
                <FacebookIcon width={16} height={16} className="shrink-0 text-gold" />
                Facebook
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
