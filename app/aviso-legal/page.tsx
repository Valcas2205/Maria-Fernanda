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
            A los efectos de brindar transparencia legal a todos los usuarios de nuestros servicios en línea bajo la legislación aplicable en materia de la sociedad de la información, comercio electrónico y la protección del consumidor, exponemos la siguiente información relativa a la prestadora de servicios de la presente plataforma web:
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">1. Datos Identificativos</h2>
          <ul className="mb-6 list-none pl-0">
            <li className="mb-2"><strong>Titular:</strong> María Fernanda Azcunes</li>
            <li className="mb-2"><strong>Actividad:</strong> Psicología Clínica (Ejercida bajo las correspondientes licencias y agremiaciones profesionales requeridas en la República Bolivariana de Venezuela).</li>
            <li className="mb-2"><strong>Contacto de Email:</strong> contacto@todoesunbalance.com</li>
            <li className="mb-2"><strong>Ubicación Base:</strong> Barquisimeto, Estado Lara, Venezuela.</li>
          </ul>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">2. Finalidad de la Página Web</h2>
          <p className="mb-6">
            La principal finalidad de <strong>Todo es un Balance</strong> (en adelante, "La Web") es de naturaleza informativa respecto a los servicios profesionales de psicología ofrecidos, así como de divulgación o psicoeducación y proveer un medio tecnológico por el cual clientes y prospectos pueden concertar y contratar citas o formación.
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">3. Propiedad Intelectual</h2>
          <p className="mb-6">
            Todos los elementos que forman el sitio web, así como la marca, logotipo, dominio, su estructura, diseño, fotografías, logotipos, textos y demás elementos de contenido, están protegidos por las leyes de propiedad intelectual e industrial aplicables, de las cuales <strong>María Fernanda Azcunes</strong> es la autora o legítima permisionaria.
          </p>
          <p className="mb-6">
            Queda prohibida toda reproducción, alteración o distribución comercial sin el consentimiento explícito de "Todo es un Balance". Las vulneraciones estarán sujetas a las acciones legales pertinentes de reparación y suspensión correspondientes indicadas por las leyes de derecho de autor en Venezuela.
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">4. Redes Sociales</h2>
          <p className="mb-6">
            Para la difusión de nuestros servicios se enlazan perfiles de redes sociales oficiales (como Instagram y TikTok, bajo el usuario @todoesunbalance). Las opiniones expresadas en esas plataformas por terceros u otros usuarios no representan obligatoria o contractualmente la opinión oficial o el criterio diagnóstico general de los dueños de dichas redes y de la presente marca.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
