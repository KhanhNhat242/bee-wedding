import Image from 'next/image'
import type { CSSProperties } from 'react'
import SectionHeading from '../SectionHeading'
import { servicePhotos } from '@/lib/landing-photos'
import { services } from '@/lib/site-config'

// Section 3 — 3 dịch vụ chính, lưới 3 card ảnh dọc 3:4. Không hiển thị giá (CLAUDE.md mục 1).
const ServicesSection = () => {
  return (
    <section id="dich-vu" className="section bg-beige">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Dịch vụ" title="Dịch Vụ Của Bee Wedding" />

        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {services.map((service, i) => (
            <article
              key={service.title}
              data-reveal="up"
              style={{ '--reveal-delay': `${i * 140}ms` } as CSSProperties}
              className="group flex flex-col bg-ivory shadow-[0_30px_60px_-45px_rgba(43,38,32,0.5)]"
            >
              <div className="relative aspect-3/4 overflow-hidden">
                <Image
                  src={servicePhotos[i].src}
                  alt={service.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex-1 px-7 pt-7 pb-9">
                <span className="block font-serif text-3xl text-gold italic">0{i + 1}</span>
                <h3 className="font-serif text-2xl leading-snug font-semibold tracking-[0.08em] text-ink uppercase">
                  {service.title}
                </h3>
                <span className="mt-4 block h-px w-12 bg-gold transition-all duration-500 group-hover:w-20" />
                <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-ink-soft">
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

        <div data-reveal="up" className="mt-12 text-center md:mt-14">
          <a
            href="#lien-he"
            className="inline-block border border-gold px-10 py-4 text-[13px] font-medium tracking-[0.2em] text-gold-deep uppercase transition-colors duration-300 hover:bg-gold hover:text-ivory"
          >
            Nhận báo giá chi tiết
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
