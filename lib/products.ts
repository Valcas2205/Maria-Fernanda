export type ProductType = 'physical' | 'digital';

export interface Product {
  id: string;
  slug: string;
  type: ProductType;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  features: string[];
  badge: string;
  featured?: boolean;
  fileName?: string;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'conocete-y-comienza-a-quererte',
    type: 'physical',
    name: 'Conócete y comienza a quererte',
    tagline: 'Un viaje hacia tu bienestar emocional',
    description:
      'Un libro físico escrito con el corazón, para acompañarte en tu proceso de autoconocimiento y crecimiento personal.',
    longDescription: `Este libro es el resultado de años de experiencia clínica y de escuchar a cientos de personas que buscan encontrar su equilibrio. A través de sus páginas, encontrarás herramientas prácticas, reflexiones profundas y ejercicios que te guiarán en tu camino hacia el bienestar emocional.\n\nEscrito por la Psic. María Fernanda Azcunes, este libro combina la teoría psicológica con la practicidad cotidiana, haciendo que el autoconocimiento sea accesible para todos. Cada capítulo fue diseñado para leerse en el momento que más lo necesitas.\n\nMás que un libro, es un compañero de vida.`,
    price: 0.08,
    images: ['/images/libroportada.jpeg', '/images/Libro2.jpeg'],
    features: [
      'Escrito por la Psic. María Fernanda Azcunes',
      'Ejercicios prácticos de psicología',
      'Reflexiones para el autoconocimiento',
      'Herramientas para la gestión emocional',
      'Edición en tapa dura de alta calidad',
      'Envíos a toda Venezuela y Disponible en Amazon',
    ],
    badge: 'Libro Físico',
    featured: true,
  },
  {
    id: '2',
    slug: 'guia-asertividad',
    type: 'digital',
    name: 'Guía de Asertividad',
    tagline: 'El arte de comunicarte con confianza y respeto',
    description:
      'Una guía digital diseñada para ayudarte a expresar tus necesidades, establecer límites y mejorar tus relaciones.',
    longDescription: `La asertividad es la clave para unas relaciones sanas y una autoestima fuerte. Esta guía te enseñará cómo dejar de complacer a todos a costa de tu propio bienestar y cómo comunicarte de forma clara, directa y respetuosa.\n\nAprenderás a decir "no" sin culpa, a manejar críticas y a expresar lo que sientes sin llegar a la agresividad ni caer en la pasividad. Ideal para quienes buscan recuperar su voz y su poder personal.\n\nIncluye ejercicios prácticos y ejemplos para que empieces a aplicar estos principios hoy mismo.`,
    price: 0.03,
    images: ['/images/ProductoDigital1.jpeg'],
    features: [
      'Técnicas de comunicación asertiva',
      'Cómo establecer límites sanos',
      "Estrategias para decir 'no' sin culpa",
      'Formato PDF descargable',
      'Descarga inmediata tras el pago',
      'Acceso permanente',
    ],
    badge: 'E-Book',
    fileName: 'guia-asertividad.pdf',
  },
  {
    id: '3',
    slug: 'guia-de-autocuidado',
    type: 'digital',
    name: 'Guía de Autocuidado',
    tagline: 'Porque cuidarte no es un lujo, es una necesidad',
    description:
      'Una guía completa para construir una rutina de autocuidado real y sostenible. Descarga inmediata.',
    longDescription: `El autocuidado va mucho más allá de los baños con velas. Esta guía te enseñará qué significa realmente cuidarte: establecer límites, escuchar tus necesidades, descansar sin culpa y construir hábitos que nutran tu bienestar.\n\nCon ejercicios de reflexión, listas de chequeo y un plan de 30 días para implementar tu propia rutina de autocuidado personalizada.\n\nPorque mereces una vida que se sienta bien por dentro, no solo por fuera.`,
    price: 0.05,
    images: ['/images/ProductoDigital1.jpeg'],
    features: [
      'Plan de autocuidado de 30 días',
      'Listas de chequeo interactivas',
      'Ejercicios de reflexión guiados',
      'Cómo establecer límites saludables',
      'Formato PDF descargable',
      'Descarga inmediata tras el pago',
    ],
    badge: 'E-Book',
    fileName: 'guia-de-autocuidado.pdf',
  },
  {
    id: '4',
    slug: 'diario-de-bienestar',
    type: 'digital',
    name: 'Diario de Bienestar',
    tagline: 'Tu espacio seguro para escribir, sentir y crecer',
    description:
      'Un diario terapéutico guiado para acompañar tu proceso de crecimiento personal día a día.',
    longDescription: `Escribir es una de las herramientas más poderosas para procesar emociones y conocernos mejor. El Diario de Bienestar te ofrece prompts diarios cuidadosamente diseñados desde la psicología para guiar tu escritura reflexiva.\n\nCon páginas para registrar tus emociones, gratitud, metas, miedos y logros. Un espacio seguro que solo es tuyo.\n\nÚsalo diariamente, semanalmente o cuando sientas que necesitas soltar algo.`,
    price: 0.07,
    images: ['/images/ProductoDigital1.jpeg'],
    features: [
      'Prompts de escritura terapéutica',
      'Registro de emociones y gratitud',
      'Seguimiento de metas y logros',
      'Páginas de reflexión semanal',
      'Formato PDF imprimible',
      'Descarga inmediata tras el pago',
    ],
    badge: 'E-Book',
    fileName: 'diario-de-bienestar.pdf',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentId: string): Product[] {
  return products.filter((p) => p.id !== currentId).slice(0, 3);
}
