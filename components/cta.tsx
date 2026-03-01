"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const WS_LINK = "https://wa.me/584245414804?text=Hola%2C%20me%20gustaria%20agendar%20una%20cita"

export function CTA() {
  return (
    <section
      id="agendar"
      className="relative overflow-hidden py-10 md:py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row-reverse md:justify-between lg:gap-16">
          
          {/* Texto y Botón */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-1 flex-col items-center text-center md:items-start md:text-left"
          >
            <h2 className="mb-4 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              El primer paso es decidirte
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-foreground/90">
              Agenda tu primera cita y comienza tu camino hacia el bienestar. Estoy aqui para acompañarte.
            </p>
            <Link
              href={WS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:opacity-90"
            >
              Comienza tu proceso
            </Link>
          </motion.div>

          {/* Imagen con líneas decorativas */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex w-full max-w-[320px] justify-center md:w-1/2 md:max-w-[400px] lg:justify-end"
          >
            <div className="relative w-full">
              {/* Imagen principal */}
              <div className="relative z-10 aspect-[3/4] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10">
                <Image
                  src="/images/503105315_18502906012055653_3828358369673935537_n.jpg"
                  alt="Maria Fernanda, el primer paso es decidirte"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
