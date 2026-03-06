import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundShapes } from "@/components/background-shapes"

export const metadata = {
  title: "Términos y Condiciones | Todo es un Balance",
  description: "Términos y condiciones de Todo es un Balance."
}

export default function TermsAndConditions() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundShapes />
      <Header />
      <main className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32">
        <h1 className="mb-8 font-serif text-4xl font-bold text-[#1a1a1a] md:text-5xl">
          Términos y Condiciones
        </h1>
        <div className="prose prose-stone max-w-none text-[#333333]">
          <p className="mb-4">
            <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-VE')}
          </p>
          <p className="mb-6">
            Al acceder a nuestra página web <strong>Todo es un Balance</strong> o al contratar nuestros servicios psicológicos, ya sea de modalidad online o presencial, aceptas estos términos y condiciones en su totalidad. Recomendamos leer este documento con atención.
          </p>
          
          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">1. Naturaleza del Servicio</h2>
          <p className="mb-6">
            La titular de la página, Psicóloga María Fernanda Azcunes, ofrece asesoría psicológica clínica, intervenciones psicoterapéuticas individuales, de pareja y creación de talleres/recursos orientados a la salud mental y el bienestar emocional. Las consultas online gozan de la misma validez y rigor que una consulta presencial.
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">2. Proceso de Agendamiento y Pago</h2>
          <p className="mb-6">
            Para coordinar y confirmar la reserva de cualquier cita, el usuario debe realizar previamente el pago total correspondiente, de acuerdo a las tarifas expresadas en nuestra página (Euros referenciales, conversiones según método de pago). Aceptamos transferencias y métodos de pago digital, entre ellos Zelle, PayPal y Pago Móvil (Venezuela).
          </p>
          
          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">3. Políticas de Cancelación o Reprogramación</h2>
          <p className="mb-6">
            Comprendemos que pueden surgir imprevistos. Para cancelar o reprogramar una sesión sin perder el monto abonado, el paciente debe avisar con un mínimo de <strong>24 horas de antelación</strong>. De no hacerlo en ese lapso, la sesión se dará por consumida. Los retrasos a la cita por parte del paciente que superen los 15 minutos sin previo aviso podrán ocasionar la pérdida de la misma sesión o su reducción en tiempo efectivo por respeto a posteriores pacientes agendados.
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">4. Situaciones de Emergencia</h2>
          <p className="mb-6">
            Las sesiones de terapia psicológica establecidas a través de esta plataforma no constituyen un servicio de atención a emergencias. Si usted o un persona a su alrededor se encuentra en una situación de crisis severa, de urgencia psiquiátrica inmediata, o en peligro inminente contra su propia vida o la de terceros, debe acudir a los servicios de socorro oficial o a la sala de emergencias de un centro de salud cercano.
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">5. Tecnologías de la Información</h2>
          <p className="mb-6">
            En el caso de las sesiones online, es responsabilidad del paciente disponer de una conexión a internet adecuada, así como de dispositivos que cuenten con micrófono y cámara en buen funcionamiento. "Todo es un Balance" no se hará responsable por fallas de desconexión producto de los proveedores de internet del usuario.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
