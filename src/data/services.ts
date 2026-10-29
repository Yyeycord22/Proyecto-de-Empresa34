export interface Service {
  id: string;
  number: string;
  numberColor: string;
  title: string;
  features: string[];
  buttonText: string;
  buttonMessage: string;
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    id: 'srv1',
    number: '01',
    numberColor: '#F01824',
    title: 'Fotografía de estudio',
    features: [
      'Retratos personales',
      'Fotografía corporativa',
      'Sesiones para profesionales y particulares',
    ],
    buttonText: 'Consultar sesión →',
    buttonMessage: 'Hola%2C%20quisiera%20consultar%20sobre%20una%20sesi%C3%B3n%20de%20fotograf%C3%ADa%20de%20estudio.',
    image: '/imagenes/8892d99e-b592-440d-b1f6-8f44f9d1ece1.jpg',
    imageAlt: 'Fotografía de retrato — sesión de estudio',
  },
  {
    id: 'srv2',
    number: '02',
    numberColor: '#FFD21A',
    title: 'Fotografía y video comercial',
    features: [
      'Fotografía para hoteles y negocios',
      'Imágenes de instalaciones y servicios',
      'Videos promocionales',
    ],
    buttonText: 'Cotizar proyecto →',
    buttonMessage: 'Hola%2C%20quisiera%20cotizar%20un%20proyecto%20de%20fotograf%C3%ADa%20comercial.',
    image: '/imagenes/1ffc9d4d-dd7c-46d2-9018-0d03835c1030.jpg',
    imageAlt: 'Fotografía comercial — ceremonia de boda',
  },
  {
    id: 'srv3',
    number: '03',
    numberColor: '#064EDB',
    title: 'Creación y gestión de contenido digital',
    features: [
      'Planificación de ideas',
      'Grabación y edición de videos',
      'Contenido para redes sociales',
    ],
    buttonText: 'Crear mi contenido →',
    buttonMessage: 'Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20creaci%C3%B3n%20de%20contenido%20digital.',
    image: '/imagenes/c7282eb5-83ca-4c6a-ba60-21c7d1e503e9.jpg',
    imageAlt: 'Creación de contenido digital — sesión editorial',
  },
  {
    id: 'srv4',
    number: '04',
    numberColor: '#F01824',
    title: 'Fotografía y video con dron',
    features: [
      'Tomas aéreas',
      'Fotografías de paisajes y propiedades',
      'Material para turismo y establecimientos',
    ],
    buttonText: 'Consultar servicio de dron →',
    buttonMessage: 'Hola%2C%20quisiera%20consultar%20el%20servicio%20de%20fotograf%C3%ADa%20con%20dron.',
    image: '/imagenes/e7c0f339-ae49-41b0-8fad-61c3415914de.jpg',
    imageAlt: 'Fotografía de retrato con estilo editorial',
  },
  {
    id: 'srv5',
    number: '05',
    numberColor: '#FFD21A',
    title: 'Producción audiovisual',
    features: [
      'Grabación de videos',
      'Edición profesional',
      'Piezas audiovisuales promocionales',
    ],
    buttonText: 'Planificar producción →',
    buttonMessage: 'Hola%2C%20quisiera%20hablar%20sobre%20una%20producci%C3%B3n%20audiovisual.',
    image: '/imagenes/40b5dc37-3a9d-444f-8a4c-a47219818668.jpg',
    imageAlt: 'Producción audiovisual — detalle de boda',
  },
];

export const WHATSAPP_NUMBER = '593XXXXXXXXX';
export const INSTAGRAM_URL = 'https://www.instagram.com/haus_cm';
