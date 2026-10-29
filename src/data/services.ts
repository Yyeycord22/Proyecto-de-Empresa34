export interface Service {
  id: string;
  number: string;
  numberColor: string;
  title: string;
  category: string;
  features: string[];
  buttonText: string;
  buttonMessage: string;
  image: string;
  imageAlt: string;
  iconType: 'camera' | 'commercial' | 'digital' | 'drone' | 'video';
}

export const services: Service[] = [
  {
    id: 'srv1',
    number: '01',
    numberColor: '#F01824',
    title: 'Fotografía de estudio',
    category: 'Estudio & Retratos',
    features: [
      'Retratos personales',
      'Fotografía corporativa',
      'Sesiones para profesionales y particulares',
    ],
    buttonText: 'Consultar sesión →',
    buttonMessage: 'Hola%2C%20quisiera%20consultar%20sobre%20una%20sesi%C3%B3n%20de%20fotograf%C3%ADa%20de%20estudio.',
    image: '/imagenes/servicios/servicio-01-estudio.jpg',
    imageAlt: 'Fotografía de estudio — sesión editorial con iluminación profesional',
    iconType: 'camera',
  },
  {
    id: 'srv2',
    number: '02',
    numberColor: '#FFD21A',
    title: 'Fotografía y video comercial',
    category: 'Hoteles & Negocios',
    features: [
      'Fotografía para hoteles y negocios',
      'Imágenes de instalaciones y servicios',
      'Videos promocionales',
    ],
    buttonText: 'Cotizar proyecto →',
    buttonMessage: 'Hola%2C%20quisiera%20cotizar%20un%20proyecto%20de%20fotograf%C3%ADa%20comercial.',
    image: '/imagenes/servicios/servicio-02-comercial.jpg',
    imageAlt: 'Fotografía comercial y arquitectónica para hoteles boutique y resorts en Mindo',
    iconType: 'commercial',
  },
  {
    id: 'srv3',
    number: '03',
    numberColor: '#064EDB',
    title: 'Creación y gestión de contenido digital',
    category: 'Redes & Marcas',
    features: [
      'Planificación de ideas',
      'Grabación y edición de videos',
      'Contenido para redes sociales',
    ],
    buttonText: 'Crear mi contenido →',
    buttonMessage: 'Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20creaci%C3%B3n%20de%20contenido%20digital.',
    image: '/imagenes/servicios/servicio-03-digital.jpg',
    imageAlt: 'Creación y producción de contenido digital para marcas y redes sociales',
    iconType: 'digital',
  },
  {
    id: 'srv4',
    number: '04',
    numberColor: '#F01824',
    title: 'Fotografía y video con dron',
    category: 'Tomas Aéreas',
    features: [
      'Tomas aéreas',
      'Fotografías de paisajes y propiedades',
      'Material para turismo y establecimientos',
    ],
    buttonText: 'Consultar servicio de dron →',
    buttonMessage: 'Hola%2C%20quisiera%20consultar%20el%20servicio%20de%20fotograf%C3%ADa%20con%20dron.',
    image: '/imagenes/servicios/servicio-04-dron.jpg',
    imageAlt: 'Fotografía aérea panorámica con dron sobre la naturaleza de Mindo y Los Bancos',
    iconType: 'drone',
  },
  {
    id: 'srv5',
    number: '05',
    numberColor: '#FFD21A',
    title: 'Producción audiovisual',
    category: 'Cine & Video',
    features: [
      'Grabación de videos',
      'Edición profesional',
      'Piezas audiovisuales promocionales',
    ],
    buttonText: 'Planificar producción →',
    buttonMessage: 'Hola%2C%20quisiera%20hablar%20sobre%20una%20producci%C3%B3n%20audiovisual.',
    image: '/imagenes/servicios/servicio-05-audiovisual.jpg',
    imageAlt: 'Producción audiovisual cinematográfica completa con equipo y cámaras de cine',
    iconType: 'video',
  },
];

export const WHATSAPP_NUMBER = '593XXXXXXXXX';
export const INSTAGRAM_URL = 'https://www.instagram.com/haus_cm';
