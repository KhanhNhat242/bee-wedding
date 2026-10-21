import Image from 'next/image'
import { MapPinIcon, PhoneIcon } from '../Icons'
import SideOrnaments from '../SideOrnaments'
import { contactBackdrop } from '@/lib/landing-photos'
import { site, tel } from '@/lib/site-config'

// Section 7 — Thông tin liên hệ trên nền ảnh showroom; gradient phải → trái chuyển ảnh sang cột chữ bên trái.
// Desktop cao 1 màn hình nhưng tối đa 56rem (896px), giống Hero.
const ContactSection = () => {
  return (
    <section
      id="contact-us"
      className="relative flex min-h-[80svh] items-end overflow-hidden bg-beige md:items-center lg:h-svh lg:max-h-224 lg:min-h-150"
    >
      <Image
        src={contactBackdrop.src}
        alt="Showroom váy cưới Bee Wedding"
        fill
        sizes="100vw"
        className="object-cover object-right"
      />
      {/* Mobile: tối dần từ dưới lên vì chữ nằm dưới; từ md: chuyển từ phải (ảnh) sang trái (nền be) */}
      <div className="absolute inset-0 bg-linear-to-t from-beige via-beige/85 via-45% to-beige/10 md:bg-linear-to-l md:from-beige/0 md:via-beige/75 md:via-50% md:to-beige" />
      <SideOrnaments variant="contact" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 lg:py-0">
        <div data-reveal="left" className="max-w-md">
          <p className="flex items-center gap-4 text-xs font-medium tracking-[0.35em] text-gold-deep uppercase">
            <span className="h-px w-10 bg-gold" />
            Liên hệ
          </p>
          <h2 className="mt-4 mb-10 font-serif text-4xl leading-tight font-medium text-ink md:mb-12 md:text-5xl">
            Liên Hệ Tư Vấn
          </h2>

          <dl className="space-y-7">
            <div className="flex gap-4">
              <PhoneIcon className="mt-0.5 shrink-0 text-gold" />
              <div>
                <dt className="text-xs tracking-[0.25em] text-ink-soft uppercase">Hotline / Zalo</dt>
                <dd className="mt-1.5 text-lg text-ink md:text-xl">
                  <a href={tel(site.hotlines[0].value)} className="transition-colors hover:text-gold-deep">
                    {site.hotlines[0].display}
                  </a>
                  {site.hotlines.slice(1).map((h) => (
                    <span key={h.value}>
                      <span className="mx-2 text-gold">–</span>
                      <a href={tel(h.value)} className="transition-colors hover:text-gold-deep">
                        {h.display}
                      </a>
                    </span>
                  ))}
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPinIcon className="mt-0.5 shrink-0 text-gold" />
              <div>
                <dt className="text-xs tracking-[0.25em] text-ink-soft uppercase">Địa chỉ</dt>
                <dd className="mt-1.5 text-lg text-ink md:text-xl">
                  <a
                    href={site.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-gold/50 pb-0.5 transition-colors hover:border-gold hover:text-gold-deep"
                  >
                    {site.address}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
