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
      '✨Conjunto de fichas pensadas para quienes están buscando un proceso profundo de autoconocimiento y amor propio. Busca, mediante temas específicos, que conectes nuevamente con tu valor y amor propio.\n\n🤎¿Para quién es?\n- Para quienes desean explorarse, conocerse y conectar más consigo mismxs.\n- Para quienes han pasado situaciones que han perjudicado tu autoestima.\n- Para quienes se han sentido últimamente desmotivadxs y han descuidado la relación consigo mismxs.\n- Para quienes desean aprender lo necesario para mejorar sus vidas.',
    longDescription: `✨Conjunto de fichas pensadas para quienes están buscando un proceso profundo de autoconocimiento y amor propio.\nEste conjunto de fichas busca, mediante temas específicos, que conectes nuevamente con tu valor y amor propio.\nEsto incluye autoconocimiento, introspección, reflexión, ejercicios prácticos, mejorar la autoconfianza, aprender nuevas habilidades.\n\nLo que encontrarás aquí será información clave y necesaria para poder relacionarnos de manera sana con nosotros mismos.\n\n🤎¿Para quién es?\n- Para quienes deseen explorarse y conocerse a si mismos.\n- Para quienes han pasado situaciones dolorosas que han perjudicado su autoestima, para reconectar nuevamente con su valor.\n- Para quienes se han sentido últimamente desmotivados y notan que han descuidado la relación con ellos mismos.\n- Para los que deseen aprender las habilidades necesarias para mejorar sus vidas en sus distintas áreas (personal, profesional, social, familiar, amorosa y espiritual.\n\n💌Un recurso flexible\nNo necesitas seguir un orden ni completar las fichas por completo. Puedes leerlas cuando lo necesites y desees.\nAquí encontrarás temas interesantes. La recomendación de la psicóloga es a no conformarse con esto, te invita a seguir explorando tu mundo emocional, seguir fortaleciendo la relación contigo mismx, a seguir explorando información valiosa con respecto al tema, ya que la psicoeducación es necesaria para construir esas bases sólidas en la relación con nosotros mismos.\nEsta es una compañía emocional, intencional y amorosa, diseñada para mostrarte la importancia que tiene la relación que tenemos con nosotros mismos en nuestro bienestar emocional.`,
    price: 0.08,
    images: [
      '/images/image0.jpeg',
      '/images/image1.png',
      '/images/image2.png',
      '/images/image3.png',
    ],
    features: [
      'Conocerte a profundidad',
      'Fortalecer tu autoconfianza',
      'Aprender nuevas habilidades',
      'Volver a relacionarte de forma sana contigo mismx',
      'Aumentar el amor propio',
      'Volver a ponerte de prioridad',
    ],
    badge: 'Pack de Fichas',
    featured: true,
  },
  {
    id: '2',
    slug: 'guia-ansiedad',
    type: 'digital',
    name: 'Guía de Ansiedad',
    tagline: 'Entiende tu ansiedad y recupera tu paz interior',
    description:
      'Una guía digital diseñada para ayudarte a comprender, gestionar y transformar tu relación con la ansiedad.',
    longDescription: `La ansiedad es una compañera incómoda que muchos conocen bien. Esta guía te enseñará qué es realmente, por qué aparece y, más importante, cómo puedes trabajar con ella de manera inteligente y compasiva.\n\nAprenderás técnicas científicamente respaldadas para calmar tu sistema nervioso, identificar los patrones que generan ansiedad y construir una relación más sana con tus preocupaciones. No se trata de hacer desaparecer la ansiedad, sino de comprenderla, respetarla y vivir plenamente a pesar de ella.\n\nIncluye ejercicios prácticos, herramientas diarias y un plan de acción para que recuperes la calma que mereces.`,
    price: 0.03,
    images: ['/images/ProductoDigital1.jpeg'],
    features: [
      'Técnicas de respiración y regulación nerviosa',
      'Cómo identificar tus disparadores de ansiedad',
      'Ejercicios para calmar el cuerpo y la mente',
      'Herramientas prácticas para el día a día',
      'Formato PDF descargable',
      'Descarga inmediata tras el pago',
    ],
    badge: 'E-Book',
    fileName: 'ansiedad.pdf',
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
