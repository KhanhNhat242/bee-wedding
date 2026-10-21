import Image from 'next/image'
import type { CSSProperties } from 'react'
import SectionHeading from '../SectionHeading'
import SideOrnaments from '../SideOrnaments'
import { uspPhotos } from '@/lib/landing-photos'
import { usps } from '@/lib/site-config'

// Hàng trên: lớn – nhỏ, hàng dưới: nhỏ – lớn (so le). Rê chuột vào thẻ nhỏ thì hai thẻ đổi bề rộng (CSS .usp-row).
const rows = [
  [
    { index: 0, size: 'large' },
    { index: 1, size: 'small' },
  ],
  [
    { index: 2, size: 'small' },
    { index: 3, size: 'large' },
  ],
] as const

// Section 5 — 4 điểm khác biệt dạng bento, ảnh làm nền từng thẻ.
const UspSection = () => {
  return (
    <section id="why-us" className="section relative bg-beige">
      <SideOrnaments variant="usp" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Vì Sao Chọn Bee Wedding" />

        <div className="flex flex-col gap-4 md:gap-5">
          {rows.map((row, r) => (
            <ul key={r} className="usp-row flex flex-col gap-4 md:flex-row md:gap-5">
              {row.map(({ index, size }, c) => {
                const usp = usps[index]
                const photo = uspPhotos[index]
                return (
                  <li
                    key={usp.numeral}
                    data-size={size}
                    data-reveal="up"
                    style={{ '--reveal-delay': `${(r * 2 + c) * 120}ms` } as CSSProperties}
                    className="usp-card group relative h-80 overflow-hidden rounded-sm bg-ink md:h-90"
                  >
                    <Image
                      src={photo.src}
                      alt={usp.title}
                      fill
                      // Thẻ nào cũng có lúc giãn tới 3/5 hàng khi hover
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/40 via-55% to-ink/5" />

                    <div className="absolute inset-x-0 bottom-0 p-7 text-ivory md:p-8">
                      <span className="font-serif text-4xl leading-none text-gold italic [text-shadow:0_1px_10px_rgba(43,38,32,0.7)]">
                        {usp.numeral}
                      </span>
                      <h3 className="mt-3 font-serif text-2xl font-semibold whitespace-nowrap md:text-[1.7rem]">
                        {usp.title}
                      </h3>
                      <span className="mt-3 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-16" />
                      <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ivory/85">{usp.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UspSection
