import Link from "next/link"
import { Video, Users, BookOpen, Clock } from "lucide-react"

const services = [
  {
    icon: Video,
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
    highlighted: false,
  },
  {
    icon: Users,
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
    highlighted: true,
    badge: "Mas solicitado",
  },
  {
    icon: BookOpen,
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
    highlighted: false,
    ctaLabel: "Mas info",
  },
]

export function Pricing() {
  return (
    <section id="inversion" className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-light tracking-tight text-[#1a1a1a] md:text-4xl lg:text-5xl text-balance">
            Servicios
          </h2>
          <p className="mt-4 font-serif text-lg italic text-[#1a1a1a]/60">
            Elige la opcion que mejor se adapte a tu momento y necesidades
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className={`relative flex flex-col rounded-3xl p-7 transition-shadow hover:shadow-lg ${
                service.highlighted
                  ? "border-2 border-primary/30 bg-card shadow-md"
                  : "bg-card shadow-sm"
              }`}
            >
              {service.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-5 py-1.5 text-xs font-semibold text-[#ffffff] whitespace-nowrap">
                  {service.badge}
                </span>
              )}

              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60">
                <service.icon className="h-5 w-5 text-accent" />
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
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
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
                  href="#agendar"
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
