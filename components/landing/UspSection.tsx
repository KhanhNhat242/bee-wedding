import type { CSSProperties } from 'react'
import SectionHeading from '../SectionHeading'
import { usps } from '@/lib/site-config'

// Section 5 — 4 điểm khác biệt, thanh ngang 4 cột đánh số La Mã.
const UspSection = () => {
  return (
    <section className="section bg-beige">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Điểm khác biệt" title="Vì Sao Chọn Bee Wedding" />

        <ul className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-gold/30">
          {usps.map((usp, i) => (
            <li
              key={usp.numeral}
              data-reveal="up"
              style={{ '--reveal-delay': `${i * 120}ms` } as CSSProperties}
              className="px-6 text-center lg:px-8"
            >
              <span className="font-serif text-5xl leading-none text-gold italic">{usp.numeral}</span>
              <span className="mx-auto mt-5 block h-px w-8 bg-gold/60" />
              <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">{usp.title}</h3>
              <p className="mx-auto mt-3 max-w-60 text-[15px] leading-relaxed text-ink-soft">{usp.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default UspSection
