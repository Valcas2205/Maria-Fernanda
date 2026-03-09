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
          <div className="flex flex-col items-center w-fit mx-auto md:mx-0">
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
              transition={{ duration: 0.6 }}
              className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance"
            >
              Bienvenido a{" "}
              <span className="font-serif italic text-[#A7895C]">todo es un balance</span>
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg text-xl leading-relaxed text-[#5c4b32] md:text-2xl font-medium"
          >
            Un espacio creado pensando en tu bienestar
          </motion.p>

          {/* Imagen solo para Mobile (Antes de los botones) */}
          <div className="relative my-4 flex justify-center md:hidden">
            <div className="relative flex items-center justify-center mt-6">
              <div className="relative z-10 w-full flex justify-center">
                <Image
                  src="/images/MagicEraser_250917_165551.PNG"
                  alt="Maria Fernanda Azcunes, psicologa"
                  width={420}
                  height={520}
                  className="h-auto w-[280px] object-contain drop-shadow-2xl"
                  priority
                />
              </div>
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
              className="w-full sm:w-auto rounded-full bg-[#A7895C] px-10 py-4 text-lg sm:text-base font-semibold text-white transition-opacity hover:opacity-90 text-center"
            >
              Agendar cita
            </Link>
            <Link
              href="#sobre-mi"
              className="w-full sm:w-auto rounded-full border-2 border-[#A7895C] px-10 py-4 text-lg sm:text-base font-semibold text-[#A7895C] transition-colors hover:bg-[#A7895C]/10 text-center"
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
          <div className="relative flex items-center justify-center lg:mr-8 mt-10">
            <div className="relative z-10">
              <Image
                src="/images/MagicEraser_250917_165551.PNG"
                alt="Maria Fernanda Azcunes, psicologa"
                width={480}
                height={600}
                className="h-auto w-[320px] lg:w-[420px] object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}