@AGENTS.md

# Bee Wedding — Quy tắc dự án (BẮT BUỘC)

Website demo cho studio ảnh cưới **Bee Wedding** (Nam Định). Mọi việc làm hoặc thêm vào dự án phải tuân theo file này và [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md).

## 0. Trước khi làm bất cứ việc gì
1. Đọc [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md). Đó là nguồn sự thật duy nhất về nội dung và phạm vi.
2. Next.js trong repo là **16.4** (có thay đổi phá vỡ). Đọc tài liệu liên quan trong `node_modules/next/dist/docs/` trước khi viết code Next (routing, metadata, image, fonts, cache…). Không code theo trí nhớ.
3. Nếu yêu cầu mới mâu thuẫn với REQUIREMENTS.md → dừng lại hỏi, không tự quyết.

## 1. Nội dung — không bịa
- Chỉ hiển thị thông tin có trong REQUIREMENTS.md. **Cấm** bịa giá, giờ mở cửa, số liệu ("10 năm", "1000+ cặp đôi"), testimonial, tên nhân sự, email, giải thưởng.
- Văn bản có sẵn (slogan, giới thiệu Bee House, địa chỉ) dùng **nguyên văn**.
- Thiếu thông tin → dùng CTA "Liên hệ để nhận báo giá" hoặc bỏ phần đó; trong code ghi `// TODO(sale): ...` và thêm câu hỏi vào mục 11 của REQUIREMENTS.md.
- Số điện thoại luôn có số 0 đầu: `0832571555`, `0979571555`. Không dùng `832571555`.
- Tên hiển thị: "Bee Wedding". Album "MORDEN AND ROMANTIC" hiển thị là "Modern & Romantic".
- Toàn bộ UI bằng **tiếng Việt có dấu**, đúng chính tả. Không để chữ tiếng Anh mặc định ("Read more", "Contact"…), trừ tên concept gốc.

## 2. Thông tin doanh nghiệp — một nguồn duy nhất
- Mọi thông tin liên hệ, link, dịch vụ, USP, danh sách album đặt trong **một file dữ liệu** `lib/site-config.ts` (hoặc `data/`). Component chỉ import từ đó, **không** hardcode SĐT/địa chỉ/link trong JSX.
- Khi thông tin thay đổi: sửa REQUIREMENTS.md → sửa file dữ liệu. Hai nơi phải khớp nhau.

## 3. Phạm vi
- Trang: `/` (chủ), `/gioi-thieu`, `/catalog`, `/catalog/[slug]`, `/lien-he`. Slug URL tiếng Việt không dấu, kebab-case.
- **Không** thêm: giỏ hàng, thanh toán, đặt lịch online, đăng nhập, bảng giá, blog, đa ngôn ngữ, backend/DB, CMS — trừ khi REQUIREMENTS.md được cập nhật cho phép.
- Bee House (USP số 1) phải luôn nổi bật ở trang chủ và trang giới thiệu.
- Mỗi trang phải có ít nhất một CTA liên hệ (gọi / Zalo / Facebook).

## 4. Thiết kế — "Trắng, be · Sang trọng, cổ điển"
- Dùng token màu, không viết mã màu rời rạc trong component:
  - nền `#FFFDF9`, be `#F5EFE6`, viền `#EFE8DC`, nhấn vàng logo `#B08948`, chữ `#2B2620`.
  - Khai báo trong `app/globals.css` (`:root` + `@theme inline`) và đồng bộ sang `ConfigProvider` của antd (`colorPrimary: #B08948`).
- Cấm màu sặc sỡ/neon/gradient lòe loẹt, cấm màu lạnh làm màu chủ đạo. Website **chỉ có giao diện sáng** — bỏ khối `prefers-color-scheme: dark` đổi nền sang đen.
- Typography: font tiêu đề serif cổ điển + font nội dung sans, **bắt buộc có subset `vietnamese`** qua `next/font/google` (gợi ý: Playfair Display / Cormorant Garamond + Be Vietnam Pro). Geist không dùng cho chữ tiếng Việt.
- Khoảng trắng rộng, ảnh lớn, chi tiết mảnh (đường kẻ vàng, hoạ tiết nhẹ). Bo góc nhỏ, bóng đổ nhẹ.
- Hiệu ứng: dùng hệ `data-reveal` có sẵn trong `globals.css` (`left|right|up|flip|grow-x|grow-c|blur`, biến `--reveal-delay`, `.reveal-zoom`, `.deco-float`, `.lightbox-fade`, `.glass-panel`). Không thêm thư viện animation mới khi hệ này đáp ứng được. Mọi animation mới phải tắt được dưới `prefers-reduced-motion`.

## 5. Kỹ thuật
- Stack cố định: Next 16.4 App Router, React 19.3, TypeScript, Tailwind CSS 4, antd 6 (`@ant-design/nextjs-registry`). Không thêm thư viện UI/CSS khác. Thêm dependency mới phải có lý do rõ.
- Thứ tự layer CSS giữ nguyên: `@layer theme, base, antd, components, utilities;`.
- Không viết rule toàn cục ngoài layer kiểu `* { border-color: ... }` — nó đè mọi utility Tailwind. Mỗi `border` phải kèm class màu (`border-line`, `border-gold`…).
- Màu dùng qua class token Tailwind: `bg-ivory`, `bg-beige`, `text-ink`, `text-ink-soft`, `text-gold`, `text-gold-deep` (chữ nhỏ màu vàng dùng `gold-deep` để đủ tương phản), `border-line`.
- Khoảng cách section dùng class `.section` (80px mobile / 112px desktop); tiêu đề → nội dung dùng `SectionHeading` (mb-10/12). Nền section luân phiên ngà / be. Chuyển tiếp giữa 2 section (trừ Hero, Footer): section dưới thêm class `fade-from-ivory` / `fade-from-beige` theo màu nền section trên; section có ảnh nền thì dùng 1 lớp `bg-linear-to-b from-<màu trên> to-transparent` ở đỉnh. Đổi thứ tự section thì cập nhật lại các class này.
- Ảnh hero: không dùng `priority` (deprecated ở Next 16) — dùng `fetchPriority` / `preload`.
- Hoạ tiết hai bên section dùng `<SideOrnaments variant="..." />` (section cha cần `relative`; Hero không có). Section mới thì thêm variant line-art liên quan nội dung, nét vàng mảnh.
- `RevealObserver` đặt ở **cuối mỗi page**, không đặt trong layout (tránh hydration mismatch).
- Mặc định **Server Component**. Chỉ thêm `'use client'` cho component thật sự cần state/effect/event (menu mobile, lightbox, reveal observer). Không đặt `'use client'` ở `page.tsx` nếu không cần.
- `next.config.ts` bật `cacheComponents` — đọc docs về cache/`use cache` trong `node_modules/next/dist/docs/` trước khi dùng dữ liệu động.
- Component đặt trong `components/` (PascalCase, mỗi file một component chính). Dữ liệu trong `lib/` hoặc `data/`.
- `app/layout.tsx`: `lang="vi"`, metadata tiếng Việt về Bee Wedding (hiện đang sai: "Booking Homestay", `lang="en"` — phải sửa).
- Mỗi trang export `metadata` riêng (title, description tiếng Việt, Open Graph).

## 6. Ảnh
- Luôn dùng `next/image` với `width/height` hoặc `fill` + `sizes`; `fetchPriority="high"` / `loading="eager"` chỉ cho ảnh hero. `alt` tiếng Việt mô tả nội dung.
- Ảnh trong `public/images/library/` có tên thư mục chứa ký tự Unicode đặc biệt → **không** suy ra URL/slug từ tên thư mục. Khai báo album trong file dữ liệu: `{ slug, title, folder, cover, images[] }`. Nếu đổi tên thư mục sang ASCII thì cập nhật bảng mục 8 trong REQUIREMENTS.md.
- Không dùng ảnh ngoài thư mục `public/images/` (không ảnh stock, không hotlink Facebook/Drive).
- Logo dùng `public/images/main-logo.jpg`, không vẽ lại / đổi màu logo.

## 7. Responsive & truy cập
- Mobile-first; kiểm tra ở 375px, 768px, 1280px. Không cuộn ngang.
- Không để chữ "mồ côi" (1 từ rớt xuống dòng cuối): `globals.css` đã đặt `text-wrap: balance` cho tiêu đề và `pretty` cho đoạn văn. Không ghi đè bằng `text-wrap-normal` trừ khi có lý do; đoạn chữ ngắn đặt trong thẻ khác (`span`, `div`) thì thêm class `text-pretty` / `text-balance`.
- Số điện thoại là link `tel:`; Zalo `https://zalo.me/0832571555`; link ngoài mở tab mới với `rel="noopener noreferrer"`.
- Độ tương phản chữ đủ đọc trên nền be (chữ vàng `#B08948` chỉ dùng cho tiêu đề lớn/điểm nhấn, không cho đoạn văn nhỏ).

## 8. Hoàn thành một việc khi
- [ ] Khớp REQUIREMENTS.md, không có nội dung bịa.
- [ ] `npm run lint` và `npm run build` không lỗi.
- [ ] Hiển thị đúng trên mobile và desktop.
- [ ] Nếu thay đổi phạm vi/nội dung: đã cập nhật REQUIREMENTS.md (kể cả mục 12 – nhật ký thay đổi).
