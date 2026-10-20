import Image from 'next/image'
import SectionHeading from '../SectionHeading'
import { momentPhotos } from '@/lib/landing-photos'

// Section 6 — Khoảnh khắc khách hàng: dải ảnh trượt vô tận (CSS), dừng khi rê chuột.
// Không ghi tên cặp đôi khi chưa được khách đồng ý (REQUIREMENTS.md mục 11).
const MomentsSection = () => {
  return (
    <section id="khoanh-khac" className="section overflow-hidden bg-ivory">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <SectionHeading eyebrow="Real Moments" title="Khoảnh Khắc Khách Hàng" className="mb-6! md:mb-8!" />
        <p data-reveal="up" className="mb-10 font-serif text-xl leading-relaxed text-ink-soft italic md:mb-12 md:text-2xl">
          “Hạnh phúc của bạn là nguồn cảm hứng lớn nhất của Bee Wedding.” Cảm ơn các cặp đôi đã tin tưởng gửi gắm
          ngày trọng đại.
        </p>
      </div>

      <div
        data-reveal="blur"
        className="marquee mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <ul className="marquee-track flex w-max gap-4 md:gap-6">
          {[...momentPhotos, ...momentPhotos].map((photo, i) => (
            <li
              key={`${photo.src}-${i}`}
              aria-hidden={i >= momentPhotos.length}
              className="relative aspect-3/4 w-56 shrink-0 overflow-hidden sm:w-64 md:w-72"
            >
              <Image
                src={photo.src}
                alt={i < momentPhotos.length ? 'Cặp đôi khách hàng tại Bee Wedding' : ''}
                fill
                sizes="288px"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default MomentsSection
