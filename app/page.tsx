import Hero from '@/components/landing/Hero'
import ServicesSection from '@/components/landing/ServicesSection'
import GallerySection from '@/components/landing/GallerySection'
import UspSection from '@/components/landing/UspSection'
import ContactSection from '@/components/landing/ContactSection'
import RevealObserver from '@/components/RevealObserver'
import AboutUsSection from '@/components/landing/AboutUsSection'

// Landing page — nền luân phiên ngà / be: Hero → Bee House (ngà) → Dịch vụ (be) → Bộ sưu tập (ngà)
// → Khác biệt (be) → Khách hàng (ngà) → Liên hệ (be) → Footer (nâu đậm)
const Home = () => {
  return (
    <>
      <Hero />
      <AboutUsSection />
      <ServicesSection />
      <GallerySection />
      <UspSection />
      <ContactSection />
      <RevealObserver />
    </>
  )
}

export default Home
