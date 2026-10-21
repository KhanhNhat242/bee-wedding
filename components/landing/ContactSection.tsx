import Image from 'next/image'
import { MapPinIcon, PhoneIcon } from '../Icons'
import SideOrnaments from '../SideOrnaments'
import { contactBackdrop } from '@/lib/landing-photos'
import { site, tel } from '@/lib/site-config'

// Section 7 — Lời mời liên hệ căn giữa (tiêu đề, mô tả ngắn, nút gọi) trên nền ảnh showroom phủ be.
const ContactSection = () => {
  return (
    <section id="contact-us" className="relative overflow-hidden bg-beige py-24 md:py-28 lg:py-36">
      <Image
        src={contactBackdrop.src}
        alt="Showroom váy cưới Bee Wedding"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Phủ be đều để chữ căn giữa dễ đọc, ảnh vẫn hiện mờ phía sau */}
      <div className="absolute inset-0 bg-beige/80" />
      {/* Chuyển tiếp từ section "Vì sao chọn" (nền be) phía trên */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-beige to-transparent lg:h-40" />
      <SideOrnaments variant="contact" />

      <div data-reveal="up" className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <h2 className="font-serif text-4xl leading-tight font-medium text-ink md:text-5xl lg:text-6xl">
          Sẵn sàng ghi lại câu chuyện tình yêu của bạn?
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-soft md:text-lg">
          Liên hệ Bee Wedding để được tư vấn concept chụp ảnh cưới, váy cưới và dịch vụ cưới trọn gói phù hợp với
          bạn.
        </p>

        {/* Nút gọi dạng viên thuốc, có vòng sáng bao quanh */}
        <div className="mt-10 inline-flex rounded-full bg-gold/15 p-3 md:p-4">
          <a
            href={tel(site.hotlines[0].value)}
            className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-[0.12em] text-ivory uppercase shadow-[0_14px_30px_-14px_rgba(140,106,51,0.9)] transition-colors duration-300 hover:bg-gold-deep"
          >
            <PhoneIcon width={18} height={18} />
            Liên hệ tư vấn
          </a>
        </div>

        {/* Thông tin phụ: số máy + địa chỉ (mở Google Maps) */}
        <div className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-3 text-[15px] text-ink-soft sm:flex-row">
          <span className="flex items-center gap-2">
            <PhoneIcon width={16} height={16} className="shrink-0 text-gold" />
            {site.hotlines.map((h, i) => (
              <span key={h.value}>
                {i > 0 && <span className="mr-2 text-gold">/</span>}
                <a href={tel(h.value)} className="whitespace-nowrap transition-colors hover:text-gold-deep">
                  {h.display}
                </a>
              </span>
            ))}
          </span>
          <a
            href={site.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-gold-deep"
          >
            <MapPinIcon width={16} height={16} className="shrink-0 text-gold" />
            {site.address}
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
