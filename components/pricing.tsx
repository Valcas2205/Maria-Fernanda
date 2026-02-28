import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"

const WS_LINK = "https://wa.me/584245414804?text=Hola%2C%20me%20gustaria%20agendar%20una%20cita"

const services = [
  {
    icon: "/images/icon-relaciones.png",
    iconAlt: "Terapia Individual",
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
    icon: "/images/icon-amor-propio.png",
    iconAlt: "Terapia de Parejas",
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
    icon: "/images/icon-espiritualidad.png",
    iconAlt: "Talleres y Recursos",
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
    <section id="inversion" className="relative overflow-hidden py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-light tracking-tight text-[#1a1a1a] md:text-4xl lg:text-5xl text-balance">
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
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/50">
                <Image
                  src={service.icon}
                  alt={service.iconAlt}
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-medium text-card-foreground">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              {/* Bullet points */}
              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2.5 text-sm">
                    <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${service.bulletColor}`} />
                    <span className="text-[#1a1a1a]/70">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Price or CTA */}
              {service.price ? (
                <div className="mt-6 flex items-center gap-2">
                  <span className="font-serif text-3xl font-light text-secondary">
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
