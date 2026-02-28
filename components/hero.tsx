import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:gap-16">
        {/* Text block */}
        <div className="flex flex-1 flex-col gap-6 text-center md:text-left">
          <h1 className="font-serif text-4xl leading-tight font-light tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Bienvenido a{" "}
            <span className="text-primary italic">todo es un balance</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            Un espacio creado pensando en tu bienestar
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <Link
              href="#agendar"
              className="rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Agendar cita
            </Link>
            <Link
              href="#sobre-mi"
              className="rounded-full border-2 border-primary px-8 py-3.5 text-base font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Conoce mas
            </Link>
          </div>
        </div>

        {/* Image collage */}
        <div className="relative flex flex-1 justify-center">
          <div className="relative">
            {/* Main image */}
            <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10">
              <Image
                src="/images/about-sofa.jpg"
                alt="Maria Fernanda Azcunes, psicologa"
                width={420}
                height={520}
                className="h-auto w-[320px] object-cover md:w-[420px]"
                priority
              />
            </div>
            {/* Second smaller image overlapping */}
            <div className="absolute -right-8 -bottom-8 z-20 overflow-hidden rounded-2xl border-4 border-background shadow-lg md:-right-12 md:-bottom-12">
              <Image
                src="/images/hero-diplomas.jpg"
                alt="Maria Fernanda con sus titulos profesionales"
                width={160}
                height={200}
                className="h-auto w-[120px] object-cover md:w-[160px]"
                priority
              />
            </div>
            {/* Decorative blob behind */}
            <div className="absolute -top-6 -left-6 -z-10 h-full w-full rounded-[2rem] bg-primary/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
