// Ảnh dùng cho landing page — chọn tay từ kho ảnh (chỉ số theo thứ tự file trong album).
import { getAlbum, type Photo } from './albums'

const at = (slug: string, index: number): Photo => getAlbum(slug).photos[index]

export type GalleryTab = { key: string; label: string; albums: string[] }

// Dải ảnh hero: ảnh giữa (index 2) nằm sau khối chữ nên chọn tông ấm, ít chi tiết.
export const heroPanels: Photo[] = [
  at('new-concept-2026', 9),
  at('modern-romantic', 3),
  at('pre-wedding-phuong-thao-tien-dat', 4),
  at('bee-house-outdoor', 8),
  at('new-concept-2026', 17),
]

// Hero trên mobile: trình chiếu mờ dần từng ảnh.
export const heroSlides: Photo[] = [
  at('pre-wedding-phuong-thao-tien-dat', 4),
  at('bee-house-outdoor', 8),
  at('new-concept-2026', 9),
  at('modern-romantic', 15),
]

export const beeHousePhotos = {
  main: at('bee-house-outdoor', 10),
  inset: at('bee-house-outdoor', 4),
}

// Cùng thứ tự với `services` trong site-config.
export const servicePhotos: Photo[] = [
  at('modern-romantic', 14),
  at('pre-wedding-phuong-thao-tien-dat', 0),
  at('new-concept-2026', 11),
]

export const galleryTabs: GalleryTab[] = [
  { key: 'all', label: 'Tất cả', albums: ['new-concept-2026', 'modern-romantic', 'bee-house-outdoor'] },
  { key: 'new-concept-2026', label: 'New Concept 2026', albums: ['new-concept-2026'] },
  { key: 'modern-romantic', label: 'Modern & Romantic', albums: ['modern-romantic'] },
  { key: 'bee-house-outdoor', label: 'Bee House Outdoor', albums: ['bee-house-outdoor'] },
]

export const momentPhotos: Photo[] = [
  at('khoanh-khac-khach-hang', 2),
  at('ngoc-anh-dinh-tien', 1),
  at('khoanh-khac-khach-hang', 3),
  at('huy-linh', 3),
  at('khoanh-khac-khach-hang', 6),
  at('ngoc-anh-dinh-tien', 2),
  at('khoanh-khac-khach-hang', 0),
  at('ngoc-anh-dinh-tien', 4),
  at('khoanh-khac-khach-hang', 4),
  at('huy-linh', 1),
  at('khoanh-khac-khach-hang', 5),
  at('ngoc-anh-dinh-tien', 3),
  at('khoanh-khac-khach-hang', 1),
]

export const contactBackdrop = at('bee-house-outdoor', 5)
