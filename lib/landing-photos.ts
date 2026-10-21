// Ảnh dùng cho landing page — chọn tay từ kho ảnh (chỉ số theo thứ tự file trong album).
import { getAlbum, type Photo } from './albums'

const at = (slug: string, index: number): Photo => getAlbum(slug).photos[index]

export type GalleryTab = { key: string; label: string; albums: string[] }

export type HeroSlide = {
  src: string
  alt: string
  eyebrow: string
  title: [string, string]
  subtitle: string
}

// Slider hero: banner1–4 (2048×1366). Chữ chỉ lấy từ dịch vụ / USP / slogan trong REQUIREMENTS.md.
export const heroSlides: HeroSlide[] = [
  {
    src: '/images/banner1.jpg',
    alt: 'Cặp đôi chụp ảnh cưới giữa phông rèm trắng và hoa tươi',
    eyebrow: 'Chụp ảnh cưới',
    title: ['Modern', '& Romantic'],
    subtitle: 'Trẻ trung · Tự nhiên · Cá nhân hóa',
  },
  {
    src: '/images/banner2.jpg',
    alt: 'Cặp đôi chụp ảnh cưới phong cách cổ điển bên xe hơi trắng',
    eyebrow: 'Dấu ấn cá nhân',
    title: ['Sang trọng', 'Cổ điển'],
    subtitle: 'Hình ảnh độc bản cho riêng bạn',
  },
  {
    src: '/images/banner3.jpg',
    alt: 'Cặp đôi ôm nhau dưới tấm voan cưới trong nắng chiều',
    eyebrow: 'Bee Wedding Studio',
    title: ['Câu chuyện', 'Tình yêu'],
    subtitle: 'Ghi lại theo cách riêng của bạn',
  },
  {
    src: '/images/banner4.jpg',
    alt: 'Cặp đôi ngồi bên bàn tiệc hoa hồng trong khu vườn xanh',
    eyebrow: 'Dịch vụ cưới trọn gói',
    title: ['Đồng hành', 'Trọn vẹn'],
    subtitle: 'Ảnh cưới · Váy cưới · Makeup',
  },
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

// Ảnh nền 4 thẻ USP — cùng thứ tự với `usps` trong site-config
export const uspPhotos: { src: string }[] = [
  { src: '/images/usp1.jpg' },
  { src: '/images/usp2.jpg' },
  { src: '/images/usp3.jpg' },
  { src: '/images/usp4.jpg' },
]

export const contactBackdrop = { src: '/images/contact-banner.jpg' }
