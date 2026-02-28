import Link from "next/link"
import { Check } from "lucide-react"

const plans = [
  {
    title: "Consulta Individual",
    subtitle: "Presencial",
    price: "Consultar",
    features: [
      "Sesion de 50 minutos",
      "Espacio confidencial",
      "Plan terapeutico personalizado",
    ],
    highlighted: false,
  },
  {
    title: "Consulta Individual",
    subtitle: "Online",
    price: "Consultar",
    features: [
      "Sesion de 50 minutos",
      "Desde cualquier lugar",
      "Misma calidad terapeutica",
    ],
    highlighted: true,
  },
  {
    title: "Terapia de Parejas",
    subtitle: "Presencial u Online",
    price: "Consultar",
    features: [
      "Sesion de 60 minutos",
      "Trabajo conjunto",
      "Herramientas de comunicacion",
    ],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="inversion" className="relative overflow-hidden py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-secondary/15 px-4 py-1.5 text-sm font-medium text-[#c27868]">
            Tarifas
          </span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Inversion en ti
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={`${plan.title}-${plan.subtitle}`}
              className={`relative flex flex-col rounded-3xl p-7 shadow-sm transition-shadow hover:shadow-lg ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 right-6 rounded-full bg-secondary px-4 py-1 text-xs font-semibold text-secondary-foreground">
                  Popular
                </span>
              )}

              <h3 className="font-serif text-xl font-medium">{plan.title}</h3>
              <p
                className={`mt-1 text-sm ${
                  plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {plan.subtitle}
              </p>

              <p className="mt-5 font-serif text-3xl font-light">{plan.price}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check
                      className={`h-4 w-4 flex-shrink-0 ${
                        plan.highlighted ? "text-primary-foreground/80" : "text-primary"
                      }`}
                    />
                    <span
                      className={
                        plan.highlighted ? "text-primary-foreground/90" : "text-muted-foreground"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#agendar"
                className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90 ${
                  plan.highlighted
                    ? "bg-card text-primary"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                Agendar cita
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
