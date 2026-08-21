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
            Al acceder a nuestra página web <strong>Todo es un Balance</strong>, adquirir nuestros productos en la tienda o contratar nuestros servicios psicológicos, aceptas estos términos y condiciones en su totalidad. Recomendamos leer este documento con atención.
          </p>
          
          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">1. Naturaleza de los Servicios y Productos</h2>
          <p className="mb-6">
            La titular de la página, Psicóloga María Fernanda Azcunes, ofrece servicios de asesoría psicológica clínica, y a través de esta plataforma, la venta de recursos físicos (libros, manuales, fichas) y recursos digitales orientados a la salud mental y el bienestar emocional. 
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">2. Precios y Pagos</h2>
          <p className="mb-6">
            Todos los pagos deben realizarse previamente para la confirmación de consultas o el procesamiento de envíos/descargas. Aceptamos transferencias nacionales e internacionales, Pago Móvil (Venezuela), Zelle y PayPal. Los precios están expresados en moneda extranjera como referencia; los pagos en bolívares se calcularán a la tasa oficial vigente del Banco Central de Venezuela (BCV).
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">3. Envíos y Descargas de la Tienda</h2>
          <p className="mb-6">
            Realizamos envíos de productos físicos a toda Venezuela mediante servicios de encomienda. Para los productos digitales (ej. PDFs, ebooks), el acceso y la descarga son inmediatos tras la verificación del pago. Debido a la naturaleza de los productos digitales, no se aceptan devoluciones de estos artículos, a menos que se demuestre un fallo técnico comprobable en el archivo entregado.
          </p>
          
          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">4. Políticas de Citas y Cancelación</h2>
          <p className="mb-6">
            Para cancelar o reprogramar una sesión psicológica sin perder el monto abonado, el paciente debe avisar con un mínimo de <strong>24 horas de antelación</strong>. De no hacerlo en ese lapso, la sesión se dará por consumida. Las sesiones agendadas no constituyen un servicio de atención a emergencias.
          </p>

          <h2 className="mb-4 mt-8 font-serif text-2xl font-bold text-[#1a1a1a]">5. Uso de Plataformas Tecnológicas</h2>
          <p className="mb-6">
            En las consultas online, es responsabilidad del usuario disponer de una conexión a internet estable. Asimismo, la tienda emplea plataformas seguras para la gestión de pagos, pero "Todo es un Balance" no se hace responsable por fallas originadas por los proveedores de internet o las entidades bancarias del usuario.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
