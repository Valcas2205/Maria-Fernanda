"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const WS_LINK = "https://wa.me/584245414804?text=Hola%2C%20me%20gustaria%20agendar%20una%20cita"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 md:flex-row md:gap-14">

        {/* Text block & Botones */}
        <div className="flex flex-1 flex-col gap-5 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance"
          >
            Bienvenido a{" "}
            <span className="font-serif italic text-primary">todo es un balance</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg text-xl leading-relaxed text-foreground/90 md:text-2xl"
          >
            Un espacio creado pensando en tu bienestar
          </motion.p>

          {/* Imagen solo para Mobile (Antes de los botones) */}
          <div className="relative my-4 flex justify-center md:hidden">
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10">
                <Image
                  src="/images/about-sofa.jpg"
                  alt="Maria Fernanda Azcunes, psicologa"
                  width={420}
                  height={520}
                  className="h-auto w-[300px] object-cover"
                  priority
                />
              </div>
              <div className="absolute -top-4 -left-4 -z-10 h-full w-full rounded-[2rem] bg-primary/20" />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-4 sm:flex-row md:items-start"
          >
            <Link
              href={WS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-full bg-primary px-10 py-4 text-lg sm:text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 text-center"
            >
              Agendar cita
            </Link>
            <Link
              href="#sobre-mi"
              className="w-full sm:w-auto rounded-full border-2 border-primary px-10 py-4 text-lg sm:text-base font-semibold text-primary transition-colors hover:bg-primary/10 text-center"
            >
              Conoce mas
            </Link>
          </motion.div>
        </div>

        {/* Imagen solo para Desktop */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative hidden flex-1 justify-center md:flex lg:justify-end"
        >
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10">
              <Image
                src="/images/about-sofa.jpg"
                alt="Maria Fernanda Azcunes, psicologa"
                width={480}
                height={600}
                className="h-auto w-[400px] object-cover md:w-[380px] lg:w-[480px]"
                priority
              />
            </div>
            <div className="absolute -top-6 -left-6 -z-10 h-full w-full rounded-[2rem] bg-primary/20" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}