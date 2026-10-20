import Image from 'next/image'
import { site } from '@/lib/site-config'

type Props = {
  size: number
  className?: string
  preload?: boolean
}

// Logo gốc (monogram vàng trên nền lụa) cắt tròn quanh phần chữ — không vẽ lại / đổi màu logo.
const BrandMark = ({ size, className = '', preload = false }: Props) => {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ring-1 ring-gold/40 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={site.logo}
        alt={`Logo ${site.fullName}`}
        fill
        sizes={`${size * 2}px`}
        preload={preload}
        className="scale-[1.45] object-cover"
      />
    </span>
  )
}

export default BrandMark
