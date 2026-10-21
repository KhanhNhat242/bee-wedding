'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import SectionHeading from '../SectionHeading'
import SideOrnaments from '../SideOrnaments'
import Lightbox, { type LightboxItem } from '../Lightbox'
import { getAlbum } from '@/lib/albums'
import { galleryTabs } from '@/lib/landing-photos'
import { GALLERY_HASH_PREFIX } from './gallery-hash'

const INITIAL_COUNT = 12

// Số cột theo breakpoint: mobile 2, md 3, lg 4. Mỗi bố cục render sẵn và ẩn/hiện bằng CSS,
// ảnh để lazy nên bố cục bị ẩn không tải ảnh.
const LAYOUTS = [
  { columns: 2, className: 'flex md:hidden' },
  { columns: 3, className: 'hidden md:flex lg:hidden' },
  { columns: 4, className: 'hidden lg:flex' },
]

// Ảnh dọc xen kẽ crop 4:5 để các cột so le có nhịp; ảnh ngang giữ nguyên tỷ lệ.
const ratioOf = (photo: LightboxItem, i: number) => {
  const natural = photo.height / photo.width
  return natural > 1 && i % 3 === 1 ? 1.25 : natural
}

// Xếp ảnh vào cột đang thấp nhất, rồi co giãn nhẹ tỷ lệ crop từng cột (tối đa ±20%) để đáy các cột bằng nhau.
const distribute = (photos: LightboxItem[], columns: number) => {
  const cols = Array.from({ length: columns }, () => ({ height: 0, items: [] as { index: number; ratio: number }[] }))
  photos.forEach((photo, index) => {
    const ratio = ratioOf(photo, index)
    const target = cols.reduce((min, c) => (c.height < min.height ? c : min), cols[0])
    target.items.push({ index, ratio })
    target.height += ratio
  })
  const mean = cols.reduce((sum, c) => sum + c.height, 0) / columns
  return cols.map((c) => {
    const factor = Math.min(1.2, Math.max(0.8, mean / c.height))
    return c.items.map((item) => ({ ...item, ratio: item.ratio * factor }))
  })
}

// Lấy xen kẽ ảnh từ nhiều album để tab "Tất cả" không bị dồn một concept.
const collect = (slugs: string[]): LightboxItem[] => {
  const lists = slugs.map((slug) => {
    const album = getAlbum(slug)
    return album.photos.filter((p) => p.listed).map((p) => ({ ...p, caption: album.title }))
  })
  const result: LightboxItem[] = []
  for (let i = 0; i < Math.max(...lists.map((l) => l.length)); i++) {
    for (const list of lists) if (list[i]) result.push(list[i])
  }
  return result
}

// Section 4 — Bộ sưu tập nổi bật: masonry + tab lọc + lightbox.
const GallerySection = () => {
  const [tab, setTab] = useState(galleryTabs[0].key)
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const itemsByTab = useMemo(
    () => Object.fromEntries(galleryTabs.map((t) => [t.key, collect(t.albums)])),
    [],
  )
  const items = itemsByTab[tab]
  const visible = expanded ? items : items.slice(0, INITIAL_COUNT)

  const selectTab = (key: string) => {
    setTab(key)
    setExpanded(false)
  }

  // Neo #bst-<tab> (từ nút "Tìm hiểu thêm về Bee House") → mở đúng tab rồi cuộn tới lưới ảnh
  useEffect(() => {
    const applyHash = () => {
      const key = window.location.hash.slice(1 + GALLERY_HASH_PREFIX.length)
      if (!window.location.hash.startsWith(`#${GALLERY_HASH_PREFIX}`) || !itemsByTab[key]) return
      selectTab(key)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [itemsByTab])

  const close = useCallback(() => setActive(null), [])

  return (
    <section id="collection" ref={sectionRef} className="section fade-from-beige relative bg-ivory">
      <SideOrnaments variant="gallery" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Bộ Sưu Tập Nổi Bật" />

        <div
          role="tablist"
          aria-label="Lọc bộ sưu tập"
          data-reveal="up"
          className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 md:mb-12"
        >
          {galleryTabs.map((t) => {
            const selected = t.key === tab
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectTab(t.key)}
                className={`shrink-0 border px-5 py-2.5 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${selected
                    ? 'border-gold bg-gold text-ivory'
                    : 'border-line text-ink-soft hover:border-gold hover:text-gold-deep'
                  }`}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {LAYOUTS.map((layout) => (
          <div key={`${tab}-${layout.columns}`} className={`${layout.className} items-start gap-3 md:gap-5`}>
            {distribute(visible, layout.columns).map((column, c) => (
              <div key={c} className="flex flex-1 flex-col gap-3 md:gap-5">
                {column.map(({ index, ratio }) => {
                  const photo = visible[index]
                  return (
                    <button
                      key={photo.src}
                      type="button"
                      data-reveal="up"
                      style={{ '--reveal-delay': `${c * 90}ms`, aspectRatio: `1 / ${ratio}` } as CSSProperties}
                      onClick={() => setActive(index)}
                      className="group relative block w-full cursor-zoom-in overflow-hidden bg-beige"
                      aria-label={`Xem ảnh ${photo.caption}`}
                    >
                      <Image
                        src={photo.src}
                        alt={`Ảnh cưới concept ${photo.caption}`}
                        fill
                        sizes={`${Math.round(100 / layout.columns)}vw`}
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                      />
                      <span className="absolute inset-0 flex items-end bg-linear-to-t from-ink/65 via-ink/0 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <span className="translate-y-2 text-left font-serif text-lg text-ivory italic transition-transform duration-500 group-hover:translate-y-0">
                          {photo.caption}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        ))}

        {!expanded && items.length > INITIAL_COUNT && (
          <div data-reveal="up" className="mt-10 text-center md:mt-14">
            {/* TODO: chuyển thành link /catalog khi có trang catalog riêng */}
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-block border border-gold px-6 py-4 text-[13px] font-medium tracking-[0.14em] text-gold-deep uppercase transition-colors duration-300 hover:bg-gold hover:text-ivory sm:px-10 sm:tracking-[0.2em]"
            >
              Xem toàn bộ Catalog ({items.length} ảnh)
            </button>
          </div>
        )}
      </div>

      {active !== null && <Lightbox items={visible} index={active} onChange={setActive} onClose={close} />}
    </section>
  )
}

export default GallerySection
