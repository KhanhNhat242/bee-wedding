import Image from 'next/image'
import type { CSSProperties } from 'react'
import SectionHeading from '../SectionHeading'
import SideOrnaments from '../SideOrnaments'
import { servicePhotos } from '@/lib/landing-photos'
import { services } from '@/lib/site-config'

// Section 3 — 3 dịch vụ chính, lưới 3 card dọc 3:4: ảnh làm nền, chữ đè ở phần dưới. Không hiển thị giá (CLAUDE.md mục 1).
const ServiceSection = () => {
  return (
    <section id="service" className="section fade-from-ivory relative bg-beige">
      <SideOrnaments variant="service" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Dịch Vụ Của Bee Wedding" />

        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {services.map((service, i) => (
            <article
              key={service.title}
              data-reveal="up"
              style={{ '--reveal-delay': `${i * 140}ms` } as CSSProperties}
              className="group relative flex aspect-3/4 flex-col justify-end overflow-hidden bg-ink shadow-[0_30px_60px_-40px_rgba(43,38,32,0.6)]"
            >
              {/* Ảnh làm nền cho cả card */}
              <Image
                src={servicePhotos[i].src}
                alt={service.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {/* Lớp phủ tối dần từ dưới lên để chữ dễ đọc; đậm thêm khi hover */}
              <div className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/60 via-55% to-ink/0" />
              <div className="absolute inset-0 bg-ink/15 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              {/* Khung viền mảnh bên trong */}
              <span className="pointer-events-none absolute inset-3 border border-ivory/25 transition-colors duration-700 group-hover:border-gold/60" />

              <div className="relative px-7 pt-7 pb-9 text-ivory sm:px-8">
                <span className="block font-serif text-3xl text-gold italic [text-shadow:0_1px_10px_rgba(43,38,32,0.7)]">0{i + 1}</span>
                <h3 className="font-serif text-2xl leading-snug font-semibold tracking-[0.08em] uppercase drop-shadow">
                  {service.title}
                </h3>
                <span className="mt-4 block h-px w-12 bg-gold transition-all duration-500 group-hover:w-20" />
                <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-ivory/85">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceSection
