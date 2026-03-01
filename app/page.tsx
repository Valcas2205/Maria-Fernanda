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
          className="absolute top-[8%] right-[2%] w-32 opacity-[0.10] md:w-48 lg:w-56 animate-float animate-duration-[8s]"
        />
        {/* Ellipses - left side, between hero and about */}
        <Image
          src="/images/brand-ellipses.png"
          alt=""
          width={260}
          height={260}
          className="absolute top-[22%] -left-4 w-28 opacity-[0.10] md:w-40 lg:w-48 animate-float animate-duration-[12s]"
        />
        {/* Figure icon - right side, near areas */}
        <Image
          src="/images/brand-figure.png"
          alt=""
          width={220}
          height={220}
          className="absolute top-[38%] right-[3%] w-24 opacity-[0.08] md:w-36 lg:w-40 animate-float animate-duration-[10s]"
        />
        {/* Balance icon - left side, near emergency kit */}
        <Image
          src="/images/brand-balance.png"
          alt=""
          width={200}
          height={200}
          className="absolute top-[52%] left-[4%] w-28 opacity-[0.08] md:w-40 lg:w-44 animate-float animate-duration-[14s]"
        />
        {/* Ellipses - right side, near testimonials */}
        <Image
          src="/images/brand-ellipses.png"
          alt=""
          width={220}
          height={220}
          className="absolute top-[65%] right-[5%] w-24 opacity-[0.08] md:w-36 lg:w-40 animate-float animate-duration-[9s]"
        />
        {/* Figure - left side, near pricing */}
        <Image
          src="/images/brand-figure.png"
          alt=""
          width={180}
          height={180}
          className="absolute top-[78%] -left-2 w-24 opacity-[0.08] md:w-32 lg:w-36 animate-float animate-duration-[15s]"
        />
        {/* Balance icon - right side, near CTA/footer */}
        <Image
          src="/images/brand-balance.png"
          alt=""
          width={160}
          height={160}
          className="absolute top-[90%] right-[8%] w-24 opacity-[0.08] md:w-36 lg:w-40 animate-float animate-duration-[11s]"
        />
      </div>

      {/* Organic Shapes Background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-15 overflow-hidden mix-blend-multiply" aria-hidden="true">
        {/* Top left shape */}
        <div className="absolute -top-[10%] -left-[10%] w-[350px] md:w-[600px] text-[#A7895C]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
            <path d="M49,-75.7C62.4,-67.1,71.5,-51.9,76.6,-35.5C81.7,-19.1,82.8,-1.5,78.3,14.6C73.8,30.7,63.7,45.3,50,55.5C36.3,65.7,18.1,71.5,0.7,70.5C-16.7,69.5,-33.4,61.7,-48.5,51.8C-63.6,41.9,-77.1,29.9,-83.1,14.5C-89.1,-0.9,-87.6,-19.7,-79.4,-35.1C-71.2,-50.5,-56.3,-62.5,-41.1,-70.2C-25.9,-77.9,-12.9,-81.3,1.6,-83.7C16.1,-86.1,32.2,-87.5,49,-75.7Z" transform="translate(100 100)" />
          </svg>
        </div>

        {/* Right middle shape */}
        <div className="absolute top-[30%] -right-[15%] w-[400px] md:w-[700px] text-[#A7895C] -rotate-45">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
            <path d="M37,-67.2C46.8,-60.5,52.8,-47.5,60.8,-34C68.8,-20.5,78.8,-6.5,80.5,8.8C82.2,24.1,75.6,40.7,63.9,50.8C52.2,60.9,35.4,64.5,19.2,67.6C3,70.7,-12.6,73.3,-26.1,68C-39.6,62.7,-51,49.5,-61.7,35C-72.4,20.5,-82.4,4.7,-81.6,-10.8C-80.8,-26.3,-69.2,-41.5,-54.6,-48.9C-40,-56.3,-22.4,-55.9,-6.6,-47.8C9.2,-39.7,27.2,-73.9,37,-67.2Z" transform="translate(100 100)" />
          </svg>
        </div>

        {/* Bottom left shape */}
        <div className="absolute top-[75%] -left-[10%] w-[350px] md:w-[650px] text-[#A7895C] rotate-12">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
            <path d="M39.6,-65.6C51.6,-57.4,61.8,-45.5,69.5,-31.6C77.2,-17.7,82.4,-1.8,79.5,12.7C76.6,27.2,65.6,40.3,52.2,49.2C38.8,58.1,23,62.8,7.9,64.8C-7.2,66.8,-21.6,66.1,-35.3,60C-49,53.9,-62,42.4,-70.7,27.7C-79.4,13,-83.8,-4.9,-80,-20.9C-76.2,-36.9,-64.2,-51,-50.1,-59.1C-36,-67.2,-18,-69.3,-1.3,-67.2C15.4,-65.1,30.8,-58.8,39.6,-65.6Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      <Header />
      <main className="relative z-10">
        <Hero />
        <Areas />
        <About />
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
