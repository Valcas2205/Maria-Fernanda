"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const identificationItems = [
  {
    icon: "/images/Amor.propio.png",
    title: "Amor Propio",
    description: "Te cuesta priorizarte, poner límites y cuidar de ti sin sentirte culpable. Es hora de reconectar contigo.",
    bgColor: "bg-[#e5a697]/10",
  },
  {
    icon: "/images/Relaciones.png",
    title: "Relaciones",
    description: "Tus relaciones te agotan, te cuesta comunicar lo que sientes y a veces te olvidas de tus propias necesidades.",
    bgColor: "bg-[#8fb299]/10",
  },
  {
    icon: "/images/Espiritualidad.png",
    title: "Espiritualidad",
    description: "Vives en automático, desconectado de tu propósito y de lo que realmente te da paz interior.",
    bgColor: "bg-[#7db1c3]/10",
  },
]

export function Identification() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-[#4a5d4e] md:text-4xl lg:text-5xl">
            ¿Te sientes identificado?
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {identificationItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex flex-col items-center rounded-[2.5rem] bg-[#faf7f2] p-10 text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#A7895C]/5 hover:-translate-y-1"
            >
              <div className={`mb-8 flex h-24 w-24 items-center justify-center rounded-full ${item.bgColor} p-5 transition-transform duration-300 group-hover:scale-110`}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>

              <h3 className="mb-4 font-serif text-2xl font-semibold text-[#4a5d4e]">
                {item.title}
              </h3>

              <p className="text-lg leading-relaxed text-[#5a6b5e]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
