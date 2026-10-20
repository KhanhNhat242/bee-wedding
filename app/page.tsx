import Hero from '@/components/landing/Hero'
import BeeHouseSection from '@/components/landing/BeeHouseSection'
import ServicesSection from '@/components/landing/ServicesSection'
import GallerySection from '@/components/landing/GallerySection'
import UspSection from '@/components/landing/UspSection'
import MomentsSection from '@/components/landing/MomentsSection'
import ContactSection from '@/components/landing/ContactSection'
import RevealObserver from '@/components/RevealObserver'

// Landing page — nền luân phiên ngà / be: Hero → Bee House (ngà) → Dịch vụ (be) → Bộ sưu tập (ngà)
// → Khác biệt (be) → Khách hàng (ngà) → Liên hệ (be) → Footer (nâu đậm)
const Home = () => {
  return (
    <>
      <Hero />
      <BeeHouseSection />
      <ServicesSection />
      <GallerySection />
      <UspSection />
      <MomentsSection />
      <ContactSection />
      <RevealObserver />
    </>
  )
}

export default Home
