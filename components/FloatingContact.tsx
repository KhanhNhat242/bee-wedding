import { PhoneIcon } from './Icons'
import { site, tel } from '@/lib/site-config'

// Nút liên hệ nổi trên mobile: Hotline + Zalo luôn trong tầm tay.
const FloatingContact = () => {
  return (
    <div className="fixed right-4 bottom-5 z-40 flex flex-col gap-3 md:hidden">
      <a
        href={site.zalo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn Zalo cho Bee Wedding"
        className="grid size-13 place-items-center rounded-full border border-line bg-ivory text-[13px] font-semibold text-gold-deep shadow-[0_10px_25px_-10px_rgba(43,38,32,0.45)]"
      >
        Zalo
      </a>
      <a
        href={tel(site.hotlines[0].value)}
        aria-label={`Gọi hotline ${site.hotlines[0].display}`}
        className="relative grid size-13 place-items-center rounded-full bg-gold text-ivory shadow-[0_10px_25px_-10px_rgba(140,106,51,0.8)]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/40 motion-reduce:hidden" />
        <PhoneIcon width={22} height={22} className="relative" />
      </a>
    </div>
  )
}

export default FloatingContact
