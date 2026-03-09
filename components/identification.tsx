"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

const identificationItems = [
  {
    icon: "/images/Amor.propio.png",
    title: "Amor Propio",
    description: "Es la manera de sentirnos y de relacionarnos con nosotros mismos, es indispensable para encontrar la fuerza y la motivación para conseguir y alcanzar objetivos en la vida tanto a nivel personal como profesional.",
    bgColor: "bg-[#e5a697]/10",
  },
  {
    icon: "/images/Relaciones.png",
    title: "Relaciones",
    description: " Engloba las relaciones familiares, sociales y amorosas. Constituye la manera en la que nos relacionamos, las habilidades sociales y la inteligencia emocional, las cuales son necesarias para construir relaciones sanas y significativas que perduren en el tiempo con calidad.",
    bgColor: "bg-[#8fb299]/10",
  },
  {
    icon: "/images/Espiritualidad.png",
    title: "Espiritualidad",
    description: "Es la búsqueda de significado, propósito y conexión con algo más grande que uno mismo. No está necesariamente ligada a la religión, aunque puede incluirla. Es un término muy personal y forma parte del balance en la vida.",
    bgColor: "bg-[#7db1c3]/10",
  },
]

export function Identification() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-[#4a5d4e] md:text-4xl lg:text-6xl mb-4">
            Áreas de vida
          </h2>
          <p className="text-lg-4xl md:text-lg-3xl lg:text-[25px] leading-relaxed text-[#5a6b5e]">
            ¿Cómo están tus áreas de vida actualmente?
          </p>
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

        <div className="mt-16 flex justify-center items-center text-center">
          <Link href="#agendar">
            <h3     
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-center font-medium text-[#A7895C] transition-colors hover:text-[#8b724c] hover:underline cursor-pointer"
            >
              ¿Te sientes identificado?
            </h3>
          </Link>
        </div>
      </div>
    </section>
  )
}
