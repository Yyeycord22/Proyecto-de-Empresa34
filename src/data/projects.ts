export interface ProjectStep {
  number: string;
  numberColor: string;
  title: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  category: string;
  categoryLabel: string;
  image: string;
  alt: string;
  sizeClass?: string;
}

export const projectSteps: ProjectStep[] = [
  {
    number: '01',
    numberColor: '#F01824',
    title: 'Escuchamos tu idea',
    description: 'Conversamos sobre tu negocio, tus objetivos y lo que quieres comunicar con el contenido visual.',
  },
  {
    number: '02',
    numberColor: '#FFD21A',
    title: 'Planificamos juntos',
    description: 'Definimos el tipo de material, las locaciones, los horarios y el alcance del proyecto.',
  },
  {
    number: '03',
    numberColor: '#064EDB',
    title: 'Producimos y editamos',
    description: 'Realizamos la sesión o grabación acordada y editamos el material con atención al detalle.',
  },
  {
    number: '04',
    numberColor: '#F01824',
    title: 'Entregamos y publicamos',
    description: 'Te entregamos el material finalizado y, según el acuerdo, lo publicamos en tus redes sociales.',
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    category: 'retratos',
    categoryLabel: 'Retratos',
    image: '/imagenes/8892d99e-b592-440d-b1f6-8f44f9d1ece1.jpg',
    alt: 'Retrato editorial — sesión fotográfica profesional',
  },
  {
    id: 'p2',
    category: 'hoteles',
    categoryLabel: 'Eventos',
    image: '/imagenes/1ffc9d4d-dd7c-46d2-9018-0d03835c1030.jpg',
    alt: 'Ceremonias y eventos — fotografía de boda en exterior',
    sizeClass: 'portfolio__item--wide',
  },
  {
    id: 'p3',
    category: 'retratos',
    categoryLabel: 'Retratos',
    image: '/imagenes/c7282eb5-83ca-4c6a-ba60-21c7d1e503e9.jpg',
    alt: 'Retrato de estudio — sesión individual',
  },
  {
    id: 'p4',
    category: 'retratos',
    categoryLabel: 'Retratos',
    image: '/imagenes/5c400274-ebb6-4011-a660-000f9726e8d8.jpg',
    alt: 'Retrato creativo — fotografía editorial',
    sizeClass: 'portfolio__item--tall',
  },
  {
    id: 'p5',
    category: 'corporativo',
    categoryLabel: 'Corporativo',
    image: '/imagenes/dbf740b7-4147-45c8-8663-60e345891e77.jpg',
    alt: 'Evento corporativo — fotografía de pareja',
  },
  {
    id: 'p6',
    category: 'retratos',
    categoryLabel: 'Retratos',
    image: '/imagenes/e7c0f339-ae49-41b0-8fad-61c3415914de.jpg',
    alt: 'Retrato editorial — luz natural y expresión',
  },
  {
    id: 'p7',
    category: 'hoteles',
    categoryLabel: 'Hoteles',
    image: '/imagenes/85060db9-4bcd-45bf-bc06-72ae9053dc8b.jpg',
    alt: 'Fotografía de hotel — espacios y detalles',
  },
  {
    id: 'p8',
    category: 'corporativo',
    categoryLabel: 'Corporativo',
    image: '/imagenes/40b5dc37-3a9d-444f-8a4c-a47219818668.jpg',
    alt: 'Producción audiovisual — detrás de cámaras',
  },
  {
    id: 'p9',
    category: 'retratos',
    categoryLabel: 'Retratos',
    image: '/imagenes/592403512_18033143426770155_1529202580814031402_n.jpg',
    alt: 'Sesión fotográfica profesional de retrato',
  },
];

export const portfolioFilters = [
  { key: 'all', label: 'Todos' },
  { key: 'retratos', label: 'Retratos' },
  { key: 'corporativo', label: 'Empresas' },
  { key: 'hoteles', label: 'Hoteles' },
  { key: 'dron', label: 'Dron' },
];
