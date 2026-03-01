import Link from "next/link"

const WS_LINK = "https://wa.me/584245414804?text=Hola%2C%20me%20gustaria%20agendar%20una%20cita"

export function CTA() {
  return (
    <section
      id="agendar"
      className="relative overflow-hidden py-10 md:py-16"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="mb-4 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
          El primer paso es decidirte
        </h2>
        <p className="mb-8 text-xl leading-relaxed text-foreground/90">
          Agenda tu primera cita y comienza tu camino hacia el bienestar. Estoy aqui para acompanarte.
        </p>
        <Link
          href={WS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
        >
          Agenda tu cita
        </Link>
      </div>
    </section>
  )
}
