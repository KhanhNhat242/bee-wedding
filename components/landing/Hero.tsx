'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons'
import { heroSlides } from '@/lib/landing-photos'

const AUTOPLAY_MS = 6000
const TOTAL = heroSlides.length

// Chữ trồi lên từ sau lớp mặt nạ overflow-hidden
const MaskReveal = ({ show, delay = 0, children }: { show: boolean; delay?: number; children: ReactNode }) => (
  <div className="overflow-hidden py-1">
    <div
      className={`transition-all duration-900 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none ${show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      style={{ transitionDelay: show ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  </div>
)

// Hero: slider 4 banner, chuyển cảnh bằng màn trượt clip-path + Ken Burns, tự chạy 6s/slide.
// Chỉ tự chạy và nhận phím ←/→ khi hero đang hiện trên màn hình (tránh xung đột với lightbox bộ sưu tập).
const Hero = () => {
  const [{ current, prev }, setPos] = useState({ current: 0, prev: -1 })
  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const touchX = useRef<number | null>(null)

  const goTo = useCallback((i: number) => setPos((p) => (p.current === i ? p : { current: i, prev: p.current })), [])
  const next = useCallback(() => setPos((p) => ({ current: (p.current + 1) % TOTAL, prev: p.current })), [])
  const prevSlide = useCallback(
    () => setPos((p) => ({ current: (p.current - 1 + TOTAL) % TOTAL, prev: p.current })),
    [],
  )

  // Bật hiệu ứng intro sau lần render đầu
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setReady(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Autoplay: mỗi lần đổi slide (kể cả bấm tay) tính lại từ đầu
  useEffect(() => {
    if (!ready || !inView || reducedMotion) return
    const t = setTimeout(next, AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [current, ready, inView, reducedMotion, next])

  useEffect(() => {
    if (!inView) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inView, next, prevSlide])

  const autoplaying = ready && inView && !reducedMotion

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Bộ sưu tập ảnh cưới Bee Wedding"
      className="relative h-[78svh] max-h-170 min-h-120 w-full overflow-hidden bg-ink select-none sm:h-[82svh] lg:h-svh lg:max-h-224"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) (dx < 0 ? next : prevSlide)()
        touchX.current = null
      }}
    >
      <h1 className="sr-only">Bee Wedding Studio – Ghi lại câu chuyện tình yêu theo cách riêng của bạn</h1>

      {heroSlides.map((s, i) => {
        const active = i === current
        const leaving = i === prev
        const play = ready && active

        return (
          <article
            key={s.src}
            aria-hidden={!active}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${TOTAL}`}
            className={`absolute inset-0 motion-reduce:transition-none ${active
              ? 'z-20 transition-[clip-path] duration-1400 ease-[cubic-bezier(0.77,0,0.18,1)] [clip-path:inset(0_0_0_0)]'
              : leaving
                ? 'z-10 [clip-path:inset(0_0_0_0)]'
                : 'z-0 [clip-path:inset(0_0_0_100%)]'
              }`}
          >
            {/* Ảnh nền + Ken Burns */}
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="100vw"
              fetchPriority={i === 0 ? 'high' : 'auto'}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={`object-cover motion-reduce:scale-100 motion-reduce:transition-none ${play || leaving ? 'scale-100 transition-transform duration-8000 ease-out' : 'scale-[1.15]'
                }`}
            />

            {/* Lớp phủ giữ chữ dễ đọc */}
            <div className="absolute inset-0 bg-linear-to-r from-ink/70 via-ink/25 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-ink/30" />

            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
              <div className="pointer-events-auto mx-auto w-full max-w-7xl px-5 pb-28 md:px-8 md:pb-40 lg:pb-60">
                <div className="max-w-xl text-ivory md:max-w-2xl">
                  <MaskReveal show={play} delay={700}>
                    <p className="flex items-center gap-3 text-xs font-medium tracking-[0.35em] text-ivory/90 uppercase drop-shadow sm:text-[13px]">
                      <span className="h-px w-10 bg-gold" />
                      {s.eyebrow}
                    </p>
                  </MaskReveal>

                  <div className="mt-4 sm:mt-5">
                    {s.title.map((line, k) => (
                      <MaskReveal key={line} show={play} delay={850 + k * 150}>
                        <h2 className="font-serif text-5xl leading-[1.05] font-medium italic drop-shadow-lg sm:text-6xl lg:text-7xl">
                          {line}
                        </h2>
                      </MaskReveal>
                    ))}
                  </div>

                  <MaskReveal show={play} delay={1150}>
                    <p className="mt-3 text-xs font-medium tracking-[0.2em] text-ivory/85 uppercase sm:mt-4 sm:text-sm md:text-base">
                      {s.subtitle}
                    </p>
                  </MaskReveal>
                </div>
              </div>
            </div>
          </article>
        )
      })}

      {/* Thanh điều khiển */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
        <div className="pointer-events-auto mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 pb-6 sm:pb-8 md:px-8">
          {/* Tab đánh số + thanh tiến trình */}
          <div className="flex max-w-xl flex-1 gap-3 sm:max-w-2xl md:gap-5">
            {heroSlides.map((s, i) => {
              const on = autoplaying && i === current
              return (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Đến slide ${i + 1}: ${s.title.join(' ')}`}
                  aria-current={i === current}
                  className="group flex-1 cursor-pointer text-left text-ivory"
                >
                  <span
                    className={`flex items-baseline gap-2 text-xs tracking-widest transition-opacity md:text-sm ${i === current ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'
                      }`}
                  >
                    <span className="font-serif italic">0{i + 1}</span>
                    <span className="hidden truncate uppercase lg:block">{s.title.join(' ')}</span>
                  </span>
                  <span className="mt-2.5 block h-0.5 w-full overflow-hidden rounded-full bg-ivory/30">
                    <span
                      className={`block h-full origin-left bg-gold ${on ? 'scale-x-100 transition-transform ease-linear' : i === current ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      style={on ? { transitionDuration: `${AUTOPLAY_MS}ms` } : undefined}
                    />
                  </span>
                </button>
              )
            })}
          </div>

          {/* Nút điều hướng */}
          <div className="hidden gap-2.5 md:flex">
            {(['left', 'right'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={d === 'left' ? prevSlide : next}
                aria-label={d === 'left' ? 'Slide trước' : 'Slide sau'}
                className="grid size-11 cursor-pointer place-items-center rounded-full border border-ivory/40 text-ivory shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-gold"
              >
                {d === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
