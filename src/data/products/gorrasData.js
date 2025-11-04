// Importar imágenes
import gorra1Image from '../../assets/images/gorras/31Hats.webp';
import gorra2Image from '../../assets/images/gorras/El-mago.webp';
import gorra3Image from '../../assets/images/gorras/31Hats-New-York-Cloud.webp';
import gorra4Image from '../../assets/images/gorras/31Hats-Murakami.webp';
import gorra5Image from '../../assets/images/gorras/31Hats.webp';
import gorra6Image from '../../assets/images/gorras/31Hats.webp';
import gorra7Image from '../../assets/images/gorras/31Hats.webp';
import gorra8Image from '../../assets/images/gorras/31Hats.webp';

export const gorrasData = [
  {
    id: 'gorra-1',
    brand: '31 Hats',
    model: 'New York Crystal',
    price: 1449,
    image: gorra1Image,
    color: 'Negro',
    sizes: ['One Size'],
    features: {
      nuevo: false,
      destacado: true
    },
    category: 'gorras'
  },
  {
    id: 'gorra-2',
    brand: 'Dandy Hats',
    model: 'El Mago',
    price: 1959,
    image: gorra2Image,
    color: 'Blanco',
    sizes: ['One Size'],
    features: {
      nuevo: true,
      destacado: true
    },
    category: 'gorras'
  },
  {
    id: 'gorra-3',
    brand: '31 Hats',
    model: 'New York Cloud',
    price: 1449,
    image: gorra3Image,
    color: 'Azul',
    sizes: ['One Size'],
    features: {
      nuevo: false,
      destacado: false
    },
    category: 'gorras'
  },
  {
    id: 'gorra-4',
    brand: '31 Hats',
    model: 'Murakami',
    price: 1559,
    image: gorra4Image,
    color: 'Gris',
    sizes: ['One Size'],
    features: {
      nuevo: true,
      destacado: true
    },
    category: 'gorras'
  },
  {
    id: 'gorra-5',
    brand: '31 Hats',
    model: 'Sport Cap',
    price: 1452,
    image: gorra5Image,
    color: 'Negro',
    sizes: ['One Size'],
    features: {
      nuevo: false,
      destacado: false
    },
    category: 'gorras'
  },
  {
    id: 'gorra-6',
    brand: 'Dandy Hats',
    model: 'Minimalist Hat',
    price: 1548,
    image: gorra6Image,
    color: 'Blanco',
    sizes: ['One Size'],
    features: {
      nuevo: false,
      destacado: true
    },
    category: 'gorras'
  },
  {
    id: 'gorra-7',
    brand: 'Barba Hats',
    model: 'Premium Snapback',
    price: 1659,
    image: gorra7Image,
    color: 'Negro',
    sizes: ['One Size'],
    features: {
      nuevo: true,
      destacado: true
    },
    category: 'gorras'
  },
  {
    id: 'gorra-8',
    brand: 'Otros',
    model: 'Mesh Trucker',
    price: 1442,
    image: gorra8Image,
    color: 'Blanco/Negro',
    sizes: ['One Size'],
    features: {
      nuevo: false,
      destacado: false
    },
    category: 'gorras'
  }
];