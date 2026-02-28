import Image from "next/image"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Areas } from "@/components/areas"
import { EmergencyKit } from "@/components/emergency-kit"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative brand icons scattered across the page */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {/* Balance icon - top right, near hero */}
        <Image
          src="/images/brand-balance.png"
          alt=""
          width={200}
          height={200}
          className="absolute top-[5%] right-[2%] w-28 opacity-[0.07] md:w-40"
        />
        {/* Ellipses - between about and areas */}
        <Image
          src="/images/brand-ellipses.png"
          alt=""
          width={200}
          height={200}
          className="absolute top-[28%] -left-6 w-24 opacity-[0.08] md:w-36"
        />
        {/* Figure icon - near areas */}
        <Image
          src="/images/brand-figure.png"
          alt=""
          width={180}
          height={180}
          className="absolute top-[42%] right-[3%] w-20 opacity-[0.07] md:w-28"
        />
        {/* Balance icon - near emergency kit */}
        <Image
          src="/images/brand-balance.png"
          alt=""
          width={160}
          height={160}
          className="absolute top-[55%] left-[5%] w-24 opacity-[0.06] md:w-32"
        />
        {/* Ellipses - near testimonials */}
        <Image
          src="/images/brand-ellipses.png"
          alt=""
          width={180}
          height={180}
          className="absolute top-[68%] right-[6%] w-20 opacity-[0.07] md:w-28"
        />
        {/* Figure - near pricing */}
        <Image
          src="/images/brand-figure.png"
          alt=""
          width={140}
          height={140}
          className="absolute top-[80%] -left-4 w-20 opacity-[0.06] md:w-24"
        />
        {/* Balance icon - near CTA */}
        <Image
          src="/images/brand-balance.png"
          alt=""
          width={120}
          height={120}
          className="absolute top-[92%] right-[10%] w-20 opacity-[0.07] md:w-28"
        />
      </div>

      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Areas />
        <EmergencyKit />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
