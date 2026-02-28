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
      {/* Decorative brand icons scattered across the page background */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        {/* Balance icon - top right area */}
        <Image
          src="/images/brand-balance.png"
          alt=""
          width={280}
          height={280}
          className="absolute top-[8%] right-[2%] w-32 opacity-[0.12] md:w-48 lg:w-56"
        />
        {/* Ellipses - left side, between hero and about */}
        <Image
          src="/images/brand-ellipses.png"
          alt=""
          width={260}
          height={260}
          className="absolute top-[22%] -left-4 w-28 opacity-[0.12] md:w-40 lg:w-48"
        />
        {/* Figure icon - right side, near areas */}
        <Image
          src="/images/brand-figure.png"
          alt=""
          width={220}
          height={220}
          className="absolute top-[38%] right-[3%] w-24 opacity-[0.1] md:w-36 lg:w-40"
        />
        {/* Balance icon - left side, near emergency kit */}
        <Image
          src="/images/brand-balance.png"
          alt=""
          width={200}
          height={200}
          className="absolute top-[52%] left-[4%] w-28 opacity-[0.1] md:w-40 lg:w-44"
        />
        {/* Ellipses - right side, near testimonials */}
        <Image
          src="/images/brand-ellipses.png"
          alt=""
          width={220}
          height={220}
          className="absolute top-[65%] right-[5%] w-24 opacity-[0.1] md:w-36 lg:w-40"
        />
        {/* Figure - left side, near pricing */}
        <Image
          src="/images/brand-figure.png"
          alt=""
          width={180}
          height={180}
          className="absolute top-[78%] -left-2 w-24 opacity-[0.1] md:w-32 lg:w-36"
        />
        {/* Balance icon - right side, near CTA/footer */}
        <Image
          src="/images/brand-balance.png"
          alt=""
          width={160}
          height={160}
          className="absolute top-[90%] right-[8%] w-24 opacity-[0.1] md:w-36 lg:w-40"
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
