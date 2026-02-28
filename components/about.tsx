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
    <section id="sobre-mi" className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Name heading */}
        <h2 className="mb-10 font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Psic. Maria Fernanda Azcunes
        </h2>

        <div className="flex flex-col gap-10 md:flex-row md:gap-14">
          {/* Image - left column */}
          <div className="relative flex-shrink-0">
            <div className="overflow-hidden rounded-[2rem]">
              <Image
                src="/images/hero-diplomas.jpg"
                alt="Maria Fernanda Azcunes con sus titulos profesionales"
                width={400}
                height={520}
                className="h-auto w-full max-w-[400px] object-cover"
              />
            </div>
          </div>

          {/* Text + Credentials - right column */}
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-4">
              <p className="text-lg leading-relaxed text-foreground/80">
                Todo comenzo en 2020, cuando este proyecto nacio como un blog psicoeducativo. Lo que inicio como una manera de compartir conocimiento se transformo en algo mucho mas profundo:{" "}
                <span className="font-serif italic text-accent">mi proposito de vida</span>.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                Hoy, <span className="font-serif italic text-primary">todo es un balance</span>{" "}
                es un espacio dedicado a ayudar a las personas a conocerse mejor, a mejorar la relacion consigo mismas y a encontrar ese equilibrio que todos buscamos.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                Creo profundamente en que la terapia es un acto de valentia, y me siento honrada cada vez que alguien me permite acompanarle en su proceso.
              </p>
            </div>

            {/* Credentials inline - compact, right after the text */}
            <div className="mt-1">
              <h3 className="mb-3 font-serif text-xl font-light text-foreground">
                Respaldo Profesional
              </h3>
              <div className="flex flex-col gap-2.5">
                {credentials.map((cred) => (
                  <div
                    key={cred.title}
                    className="flex items-center gap-3 rounded-xl bg-card/70 px-4 py-3 backdrop-blur-sm"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <cred.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-card-foreground leading-tight">
                        {cred.title}
                      </h4>
                      {cred.subtitle && (
                        <p className="text-xs text-muted-foreground">{cred.subtitle}</p>
                      )}
                      {cred.year && (
                        <p className="text-xs text-muted-foreground">{cred.year}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
