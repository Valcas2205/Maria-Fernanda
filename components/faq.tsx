"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Como funcionan las sesiones online?",
    answer:
      "Las sesiones online se realizan a traves de videollamada en una plataforma segura. Solo necesitas una conexion estable a internet, un espacio privado y comodo, y un dispositivo con camara y microfono. La experiencia es igual de efectiva que una sesion presencial.",
  },
  {
    question: "Cuanto dura el proceso terapeutico?",
    answer:
      "La duracion del proceso depende de cada persona y sus objetivos. Algunas personas encuentran lo que necesitan en pocas sesiones, mientras que otros procesos requieren mas tiempo. Lo importante es que vamos a tu ritmo, sin presiones.",
  },
  {
    question: "Es confidencial lo que hablamos en terapia?",
    answer:
      "Absolutamente. Todo lo que compartas en sesion esta protegido por el secreto profesional. La confidencialidad es uno de los pilares fundamentales de la terapia y es mi compromiso contigo.",
  },
  {
    question: "Con que frecuencia debo asistir a las sesiones?",
    answer:
      "Generalmente recomiendo sesiones semanales al inicio del proceso, ya que esto permite mantener el ritmo y avanzar de forma efectiva. Con el tiempo, podemos espaciarlas segun tu evolucion y necesidades.",
  },
  {
    question: "Que enfoque terapeutico utilizas?",
    answer:
      "Trabajo con un enfoque cognitivo-conductual, integrando herramientas de otras corrientes segun lo que cada persona necesite. Mi objetivo es ofrecerte un espacio practico, empatico y adaptado a ti.",
  },
  {
    question: "Como puedo pagar las sesiones?",
    answer:
      "Acepto transferencia bancaria y otros metodos de pago digital. El pago se realiza antes o despues de cada sesion, segun acordemos en nuestra primera consulta.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-center font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
          Preguntas Frecuentes
        </h2>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-serif text-base font-medium text-foreground md:text-lg">
                  {"?" + faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-foreground/40 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
