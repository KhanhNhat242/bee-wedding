import Image from 'next/image'
import type { CSSProperties } from 'react'
import { ArrowRightIcon } from '../Icons'
import { beeHousePhotos } from '@/lib/landing-photos'
import { GALLERY_HASH_PREFIX } from './gallery-hash'

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties

// Section 2 — Về Bee Wedding & phim trường riêng Bee House (USP số 1). Bố cục so le 50/50.
const AboutUsSection = () => {
  const { main, inset } = beeHousePhotos

  return (
    <section id="bee-house" className="section bg-ivory">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-0">
        {/* Ảnh không gian Bee House */}
        <div className="relative lg:pr-16 lg:pb-16">
          <div data-reveal="left" className="relative aspect-4/5 overflow-hidden">
            <Image
              src={main.src}
              alt="Không gian vòm cột và đài phun nước tại phim trường Bee House"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="reveal-zoom object-cover"
            />
          </div>
          <div
            data-reveal="up"
            style={delay(250)}
            className="absolute right-0 bottom-0 hidden w-[42%] border-8 border-ivory shadow-[0_25px_50px_-25px_rgba(43,38,32,0.45)] lg:block"
          >
            <div className="relative aspect-3/4">
              <Image
                src={inset.src}
                alt="Cặp đôi chụp ảnh ngoại cảnh tại Bee House"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>
          {/* Khung viền vàng mảnh tạo chiều sâu */}
          <span
            data-reveal="blur"
            className="pointer-events-none absolute -top-5 -left-5 hidden h-40 w-40 border-t border-l border-gold lg:block"
          />
        </div>

        {/* Khối chữ nền be */}
        <div data-reveal="right" className="bg-beige px-7 py-12 sm:px-12 lg:-ml-8 lg:px-16 lg:py-20">
          <p className="flex items-center gap-4 text-xs font-medium tracking-[0.35em] text-gold-deep uppercase">
            <span className="h-px w-10 bg-gold" />
            Về Bee Wedding
          </p>
          <h2 className="mt-4 mb-10 font-serif text-4xl leading-tight font-medium text-ink md:mb-12 md:text-5xl">
            Phim trường Bee House
            <span className="mt-2 block text-2xl text-gold-deep italic md:text-3xl">Không gian độc quyền</span>
          </h2>
          <div className="space-y-5 leading-relaxed text-ink-soft">
            <p>
              Bee House là phim trường độc quyền của Bee Wedding – nơi dâu rể tìm thấy thật nhiều bối cảnh đẹp và
              khác biệt.
            </p>
            <p>
              Từng góc được chăm chút từ ánh sáng đến bố cục, để khi đứng vào khung hình là ảnh có “độ sâu” ngay –
              không phẳng, không đơn điệu như chụp phông trơn truyền thống.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection
