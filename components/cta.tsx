import Link from "next/link"

export function CTA() {
  return (
    <section
      id="agendar"
      className="relative overflow-hidden py-14 md:py-20"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="mb-4 font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
          El primer paso es decidirte
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          Agenda tu primera cita y comienza tu camino hacia el bienestar. Estoy aqui para acompanarte.
        </p>
        <Link
          href="https://www.instagram.com/todoesunbalance/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
        >
          Agenda tu cita
        </Link>
      </div>
    </section>
  )
}
