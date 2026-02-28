import Image from "next/image"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Areas } from "@/components/areas"
import { EmergencyKit } from "@/components/emergency-kit"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
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
          className="absolute top-[8%] right-[2%] w-32 opacity-[0.10] md:w-48 lg:w-56"
        />
        {/* Ellipses - left side, between hero and about */}
        <Image
          src="/images/brand-ellipses.png"
          alt=""
          width={260}
          height={260}
          className="absolute top-[22%] -left-4 w-28 opacity-[0.10] md:w-40 lg:w-48"
        />
        {/* Figure icon - right side, near areas */}
        <Image
          src="/images/brand-figure.png"
          alt=""
          width={220}
          height={220}
          className="absolute top-[38%] right-[3%] w-24 opacity-[0.08] md:w-36 lg:w-40"
        />
        {/* Balance icon - left side, near emergency kit */}
        <Image
          src="/images/brand-balance.png"
          alt=""
          width={200}
          height={200}
          className="absolute top-[52%] left-[4%] w-28 opacity-[0.08] md:w-40 lg:w-44"
        />
        {/* Ellipses - right side, near testimonials */}
        <Image
          src="/images/brand-ellipses.png"
          alt=""
          width={220}
          height={220}
          className="absolute top-[65%] right-[5%] w-24 opacity-[0.08] md:w-36 lg:w-40"
        />
        {/* Figure - left side, near pricing */}
        <Image
          src="/images/brand-figure.png"
          alt=""
          width={180}
          height={180}
          className="absolute top-[78%] -left-2 w-24 opacity-[0.08] md:w-32 lg:w-36"
        />
        {/* Balance icon - right side, near CTA/footer */}
        <Image
          src="/images/brand-balance.png"
          alt=""
          width={160}
          height={160}
          className="absolute top-[90%] right-[8%] w-24 opacity-[0.08] md:w-36 lg:w-40"
        />
      </div>

      {/* Subtle brown (#A7895C) blobs scattered throughout */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div
          className="absolute top-[5%] left-[10%] h-40 w-40 rounded-full opacity-[0.04] blur-3xl md:h-60 md:w-60"
          style={{ backgroundColor: "#A7895C" }}
        />
        <div
          className="absolute top-[18%] right-[8%] h-52 w-52 rounded-full opacity-[0.035] blur-3xl md:h-72 md:w-72"
          style={{ backgroundColor: "#A7895C" }}
        />
        <div
          className="absolute top-[32%] left-[5%] h-44 w-44 rounded-full opacity-[0.04] blur-3xl md:h-64 md:w-64"
          style={{ backgroundColor: "#A7895C" }}
        />
        <div
          className="absolute top-[48%] right-[12%] h-48 w-48 rounded-full opacity-[0.03] blur-3xl md:h-56 md:w-56"
          style={{ backgroundColor: "#A7895C" }}
        />
        <div
          className="absolute top-[60%] left-[15%] h-36 w-36 rounded-full opacity-[0.04] blur-3xl md:h-52 md:w-52"
          style={{ backgroundColor: "#A7895C" }}
        />
        <div
          className="absolute top-[72%] right-[6%] h-44 w-44 rounded-full opacity-[0.035] blur-3xl md:h-60 md:w-60"
          style={{ backgroundColor: "#A7895C" }}
        />
        <div
          className="absolute top-[85%] left-[8%] h-40 w-40 rounded-full opacity-[0.03] blur-3xl md:h-56 md:w-56"
          style={{ backgroundColor: "#A7895C" }}
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
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
