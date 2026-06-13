import Link from "next/link"
import { Clock, User, Users, BookOpen, type LucideIcon } from "lucide-react"

const WS_LINK = "https://wa.me/584245414804?text=Hola%2C%20me%20gustaria%20agendar%20una%20cita"

type Service = {
  icon: LucideIcon
  iconColor: string
  iconBg: string
  title: string
  description: string
  bullets: string[]
  price: string | null
  priceLabel: string | null
  bulletColor: string
  subscriptionId?: string
  ctaLabel?: string
}

const services: Service[] = [
  {
    icon: User,
    iconColor: "text-accent",
    iconBg: "bg-accent/15",
    title: "Terapia Individual",
    description:
      "Sesiones personalizadas individuales. Adultos y adolescentes a partir de 16 años.",
    bullets: [
      "Sesiones de 60 minutos.",
      "Online en todo el mundo.",
      "Presencial en Barquisimeto, Venezuela.",
    ],
    price: "$50",
    priceLabel: "por sesión",
    subscriptionId: "terapia-individual",
    bulletColor: "bg-accent",
  },
  {
    icon: Users,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
    title: "Terapia de Parejas",
    description:
      "Sesiones en pareja. Se recomienda antes asistir ambos individualmente. Espacio seguro para trabajar en la comunicación, resolución de conflictos y reconexión emocional.",
    bullets: [
      "Sesiones de 90-120 minutos.",
      "Online en todo el mundo.",
      "Presencial en Barquisimeto, Venezuela.",
    ],
    price: "$70",
    priceLabel: "por sesión",
    subscriptionId: "terapia-parejas",
    bulletColor: "bg-secondary",
  },
  {
    icon: BookOpen,
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
    title: "Talleres y Recursos",
    description:
      "Talleres grupales, cursos y material descargable para que sigas aprendiendo y creciendo a tu propio ritmo",
    bullets: [
      "Talleres/cursos presenciales y online constantes que se anuncian en redes sociales.",
      "Talleres/formaciones sobre inteligencia emocional y trabajo en equipo para empresas/organizaciones.",
      "Contenido/material exclusivo que conseguirás en todas mis redes sociales.",
    ],
    price: null,
    priceLabel: null,
    ctaLabel: "Más info",
    bulletColor: "bg-primary",
  },
]

export function Pricing() {
  return (
    <section id="inversion" className="relative overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl text-balance">
            Servicios
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative flex h-full flex-col rounded-3xl bg-card p-6 shadow-sm transition-shadow hover:shadow-lg lg:p-8"
            >
              {/* Icon */}
              <div className={`mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${service.iconBg} lg:h-16 lg:w-16`}>
                <service.icon className={`h-7 w-7 ${service.iconColor} lg:h-8 lg:w-8`} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="mb-3 font-serif text-2xl font-bold text-card-foreground lg:text-3xl">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mb-6 text-[15px] leading-relaxed text-[#333333] lg:text-base">
                {service.description}
              </p>

              {/* Bullet points */}
              <ul className="mb-8 flex flex-1 flex-col gap-4">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-[14px] leading-snug lg:text-[15px]">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${service.bulletColor}`} />
                    <span className="text-[#333333]">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Price or CTA */}
              <div className="mt-auto">
                {service.price ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-3xl font-bold text-secondary lg:text-4xl">
                        {service.price}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{service.priceLabel}</span>
                      </div>
                    </div>
                    {service.subscriptionId ? (
                      <Link
                        href={`/checkout?id=${service.subscriptionId}&surface=pricing`}
                        className="block rounded-full bg-secondary py-2.5 text-center text-sm font-medium text-secondary-foreground transition-opacity hover:opacity-90"
                      >
                        Reservar y pagar
                      </Link>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    href={WS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-full border-2 border-accent/40 py-2.5 text-center text-sm font-medium text-accent transition-colors hover:bg-accent/10"
                  >
                    {service.ctaLabel}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
