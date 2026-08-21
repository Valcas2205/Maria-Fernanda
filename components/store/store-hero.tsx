"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Volume2, VolumeX } from "lucide-react"

export function StoreHero() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [textHeight, setTextHeight] = useState<number | "auto">("auto")

  useEffect(() => {
    const updateHeight = () => {
      if (textRef.current && window.innerWidth < 1024) {
        setTextHeight(textRef.current.offsetHeight)
      } else {
        setTextHeight("auto")
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  return (
    <section className="relative px-6 py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-stretch lg:gap-16">
          {/* Text Content */}
          <div ref={textRef} className="flex flex-col gap-5 text-center lg:text-left py-4 lg:py-10">
            <div className="flex flex-col items-center w-fit mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <Image
                  src="/images/ISOTIPO-103 2.PNG"
                  alt="Todo es un balance"
                  width={160}
                  height={160}
                  className="h-28 lg:h-40 w-auto object-contain drop-shadow-sm"
                />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-5xl font-bold leading-tight tracking-tight text-[#1a1a1a] md:text-6xl lg:text-7xl text-balance"
              >
                Bienvenidos a mi <br className="hidden lg:block" />
                <span className="font-serif italic text-[#A7895C]">Tienda</span>
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-lg text-xl leading-relaxed text-[#5c4b32] md:text-2xl font-medium mx-auto lg:mx-0"
            >
              Pensada y estructurada con mucho amor para acompañarlos. 
              Aquí encontrarán herramientas prácticas y recursos creados 
              especialmente para su crecimiento personal y bienestar emocional.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-2 hidden lg:flex flex-col items-center gap-4 sm:flex-row lg:items-start w-full sm:justify-center lg:justify-start"
            >
              <button
                onClick={() => {
                  window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })
                }}
                className="w-full sm:w-auto rounded-full bg-[#A7895C] px-10 py-4 text-lg sm:text-base font-semibold text-white transition-opacity hover:opacity-90 text-center"
              >
                Comprar ahora
              </button>
              <Link
                href="https://amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-full border-2 border-[#A7895C] px-10 py-4 text-lg sm:text-base font-semibold text-[#A7895C] transition-colors hover:bg-[#A7895C]/10 text-center"
              >
                Comprar en Amazon
              </Link>
            </motion.div>
          </div>

          {/* Visual Content (Video) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[340px] lg:max-w-none lg:h-auto transition-all"
            style={{ height: textHeight === "auto" ? undefined : textHeight }}
          >
            {/* Vertical Video Container matched to text height via flex/stretch */}
            <div 
              className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[2.5rem] rounded-tl-[5rem] rounded-br-[5rem] shadow-2xl ring-1 ring-black/5"
              onClick={toggleMute}
            >
              <video
                ref={videoRef}
                src="/hero-reel.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
              
              {/* Mute/Unmute Icon */}
              <button
                className="absolute bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30 hover:scale-110"
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
            
            
          </motion.div>

          {/* Botones para Mobile (debajo del video) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-2 flex lg:hidden flex-col items-center gap-4 sm:flex-row w-full sm:justify-center"
          >
            <button
              onClick={() => {
                window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })
              }}
              className="w-full sm:w-auto rounded-full bg-[#A7895C] px-10 py-4 text-lg sm:text-base font-semibold text-white transition-opacity hover:opacity-90 text-center"
            >
              Comprar ahora
            </button>
            <Link
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-full border-2 border-[#A7895C] px-10 py-4 text-lg sm:text-base font-semibold text-[#A7895C] transition-colors hover:bg-[#A7895C]/10 text-center"
            >
              Comprar en Amazon
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
