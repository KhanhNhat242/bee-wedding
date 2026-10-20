import type { CSSProperties } from 'react'

type Props = {
  eyebrow: string
  title: string
  align?: 'center' | 'left'
  className?: string
}

// Cụm tiêu đề section: dòng phụ vàng có gạch mảnh + tiêu đề serif. Cách nội dung 40–48px (mb-10/12).
const SectionHeading = ({ eyebrow, title, align = 'center', className = '' }: Props) => {
  const centered = align === 'center'
  return (
    <div className={`mb-10 md:mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <p
        data-reveal="up"
        className={`flex items-center gap-3 text-xs font-medium tracking-[0.28em] whitespace-nowrap text-gold-deep uppercase sm:gap-4 sm:tracking-[0.35em] ${
          centered ? 'justify-center' : ''
        }`}
      >
        <span className="h-px w-6 bg-gold sm:w-10" />
        {eyebrow}
        {centered && <span className="h-px w-6 bg-gold sm:w-10" />}
      </p>
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
