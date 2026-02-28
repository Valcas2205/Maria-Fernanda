import Image from "next/image"
import { GraduationCap, Award, BookOpen } from "lucide-react"

const credentials = [
  {
    icon: GraduationCap,
    title: "Licenciada en Psicologia",
    year: "2022",
  },
  {
    icon: Award,
    title: "Master en Psicologia Clinica y de la Salud",
    subtitle: "ISEP, Espana",
  },
  {
    icon: BookOpen,
    title: "Especializacion en Psicoterapia Cognitivo Conductual",
    subtitle: "",
  },
]

export function About() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden py-24 md:py-32">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-10 right-0 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section label */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary">
            El Origen
          </span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Sobre mi
          </h2>
        </div>

        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          {/* Image */}
          <div className="relative flex-shrink-0">
            <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-secondary/10">
              <Image
                src="/images/about-sofa.jpg"
                alt="Maria Fernanda Azcunes"
                width={380}
                height={480}
                className="h-auto w-[300px] object-cover md:w-[380px]"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[2rem] bg-secondary/20" />
          </div>

          {/* Text */}
          <div className="flex flex-1 flex-col gap-6">
            <p className="text-lg leading-relaxed text-foreground/80">
              <span className="font-serif text-xl italic text-primary">Todo es un balance</span>{" "}
              nacio en 2020 como un blog psicoeducativo, con la idea de acercar la psicologia a las personas de forma cercana y comprensible.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              Hoy es mi proposito de vida: ayudarte a conocerte mejor, a mejorar la relacion contigo mismo y a construir un bienestar que sea sostenible y real.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Creo profundamente en que la terapia es un acto de valentia, y me siento honrada cada vez que alguien me permite acompanarle en su proceso.
            </p>
          </div>
        </div>

        {/* Credentials */}
        <div className="mt-20">
          <h3 className="mb-10 text-center font-serif text-2xl font-light text-foreground md:text-3xl">
            Respaldo Profesional
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {credentials.map((cred) => (
              <div
                key={cred.title}
                className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 text-center shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                  <cred.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-base font-semibold text-card-foreground">
                  {cred.title}
                </h4>
                {cred.subtitle && (
                  <p className="text-sm text-muted-foreground">{cred.subtitle}</p>
                )}
                {cred.year && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {cred.year}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
