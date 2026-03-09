"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "¿Cómo funcionan las sesiones online?",
    answer:
      "Las sesiones online se realizan a través de videollamada en una plataforma segura. Solo necesitas una conexión estable a internet, un espacio privado y cómodo, y un dispositivo con cámara y micrófono que rectifiques que funcione correctamente. La experiencia es igual de efectiva que una sesión presencial.",
  },
  {
    question: "¿Cuánto dura el proceso terapéutico?",
    answer:
      "La duración del proceso depende de cada caso y sus objetivos. De acuerdo a las necesidades, objetivos y posibilidades del paciente se evaluará cuántas sesiones serán efectivas para lograr los objetivos terapéuticos.",
  },
  {
    question: "¿Es confidencial lo que hablamos en terapia?",
    answer:
      "Absolutamente. Todo lo que compartas en sesión está protegido por el secreto profesional. La confidencialidad es uno de los pilares fundamentales de la terapia, además de mi compromiso contigo.",
  },
  {
    question: "¿Con qué frecuencia debo asistir a las sesiones?",
    answer:
      "Dependerá de las necesidades y objetivos del paciente. Generalmente recomiendo sesiones semanales o quincenales al inicio del proceso, ya que esto permite una evaluación efectiva de los síntomas, para así poder dar con el tratamiento correcto. Con el tiempo, podemos espaciarlas según la evolución y necesidades del paciente. Independientemente de cuál sea la frecuencia de asistencia, es importante tener en cuenta que la constancia es lo que llevará a objetivos reales.",
  },
  {
    question: "¿Con qué enfoque terapéutico trabajas?",
    answer:
      "Trabajo con psicoterapia integrativa. Principalmente utilizando el enfoque cognitivo-conductual, pero integrando herramientas de otras corrientes como la humanista, según las necesidades de cada paciente. Mi objetivo es ofrecerte un espacio práctico, empático y adaptado a ti.",
  },
  {
    question: "¿Cómo puedo pagar las sesiones?",
    answer:
      "Los métodos de pago por el momento son paypal, zelle o pago móvil (Venezuela). Para agendar la consulta debe haberse realizado el pago total de la misma.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-center font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
          Preguntas Frecuentes
        </h2>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                <span className="font-serif text-lg font-bold text-[#1a1a1a] md:text-xl">
                  {faq.question}
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
                  <p className="px-6 pb-5 text-base leading-relaxed text-[#333333] md:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
