"use client"

import { ShieldCheck, Truck, Zap, HeadphonesIcon } from "lucide-react"
import { motion } from "framer-motion"

const badges = [
  {
    icon: ShieldCheck,
    color: "text-primary",
    bg: "bg-primary/15",
    label: "Pago 100% seguro",
    sub: "Pago Móvil, Zelle o PayPal",
  },
  {
    icon: Truck,
    color: "text-[#A7895C]",
    bg: "bg-[#A7895C]/15",
    label: "Envíos a toda Venezuela",
    sub: "Y disponible en Amazon",
  },
  {
    icon: Zap,
    color: "text-accent",
    bg: "bg-accent/15",
    label: "Descarga inmediata",
    sub: "Para recursos digitales",
  },
  {
    icon: HeadphonesIcon,
    color: "text-secondary",
    bg: "bg-secondary/15",
    label: "Soporte personalizado",
    sub: "Te acompañamos por WhatsApp",
  },
]

export function StoreTrustBadges() {
  // Multiplicamos por 4 para asegurar que cubra pantallas grandes y el loop sea perfecto
  const repeatedBadges = [...badges, ...badges, ...badges, ...badges]

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="rounded-3xl bg-card py-10 shadow-sm relative overflow-hidden flex items-center">
          
          {/* Sombras difuminadas en los bordes */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-card to-transparent" />

          {/* Carrusel infinito */}
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-25%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20, // Ajusta este número para cambiar la velocidad (mayor = más lento)
            }}
          >
            {repeatedBadges.map((b, i) => (
              <div key={`${b.label}-${i}`} className="flex min-w-[280px] md:min-w-[320px] px-8 flex-col items-center gap-3 text-center">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${b.bg}`}>
                  <b.icon className={`h-7 w-7 ${b.color}`} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif text-base font-bold text-[#1a1a1a]">{b.label}</p>
                  <p className="mt-0.5 text-xs text-[#5c4b32]/70">{b.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
