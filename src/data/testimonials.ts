export interface Testimonial {
  id: string;
  quoteColor: string;
  text: string;
  authorName: string;
  authorLocation: string;
  dotColor: string;
}

export interface Package {
  id: string;
  tag: string;
  title: string;
  accentColor: string;
  features: string[];
  buttonText: string;
  buttonMessage: string;
  featured: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quoteColor: '#F01824',
    text: 'El resultado superó nuestras expectativas. Todo el proceso fue muy profesional y creativo.',
    authorName: 'Hotel El Mirador',
    authorLocation: 'Mindo',
    dotColor: '#FFD21A',
  },
  {
    id: 't2',
    quoteColor: '#064EDB',
    text: 'Las fotos y videos ayudaron mucho a mejorar nuestra imagen en redes sociales. 100% recomendados.',
    authorName: 'Gimnasio Force',
    authorLocation: 'Los Bancos',
    dotColor: '#064EDB',
  },
  {
    id: 't3',
    quoteColor: '#F01824',
    text: 'Capturaron exactamente lo que queríamos. Creativos, puntuales y muy profesionales.',
    authorName: 'Hotel La Selva',
    authorLocation: 'Mindo',
    dotColor: '#F01824',
  },
];

export const packages: Package[] = [
  {
    id: 'pkg1',
    tag: 'ESENCIAL',
    title: 'Para profesionales y pequeños negocios',
    accentColor: '#F01824',
    features: [
      'Sesión fotográfica acordada',
      'Selección y edición de imágenes',
      'Entrega digital en alta calidad',
    ],
    buttonText: 'Consultar por WhatsApp →',
    buttonMessage: 'Hola%2C%20quisiera%20consultar%20el%20paquete%20Esencial.',
    featured: false,
  },
  {
    id: 'pkg2',
    tag: 'COMERCIAL',
    title: 'Para hoteles, gimnasios y establecimientos',
    accentColor: '#064EDB',
    features: [
      'Fotografía comercial completa',
      'Producción audiovisual',
      'Preparación de contenido promocional',
    ],
    buttonText: 'Cotizar proyecto →',
    buttonMessage: 'Hola%2C%20quisiera%20cotizar%20el%20paquete%20Comercial.',
    featured: true,
  },
  {
    id: 'pkg3',
    tag: 'INTEGRAL',
    title: 'Para negocios con continuidad de contenido',
    accentColor: '#FFD21A',
    features: [
      'Planificación mensual de contenido',
      'Fotografía y video periódico',
      'Edición y publicación según el acuerdo',
    ],
    buttonText: 'Hablar sobre mi proyecto →',
    buttonMessage: 'Hola%2C%20quisiera%20hablar%20sobre%20el%20paquete%20Integral.',
    featured: false,
  },
];
