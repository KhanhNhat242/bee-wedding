// Nguồn dữ liệu duy nhất cho thông tin doanh nghiệp — phải khớp docs/REQUIREMENTS.md.
// Component chỉ import từ đây, không hardcode SĐT / địa chỉ / link trong JSX.

const hotlines = [
  { value: '0832571555', display: '0832 571 555' },
  { value: '0979571555', display: '0979 571 555' },
] as const

export const site = {
  name: 'Bee Wedding',
  fullName: 'Bee Wedding Studio',
  slogan: 'Ghi lại câu chuyện tình yêu theo cách riêng của bạn.',
  intro: 'Phim trường Bee House – không gian độc quyền của Bee Wedding',
  address: 'Số 5 Nguyễn Du, P. Nam Định',
  hotlines,
  zalo: `https://zalo.me/${hotlines[0].value}`,
  facebook: 'https://www.facebook.com/BeeWeddingND',
  maps: 'https://maps.app.goo.gl/iie2dmvJqM3sfWZX9',
  logo: '/images/main-logo.jpg',
  banner: '/images/main-banner.jpg',
} as const

export const tel = (phone: string) => `tel:${phone}`

// Menu landing page: neo tới các section. TODO: đổi sang /gioi-thieu, /catalog, /lien-he khi có trang riêng.
export const navItems = [
  { label: 'Bee House', href: '#bee-house' },
  { label: 'Dịch vụ', href: '#dich-vu' },
  { label: 'Bộ sưu tập', href: '#bo-suu-tap' },
  { label: 'Khách hàng', href: '#khoanh-khac' },
  { label: 'Liên hệ', href: '#lien-he' },
] as const

export const services = [
  {
    title: 'Chụp ảnh cưới',
    points: [
      'Đa dạng concept: Korean, Modern Romantic, Outdoor',
      'Chụp tại phim trường riêng Bee House',
      'Hình ảnh trẻ trung, tự nhiên, cá nhân hóa',
    ],
  },
  {
    title: 'Thiết kế & Cho thuê váy cưới',
    points: [
      'Bộ sưu tập váy cưới cao cấp Bee Bridal',
      'Thiết kế và cho thuê theo phong cách sang trọng, cổ điển',
    ],
  },
  {
    title: 'Dịch vụ cưới trọn gói',
    points: [
      'Hệ sinh thái ảnh cưới, váy cưới và makeup',
      'Tiện lợi, chi phí rõ ràng',
      'Đồng hành cùng cặp đôi trong suốt hành trình',
    ],
  },
] as const

export const usps = [
  { numeral: 'I', title: 'Phim trường Bee House', text: 'Không gian độc quyền, riêng tư.' },
  { numeral: 'II', title: 'Dấu ấn cá nhân', text: 'Hình ảnh trẻ trung, tự nhiên và độc bản.' },
  { numeral: 'III', title: 'Hệ sinh thái toàn diện', text: 'Trọn gói ảnh cưới, váy cưới & makeup.' },
  { numeral: 'IV', title: 'Trải nghiệm đồng hành', text: 'Lắng nghe và chăm sóc từng khoảnh khắc.' },
] as const
