import Link from "next/link"
import { Clock, User, Users, BookOpen } from "lucide-react"

const WS_LINK = "https://wa.me/584245414804?text=Hola%2C%20me%20gustaria%20agendar%20una%20cita"

const services = [
  {
    icon: User,
    iconColor: "text-accent",
    iconBg: "bg-accent/15",
    title: "Terapia Individual",
    description:
      "Sesiones personalizadas online o presenciales en Barquisimeto. Trabajo con depresion, ansiedad, autoestima, duelo, y trastornos de la conducta alimentaria.",
    bullets: [
      "Sesiones de 60 minutos",
      "Online en todo el mundo",
      "Presencial en Barquisimeto",
    ],
    price: "\u20AC45",
    priceLabel: "por sesion",
    bulletColor: "bg-accent",
  },
  {
    icon: Users,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
    title: "Terapia de Parejas",
    description:
      "Espacios seguros para fortalecer la comunicacion, resolver conflictos y reconstruir la conexion en tu relacion.",
    bullets: [
      "Enfoque practico",
      "Herramientas de comunicacion",
      "Seguimiento personalizado",
    ],
    price: "\u20AC60",
    priceLabel: "por sesion",
    bulletColor: "bg-secondary",
  },
  {
    icon: BookOpen,
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
    title: "Talleres y Recursos",
    description:
      "Talleres grupales, cursos y material descargable para que sigas aprendiendo y creciendo a tu propio ritmo.",
    bullets: [
      "Contenido exclusivo",
      "Actividades practicas",
      "Comunidad de apoyo",
    ],
    price: null,
    priceLabel: null,
    ctaLabel: "Mas info",
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
              className="relative flex flex-col rounded-3xl bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* Icon */}
              <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${service.iconBg}`}>
                <service.icon className={`h-8 w-8 ${service.iconColor}`} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-bold text-card-foreground">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-base leading-relaxed text-[#333333]">
                {service.description}
              </p>

              {/* Bullet points */}
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3 text-base">
                    <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${service.bulletColor}`} />
                    <span className="text-[#333333]">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Price or CTA */}
              {service.price ? (
                <div className="mt-8 flex items-center gap-2">
                  <span className="font-serif text-4xl font-bold text-secondary">
                    {service.price}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{service.priceLabel}</span>
                  </div>
                </div>
              ) : (
                <Link
                  href={WS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block rounded-full border-2 border-accent/40 py-3 text-center text-sm font-medium text-accent transition-colors hover:bg-accent/10"
                >
                  {service.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
