import Image from "next/image"
import Link from "next/link"

const WS_LINK = "https://wa.me/584245414804?text=Hola%2C%20me%20gustaria%20agendar%20una%20cita"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 md:flex-row md:gap-14">

        {/* Text block & Botones */}
        <div className="flex flex-1 flex-col gap-5 text-center md:text-left">
          <h1 className="font-serif text-4xl leading-tight font-light tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Bienvenido a{" "}
            <span className="text-primary italic">todo es un balance</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            Un espacio creado pensando en tu bienestar
          </p>

          {/* Imagen solo para Mobile (Antes de los botones) */}
          <div className="relative my-4 flex justify-center md:hidden">
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10">
                <Image
                  src="/images/about-sofa.jpg"
                  alt="Maria Fernanda Azcunes, psicologa"
                  width={420}
                  height={520}
                  className="h-auto w-[300px] object-cover"
                  priority
                />
              </div>
              <div className="absolute -top-4 -left-4 -z-10 h-full w-full rounded-[2rem] bg-primary/20" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <Link
              href={WS_LINK}
              target="_blank"
              rel="noopener noreferrer"
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

        {/* Imagen solo para Desktop */}
        <div className="relative hidden flex-1 justify-center md:flex">
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10">
              <Image
                src="/images/about-sofa.jpg"
                alt="Maria Fernanda Azcunes, psicologa"
                width={420}
                height={520}
                className="h-auto w-[400px] object-cover"
                priority
              />
            </div>
            <div className="absolute -top-6 -left-6 -z-10 h-full w-full rounded-[2rem] bg-primary/20" />
          </div>
        </div>

      </div>
    </section>
  )
}