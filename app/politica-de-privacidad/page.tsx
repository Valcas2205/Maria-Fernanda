import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundShapes } from "@/components/background-shapes"

export const metadata = {
  title: "Política de Privacidad | Todo es un Balance",
  description: "Política de privacidad de Todo es un Balance."
}

export default function PrivacyPolicy() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundShapes />
      <Header />
      <main className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32">
        <h1 className="mb-8 font-serif text-4xl font-bold text-[#1a1a1a] md:text-5xl">
          Política de Privacidad
        </h1>
        <div className="prose prose-stone max-w-none text-[#333333]">
          <p className="mb-4">
            <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-VE')}
          </p>
          <p className="mb-6">
            En <strong>Todo es un Balance</strong>, la protección de tus datos personales y tu privacidad es de suma importancia. A pesar de que nuestros servicios son ofrecidos desde Venezuela, estamos comprometidos a cumplir con estándares internacionales de protección de datos personales para garantizar la confidencialidad de la información de todos nuestros pacientes, sin importar en qué parte del mundo se encuentren.
          </p>
          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">1. Información que recopilamos</h2>
          <p className="mb-6">
            Recopilamos información personal (como nombre, correo electrónico y número de teléfono) únicamente cuando el usuario nos la proporciona voluntariamente, por ejemplo, al agendar una cita o contactarnos a través de nuestros canales oficiales (ej. WhatsApp o correo electrónico). Asimismo, la información compartida durante las sesiones terapéuticas está completamente bajo el amparo del secreto profesional.
          </p>
          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">2. Uso de la Información</h2>
          <p className="mb-6">
            Los datos personales que recopilamos son utilizados de manera exclusiva para:
          </p>
          <ul className="mb-6 list-disc pl-6">
            <li>Agendar, coordinar y llevar a cabo las sesiones de terapia.</li>
            <li>Gestionar los pagos por los servicios profesionales.</li>
            <li>Mejorar tu experiencia en nuestra web mediante el uso de cookies.</li>
          </ul>
          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">3. Secreto Profesional</h2>
          <p className="mb-6">
            Cualquier información de carácter médico, psicológico o personal discutida en el ámbito de una consulta está estrictamente protegida por el Código de Ética de la Psicología. No se compartirá información con terceros sin el consentimiento expreso y por escrito del paciente, a menos que existan requerimientos legales u orden judicial, o que la vida del paciente o de un tercero corra peligro inminente.
          </p>
          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">4. Uso de Cookies</h2>
          <p className="mb-6">
            Nuestra página web utiliza cookies esenciales para su correcto funcionamiento, así como cookies analíticas para mejorar la experiencia de navegación del usuario. El usuario puede aceptar o rechazar el uso de cookies no esenciales mediante nuestro aviso en pantalla o configurando su navegador.
          </p>
          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">5. Derechos de los Usuarios</h2>
          <p className="mb-6">
            Tienes derecho a solicitar el acceso, corrección o eliminación de tus datos personales en cualquier momento. Para ejercer estos derechos, ponte en contacto con nosotros al correo <strong>contacto@todoesunbalance.com</strong> o a nuestro contacto institucional.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
