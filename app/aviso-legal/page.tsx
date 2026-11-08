import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundShapes } from "@/components/background-shapes"

export const metadata = {
  title: "Aviso Legal | Todo es un Balance",
  description: "Aviso Legal de Todo es un Balance."
}

export default function LegalNotice() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundShapes />
      <Header />
      <main className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32">
        <h1 className="mb-8 font-serif text-4xl font-bold text-[#1a1a1a] md:text-5xl">
          Aviso Legal
        </h1>
        <div className="prose prose-stone max-w-none text-[#333333]">
          <p className="mb-4">
            <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-VE')}
          </p>
          <p className="mb-6">
            Para brindar transparencia y seguridad jurídica a los usuarios en base a las legislaciones aplicables en Venezuela (comercio electrónico, protección al consumidor y servicios de la sociedad de la información), exponemos los datos legales de esta plataforma:
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">1. Datos Identificativos</h2>
          <ul className="mb-6 list-none pl-0">
            <li className="mb-2"><strong>Titular:</strong> María Fernanda Azcunes</li>
            <li className="mb-2"><strong>Actividad:</strong> Psicología Clínica y comercialización de recursos terapéuticos.</li>
            <li className="mb-2"><strong>Contacto de Email:</strong> contacto@todoesunbalance.com</li>
            <li className="mb-2"><strong>Ubicación Base:</strong> Barquisimeto, Estado Lara, Venezuela.</li>
          </ul>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">2. Finalidad de la Web y Comercio Electrónico</h2>
          <p className="mb-6">
            <strong>Todo es un Balance</strong> opera como un espacio informativo, de divulgación psicoeducativa, agendamiento de citas y una tienda digital/física. Las transacciones comerciales realizadas en este sitio gozan de validez según la Ley sobre Mensajes de Datos y Firmas Electrónicas de Venezuela, operando bajo principios de buena fe y protección al consumidor.
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">3. Propiedad Intelectual de la Tienda y Contenido</h2>
          <p className="mb-6">
            Todos los elementos que forman el sitio web, incluyendo su diseño, logotipos, textos, así como los libros, manuales, fichas y recursos digitales en venta, están protegidos por las leyes de propiedad intelectual y derecho de autor (SAPI). 
          </p>
          <p className="mb-6">
            Queda estrictamente prohibida su reproducción, copia, distribución comercial no autorizada o piratería. Las vulneraciones estarán sujetas a las acciones legales pertinentes según las leyes vigentes en Venezuela.
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">4. Responsabilidad</h2>
          <p className="mb-6">
            Los artículos en este sitio y las publicaciones en nuestras redes oficiales (@todoesunbalance) tienen un fin educativo. No sustituyen el criterio diagnóstico individual ni la atención psicoterapéutica formal.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
