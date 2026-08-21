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
            En <strong>Todo es un Balance</strong>, la protección de tus datos personales y tu privacidad es de suma importancia. Cumplimos con normativas nacionales e internacionales para garantizar la confidencialidad de tu información, tanto en los servicios clínicos como en tus compras en la tienda.
          </p>
          
          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">1. Información que Recopilamos</h2>
          <p className="mb-6">
            Recopilamos información personal (como nombre, correo electrónico, número de teléfono) cuando el usuario nos la proporciona al agendar una cita. Para procesar pedidos en la tienda, solicitamos además datos de registro y logística (dirección de envío, cédula o RIF, detalles del pago) estrictamente necesarios para validar su compra y enviar los paquetes, en total cumplimiento con la normativa comercial y de protección de datos.
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">2. Uso de la Información</h2>
          <p className="mb-6">
            Los datos personales recopilados se utilizan exclusivamente para:
          </p>
          <ul className="mb-6 list-disc pl-6">
            <li>Agendar y llevar a cabo las sesiones de terapia.</li>
            <li>Gestionar compras, verificar pagos y realizar envíos de productos físicos.</li>
            <li>Proteger contra fraudes y asegurar el registro transparente de las transacciones (según la Ley Especial Contra los Delitos Informáticos).</li>
            <li>Mejorar tu experiencia web mediante cookies esenciales.</li>
          </ul>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">3. Secreto Profesional y Confidencialidad</h2>
          <p className="mb-6">
            Cualquier información discutida en el ámbito de una consulta psicológica está amparada por el secreto profesional y el Código de Ética. Los datos de pago y registro de la tienda no se comparten con terceros, salvo la información de contacto estrictamente necesaria para las empresas encargadas de entregar su paquete.
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">4. Derechos de los Usuarios</h2>
          <p className="mb-6">
            Tienes derecho a solicitar el acceso, corrección o eliminación de tus datos personales en cualquier momento. Puedes ejercer estos derechos contactándonos a través del correo <strong>contacto@todoesunbalance.com</strong>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
