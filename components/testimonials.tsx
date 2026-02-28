import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Aprendi a poner limites sin sentir culpa. El proceso con Maria Fernanda cambio mi forma de relacionarme conmigo misma.",
    author: "Laura M.",
  },
  {
    quote:
      "La terapia de parejas nos ayudo a comunicarnos de una manera completamente diferente. Estamos mas unidos que nunca.",
    author: "Carlos y Andrea",
  },
  {
    quote:
      "Nunca pense que podria gestionar mi ansiedad de esta forma. Hoy tengo herramientas reales para mis dias dificiles.",
    author: "Sofia R.",
  },
]

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Historias de Balance
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="flex flex-col gap-6 rounded-3xl bg-card p-8 shadow-sm"
            >
              <Quote className="h-8 w-8 text-primary/30" />
              <p className="flex-1 text-base leading-relaxed text-card-foreground/80 italic">
                {`"${t.quote}"`}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/15" />
                <span className="text-sm font-semibold text-card-foreground">
                  {t.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
