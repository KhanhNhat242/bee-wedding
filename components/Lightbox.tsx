'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './Icons'
import type { Photo } from '@/lib/albums'

export type LightboxItem = Photo & { caption: string }

type Props = {
  items: LightboxItem[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

const Lightbox = ({ items, index, onChange, onClose }: Props) => {
  const item = items[index]
  const go = (step: number) => onChange((index + step + items.length) % items.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [index, items.length, onChange, onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh"
      className="fixed inset-0 z-60 flex items-center justify-center bg-ink/95"
      onClick={onClose}
    >
      <figure key={item.src} className="lightbox-fade relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <Image
          src={item.src}
          alt={item.caption}
          width={item.width}
          height={item.height}
          sizes="90vw"
          className="h-auto max-h-[82svh] w-auto max-w-[92vw] object-contain"
        />
        <figcaption className="mt-4 text-xs tracking-[0.3em] text-ivory/70 uppercase">
          {item.caption} · {index + 1}/{items.length}
        </figcaption>
      </figure>

      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className="absolute top-4 right-4 grid size-12 place-items-center text-ivory/80 hover:text-gold"
      >
        <CloseIcon width={26} height={26} />
      </button>
      <button
        type="button"
        aria-label="Ảnh trước"
        onClick={(e) => {
          e.stopPropagation()
          go(-1)
        }}
        className="absolute left-2 grid size-12 place-items-center text-ivory/80 hover:text-gold md:left-6"
      >
        <ChevronLeftIcon width={30} height={30} />
      </button>
      <button
        type="button"
        aria-label="Ảnh tiếp theo"
        onClick={(e) => {
          e.stopPropagation()
          go(1)
        }}
        className="absolute right-2 grid size-12 place-items-center text-ivory/80 hover:text-gold md:right-6"
      >
        <ChevronRightIcon width={30} height={30} />
      </button>
    </div>
  )
}

export default Lightbox
