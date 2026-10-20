import Image from 'next/image'
import ContactForm from './ContactForm'
import { MapPinIcon, PhoneIcon } from '../Icons'
import { contactBackdrop } from '@/lib/landing-photos'
import { site, tel } from '@/lib/site-config'

// Section 7 — Thông tin liên hệ + form nhận tư vấn, nền be với ảnh mờ nghệ thuật phía sau.
const ContactSection = () => {
  return (
    <section id="lien-he" className="section relative overflow-hidden bg-beige">
      <Image
        src={contactBackdrop.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20 blur-[2px] grayscale-[30%]"
      />
      <div className="absolute inset-0 bg-linear-to-b from-beige via-beige/70 to-beige" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div data-reveal="left">
          <p className="flex items-center gap-4 text-xs font-medium tracking-[0.35em] text-gold-deep uppercase">
            <span className="h-px w-10 bg-gold" />
            Liên hệ
          </p>
          <h2 className="mt-4 mb-10 font-serif text-4xl leading-tight font-medium text-ink md:mb-12 md:text-5xl">
            Liên Hệ Tư Vấn
          </h2>

          <dl className="space-y-6">
            <div className="flex gap-4">
              <MapPinIcon className="mt-0.5 shrink-0 text-gold" />
              <div>
                <dt className="text-xs tracking-[0.25em] text-ink-soft uppercase">Địa chỉ</dt>
                <dd className="mt-1 text-lg text-ink">{site.address}</dd>
              </div>
            </div>
            <div className="flex gap-4">
              <PhoneIcon className="mt-0.5 shrink-0 text-gold" />
              <div>
                <dt className="text-xs tracking-[0.25em] text-ink-soft uppercase">Hotline / Zalo</dt>
                <dd className="mt-1 text-lg text-ink">
                  {site.hotlines.map((h, i) => (
                    <span key={h.value}>
                      {i > 0 && <span className="mx-2 text-gold">–</span>}
                      <a href={tel(h.value)} className="hover:text-gold-deep">
                        {h.display}
                      </a>
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <a
              href={tel(site.hotlines[0].value)}
              className="bg-gold px-4 py-3.5 text-center text-[13px] font-medium tracking-[0.16em] text-ivory uppercase transition-colors hover:bg-gold-deep"
            >
              Gọi ngay
            </a>
            <a
              href={site.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold px-4 py-3.5 text-center text-[13px] font-medium tracking-[0.16em] text-gold-deep uppercase transition-colors hover:bg-gold hover:text-ivory"
            >
              Nhắn Zalo
            </a>
            <a
              href={site.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold px-4 py-3.5 text-center text-[13px] font-medium tracking-[0.16em] text-gold-deep uppercase transition-colors hover:bg-gold hover:text-ivory"
            >
              Mở chỉ đường
            </a>
          </div>
        </div>

        <div data-reveal="right" className="bg-ivory p-7 shadow-[0_40px_80px_-50px_rgba(43,38,32,0.55)] sm:p-10">
          <h3 className="font-serif text-3xl font-medium text-ink">Đăng ký nhận tư vấn</h3>
          <p className="mt-2 mb-8 text-[15px] text-ink-soft">Để lại thông tin, Bee Wedding sẽ liên hệ lại với bạn.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
