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
    name: '¿Cómo regulo mi ansiedad?',
    tagline: 'Entiende tu ansiedad y recupera tu paz interior',
    description:
      'Una guía para quienes necesitan relacionarse mejor con su ansiedad, conocerla, entenderla, y reducir sus niveles de modo que puedan vivir una vida más presente y tranquila.\n\n💖 ¿Para quién es?\n- Para quienes quieren aprender a relacionarse mejor con su ansiedad.\n- Para quienes quieren entender su mente y qué rol tenemos sobre ella para mejorar nuestra ansiedad.\n- Para quienes quieren regular los síntomas fisiológicos y psicológicos de la ansiedad.\n- Para quienes desean mejorar su vida, viviendo más en el presente, con más calma, con más capacidad de disfrutar lo que les rodea y con más tranquilidad.',
    longDescription: `Una guía para quienes necesitan relacionarse mejor con su ansiedad, conocerla, entenderla, y reducir sus niveles de modo que puedan vivir una vida más presente y tranquila.\n\nEsta guía está pensada para personas que atraviesan ansiedad, que no pueden controlarla, que la ansiedad no los deja disfrutar del presente, que constantemente tienen pensamientos intrusivos, que tienen todos los síntomas desagradables de la ansiedad y no saben cómo manejarlos. Este manual te acompaña a nombrar lo que te pasa y a regularte con más entendimiento.\n\n💌 Formato\nDisponible en PDF para usar desde cualquier dispositivo. Puedes volver a él tantas veces como lo necesites; es una herramienta diseñada para acompañarte en cualquier momento que así lo necesites.\n\n💚 Una guía para entender tu ansiedad\nMás que teoría, es un espacio cálido para entenderte, regularte y darte permiso de sentir.`,
    price: 0.03,
    images: ['/images/Portada-miAnsiedad.png'],
    features: [
      'Para quienes quieren aprender a relacionarse mejor con su ansiedad.',
      'Para quienes quieren entender su mente y qué rol tenemos sobre ella para mejorar nuestra ansiedad.',
      'Para quienes quieren regular los síntomas fisiológicos y psicológicos de la ansiedad.',
      'Para quienes desean mejorar su vida, viviendo más en el presente, con más calma, con más capacidad de disfrutar lo que les rodea y con más tranquilidad.'
    ],
    badge: 'E-Book',
    fileName: 'ansiedad.pdf',
  },
  {
    id: '3',
    slug: 'guia-asertividad',
    type: 'digital',
    name: 'Guía teórico-práctica sobre la asertividad',
    tagline: 'El arte de comunicarte con confianza y respeto',
    description:
      'Una guía teórico-práctica que te ayudará a aprender la habilidad de la “Asertividad”, la cual te permitirá vivir relaciones más saludables y de calidad, con una comunicación más efectiva.\n\n💗 ¿Para quién es?\n- Para quienes han notado que no al comunicarse con otra persona, el mensaje no llega como tiene que llegar.\n- Para quienes han notado que normalmente suelen tener problemas en la comunicación con sus relaciones interpersonales.\n- Para quienes quieren tener relaciones de calidad en sus vidas que perduren en el tiempo.\n- Para quienes están dispuestos a tener conversaciones incómodas en sus relaciones.\n- Para quienes necesiten aprender a poner límites.',
    longDescription: `Una guía teórico-práctica para aprender la habilidad social de “Asertividad”. Una habilidad de comunicación para lograr una comunicación efectiva con los demás, logrando ambientes amenos para tocar temas importantes (incluso si son difíciles o desagradables), y permitiendo así mantener nuestras relaciones de calidad en el tiempo. Está hecha para quienes están dispuestos a desaprender conductas viejas y aprender las necesarias para comunicarnos de manera correcta con los demás.\n\n💌 Formato\nDisponible en PDF para usar desde cualquier dispositivo. Puedes volver a él tantas veces como lo necesites; es una herramienta diseñada para acompañarte en cualquier momento que así lo necesites.\n\n🍃 Una guía para crear tu mejor versión\nEsta guía tiene información muy valiosa para desarrollar nuestra mejor versión para así podérsela ofrecer a las personas que nos rodean, que terminan siendo las personas/relaciones que le dan color a nuestras vidas, por ende, son muy importantes.`,
    price: 0.03,
    images: ['/images/Portada-asertividad.png'],
    features: [
      'Para quienes han notado que no al comunicarse con otra persona, el mensaje no llega como tiene que llegar.',
      'Para quienes han notado que normalmente suelen tener problemas en la comunicación con sus relaciones interpersonales.',
      'Para quienes quieren tener relaciones de calidad en sus vidas que perduren en el tiempo.',
      'Para quienes están dispuestos a tener conversaciones incómodas en sus relaciones.',
      'Para quienes necesiten aprender a poner límites.'
    ],
    badge: 'E-Book',
    fileName: 'Asertividad guia.pdf',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentId: string): Product[] {
  return products.filter((p) => p.id !== currentId).slice(0, 3);
}
