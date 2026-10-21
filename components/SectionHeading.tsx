import type { CSSProperties } from 'react'

type Props = {
  title: string
  align?: 'center' | 'left'
  className?: string
}

// Cụm tiêu đề section: dòng phụ vàng có gạch mảnh + tiêu đề serif. Cách nội dung 40–48px (mb-10/12).
const SectionHeading = ({ title, align = 'center', className = '' }: Props) => {
  const centered = align === 'center'
  return (
    <div className={`mb-10 md:mb-12 ${centered ? 'text-center' : ''} ${className}`}>

      <h2
        data-reveal="up"
        style={{ '--reveal-delay': '120ms' } as CSSProperties}
        className="mt-4 font-serif text-4xl leading-tight font-medium text-ink md:text-5xl"
      >
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading
