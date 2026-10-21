import type { CSSProperties, ReactNode } from 'react'

export type OrnamentVariant = 'about' | 'service' | 'gallery' | 'usp' | 'contact'

// Hoạ tiết line-art vẽ trong khung 80×400, nối với nhau bằng thân dọc + nút kim cương nhỏ.
const Stem = ({ from, to, dashed = false }: { from: number; to: number; dashed?: boolean }) => (
  <line x1="40" y1={from} x2="40" y2={to} strokeDasharray={dashed ? '2 5' : undefined} />
)

const Node = ({ y }: { y: number }) => <path d={`M40 ${y - 5} L44 ${y} L40 ${y + 5} L36 ${y} Z`} fill="currentColor" />

// Nhành lá nhỏ, gốc ở (40, y), mọc lên trên
const Sprig = ({ y }: { y: number }) => (
  <g>
    <path d={`M40 ${y} V${y - 70}`} />
    {[0, 22, 44].map((d) => (
      <g key={d}>
        <path d={`M40 ${y - 10 - d} Q28 ${y - 16 - d} 24 ${y - 30 - d} Q34 ${y - 24 - d} 40 ${y - 10 - d}`} />
        <path d={`M40 ${y - 20 - d} Q52 ${y - 26 - d} 56 ${y - 40 - d} Q46 ${y - 34 - d} 40 ${y - 20 - d}`} />
      </g>
    ))}
  </g>
)

// Nhành nguyệt quế: các cặp lá dọc theo thân cong
const Laurel = () => (
  <g>
    <path d="M40 40 Q30 200 40 370" />
    {Array.from({ length: 11 }, (_, i) => {
      const y = 70 + i * 28
      const x = 40 - Math.sin((y - 40) / 105) * 8
      return (
        <g key={i}>
          <path d={`M${x} ${y} Q${x - 14} ${y - 4} ${x - 20} ${y - 18} Q${x - 6} ${y - 14} ${x} ${y}`} />
          <path d={`M${x} ${y - 8} Q${x + 14} ${y - 12} ${x + 18} ${y - 26} Q${x + 6} ${y - 22} ${x} ${y - 8}`} />
        </g>
      )
    })}
    <circle cx="40" cy="30" r="4" />
  </g>
)

const art: Record<OrnamentVariant, { left: ReactNode; right: ReactNode }> = {
  // Bee House: vòm cột cổ điển / đài phun nước
  about: {
    left: (
      <>
        <Stem from={0} to={70} />
        <Node y={78} />
        <path d="M18 172 V114 A22 22 0 0 1 62 114 V172" />
        <path d="M26 172 V116 A14 14 0 0 1 54 116 V172" />
        <path d="M12 172 H68 M14 178 H66" />
        <path d="M37 92 L40 86 L43 92" />
        <Stem from={186} to={250} />
        <Node y={258} />
        <Sprig y={350} />
        <Stem from={350} to={400} />
      </>
    ),
    right: (
      <>
        <Stem from={0} to={70} />
        <Node y={78} />
        <circle cx="40" cy="96" r="3" />
        <path d="M28 106 Q40 118 52 106 Z" />
        <path d="M40 116 V140" />
        <path d="M16 142 Q40 162 64 142 Z" />
        <path d="M28 108 Q20 124 19 140 M52 108 Q60 124 61 140" strokeDasharray="2 4" />
        <path d="M36 158 V170 M44 158 V170 M28 172 H52" />
        <Stem from={184} to={250} />
        <Node y={258} />
        <Sprig y={350} />
        <Stem from={350} to={400} />
      </>
    ),
  },
  // Dịch vụ: máy ảnh, váy cưới / nhẫn cưới, cọ makeup
  service: {
    left: (
      <>
        <Stem from={0} to={80} />
        <Node y={88} />
        <path d="M30 106 L34 98 H46 L50 106" />
        <rect x="14" y="106" width="52" height="38" rx="4" />
        <circle cx="40" cy="125" r="11" />
        <circle cx="40" cy="125" r="5" />
        <Stem from={150} to={240} />
        <Node y={248} />
        <path d="M37 262 A4 4 0 1 1 41 266 V270 M28 280 L40 270 L52 280" />
        <path d="M33 282 L35 300 H45 L47 282 Z" />
        <path d="M35 300 Q26 330 16 360 H64 Q54 330 45 300" />
        <Stem from={360} to={400} />
      </>
    ),
    right: (
      <>
        <Stem from={0} to={80} />
        <Node y={88} />
        <circle cx="33" cy="128" r="13" />
        <circle cx="47" cy="128" r="13" />
        <path d="M47 115 L43 109 L47 103 L51 109 Z" />
        <Stem from={150} to={240} />
        <Node y={248} />
        <path d="M36 288 Q33 274 40 262 Q47 274 44 288" />
        <rect x="35" y="288" width="10" height="12" />
        <path d="M37 300 L38 352 H42 L43 300" />
        <Stem from={360} to={400} />
      </>
    ),
  },
  // Bộ sưu tập: cuộn film, hoa / khung ảnh, hoa tulip
  gallery: {
    left: (
      <>
        <Stem from={0} to={70} />
        <rect x="24" y="76" width="32" height="124" rx="2" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="31" y={83 + i * 28} width="18" height="22" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <rect x="26.5" y={82 + i * 13} width="2" height="4" />
            <rect x="51.5" y={82 + i * 13} width="2" height="4" />
          </g>
        ))}
        <Stem from={206} to={250} />
        <Node y={258} />
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="40" cy="282" rx="5" ry="9" transform={`rotate(${a} 40 292)`} />
        ))}
        <circle cx="40" cy="292" r="3" />
        <path d="M40 304 V370 M40 340 Q28 334 26 322 Q36 326 40 340" />
        <Stem from={370} to={400} />
      </>
    ),
    right: (
      <>
        <Stem from={0} to={80} />
        <Node y={88} />
        <rect x="14" y="102" width="52" height="64" />
        <rect x="20" y="108" width="40" height="42" />
        <path d="M40 140 C30 133 30 122 36 122 C38 122 40 125 40 127 C40 125 42 122 44 122 C50 122 50 133 40 140 Z" />
        <Stem from={166} to={240} />
        <Node y={248} />
        <path d="M40 290 Q28 280 30 262 L35 270 L40 260 L45 270 L50 262 Q52 280 40 290 Z" />
        <path d="M40 290 V370 M40 335 Q52 328 55 314 Q44 320 40 335" />
        <Stem from={370} to={400} />
      </>
    ),
  },
  // Điểm khác biệt: nhành nguyệt quế (biểu tượng của sự xuất sắc)
  usp: {
    left: <Laurel />,
    right: <Laurel />,
  },
  // Liên hệ: phong thư, trái tim / ghim bản đồ, đường tới studio
  contact: {
    left: (
      <>
        <Stem from={0} to={80} />
        <Node y={88} />
        <rect x="14" y="104" width="52" height="36" rx="2" />
        <path d="M14 104 L40 126 L66 104" />
        <Stem from={146} to={240} dashed />
        <Node y={248} />
        <path d="M40 300 C20 285 22 266 33 266 C37 266 40 270 40 273 C40 270 43 266 47 266 C58 266 60 285 40 300 Z" />
        <Stem from={306} to={400} />
      </>
    ),
    right: (
      <>
        <Stem from={0} to={70} />
        <path d="M40 150 C26 130 22 120 22 108 A18 18 0 0 1 58 108 C58 120 54 130 40 150 Z" />
        <circle cx="40" cy="108" r="6" />
        <path d="M40 158 Q62 196 40 228 Q18 260 40 292" strokeDasharray="2 5" />
        <path d="M24 344 V316 L40 300 L56 316 V344 Z" />
        <path d="M35 344 V330 A5 5 0 0 1 45 330 V344" />
        <Stem from={350} to={400} />
      </>
    ),
  },
}

type Props = {
  variant: OrnamentVariant
  className?: string
}

// Hoạ tiết trang trí dọc 2 bên section. Chỉ hiện từ 1400px (lề đủ rộng để không đè nội dung).
// Section cha cần `relative`.
const SideOrnaments = ({ variant, className = '' }: Props) => {
  const { left, right } = art[variant]
  const svg = (children: ReactNode, side: 'left' | 'right') => (
    <div
      aria-hidden
      data-reveal="blur"
      className={`pointer-events-none absolute top-1/2 hidden w-18 -translate-y-1/2 2xl:w-22 text-gold opacity-50 min-[1400px]:block ${
        side === 'left' ? 'left-6 2xl:left-12' : 'right-6 2xl:right-12'
      } ${className}`}
    >
      <svg
        viewBox="0 0 80 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`deco-float h-auto w-full ${side === 'right' && variant === 'usp' ? '-scale-x-100' : ''}`}
        style={{ animationDelay: side === 'left' ? '0s' : '-4.5s' } as CSSProperties}
      >
        {children}
      </svg>
    </div>
  )

  return (
    <>
      {svg(left, 'left')}
      {svg(right, 'right')}
    </>
  )
}

export default SideOrnaments
