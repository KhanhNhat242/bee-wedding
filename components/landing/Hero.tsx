import Image from 'next/image'
import type { CSSProperties } from 'react'
import BrandMark from '../BrandMark'
import { heroPanels, heroSlides } from '@/lib/landing-photos'
import { site } from '@/lib/site-config'

const delay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties

// Màn hình đầu: dải ảnh đa khung theo tinh thần banner "PREMIUM Collection".
// Cao bằng 1 màn hình nhưng tối đa 56rem (896px): màn hình lớn không bị hero chiếm quá nhiều, section sau lộ ra phía dưới.
const Hero = () => {
  return (
    <section id="top" className="relative h-svh max-h-224 min-h-150 overflow-hidden bg-ink">
      {/* Chỉ ảnh chính của mỗi bố cục tải eager; còn lại lazy nên bố cục bị ẩn theo breakpoint không tải ảnh */}
      {/* Desktop / tablet: dải khung ảnh dọc, khung giữa nằm sau khối chữ */}
      <div className="absolute inset-0 hidden gap-1.5 bg-ivory md:flex">
        {heroPanels.map((photo, i) => (
          <div
            key={photo.src}
            className={`hero-panel relative flex-1 overflow-hidden ${i === 0 || i === 4 ? 'hidden lg:block' : ''}`}
            style={delay(120 * Math.abs(i - 2))}
          >
            <Image
              src={photo.src}
              alt="Ảnh cưới Bee Wedding"
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 34vw, 1px"
              fetchPriority={i === 2 ? 'high' : 'auto'}
              loading={i === 2 ? 'eager' : 'lazy'}
              className="hero-drift object-cover"
            />
          </div>
        ))}
      </div>

      {/* Mobile: trình chiếu mờ dần */}
      <div className="absolute inset-0 md:hidden">
        {heroSlides.map((photo, i) => (
          <div
            key={photo.src}
            className="hero-slide absolute inset-0"
            style={{ '--slide-delay': `${i * 5}s` } as CSSProperties}
          >
            <Image
              src={photo.src}
              alt="Ảnh cưới Bee Wedding"
              fill
              sizes="(min-width: 768px) 1px, 100vw"
              fetchPriority={i === 0 ? 'high' : 'auto'}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lớp phủ giữ chữ dễ đọc nhưng vẫn để ảnh lên tiếng */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,38,32,0.62)_0%,rgba(43,38,32,0.35)_45%,rgba(43,38,32,0.15)_75%)]" />
      <div className="absolute inset-0 bg-linear-to-b from-ink/55 via-transparent to-ink/60" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 pt-10 text-center text-ivory">
        <h1 className="hero-text mt-8" style={delay(700)}>
          <span className="block font-serif text-[2.6rem] leading-none font-medium tracking-[0.14em] whitespace-nowrap sm:text-6xl sm:tracking-[0.22em] lg:text-7xl xl:text-8xl">
            BEE WEDDING
          </span>
          <span className="mt-5 flex items-center justify-center gap-4 text-xs tracking-[0.6em] text-ivory/85 sm:text-sm">
            <span className="h-px w-10 bg-gold sm:w-16" />
            STUDIO
            <span className="h-px w-10 bg-gold sm:w-16" />
          </span>
        </h1>

        <p
          className="hero-text mt-7 max-w-xl font-serif text-2xl leading-snug text-ivory/95 italic sm:text-3xl"
          style={delay(900)}
        >
          {site.slogan}
        </p>
      </div>
    </section>
  )
}

export default Hero
