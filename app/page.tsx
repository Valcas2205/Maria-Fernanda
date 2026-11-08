import Image from "next/image"
import { BackgroundShapes } from "@/components/background-shapes"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Identification } from "@/components/identification"
import { Areas } from "@/components/areas"
import { EmergencyKit } from "@/components/emergency-kit"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { BookPromo } from "@/components/book-promo"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundShapes />

      <Header />
      <main className="relative z-10">
        <Hero />
        <Identification />
        <About />
        <Areas />
        <BookPromo />
        <EmergencyKit />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
