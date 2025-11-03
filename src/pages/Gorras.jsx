import React from 'react';
import ProductCard from '../components/layout/ProductCard/ProductCard';
import './Gorras.css';

// Importar imágenes
import gorra1Image from '../assets/images/gorras/31Hats.jpg';
import gorra2Image from '../assets/images/gorras/El-mago.png';
import gorra3Image from '../assets/images/gorras/31Hats.jpg';
import gorra4Image from '../assets/images/gorras/31Hats.jpg';
import gorra5Image from '../assets/images/gorras/31Hats.jpg';
import gorra6Image from '../assets/images/gorras/31Hats.jpg';
import gorra7Image from '../assets/images/gorras/31Hats.jpg';
import gorra8Image from '../assets/images/gorras/31Hats.jpg';

const Gorras = () => {
  // Datos de gorras (solo brand + model)
  const gorrasData = [
    {
      id: 'gorra-1',
      brand: '31 Hats',
      model: 'New York Crystal',
      price: 1449,
      image: gorra1Image,
      color: 'Negro',
      sizes: ['One Size'],
      nuevo: false,
      destacado: true,
      category: 'gorras'
    },
    {
      id: 'gorra-2',
      model: 'El Mago',
      brand: 'Dandy Hats',
      price: 1959,
      image: gorra2Image,
      color: 'Blanco',
      sizes: ['One Size'],
      nuevo: true,
      destacado: true,
      category: 'gorras'
    },
    {
      id: 'gorra-3',
      model: 'Trucker Hat',
      brand: 'Barba Hats',
      price: 45,
      image: 'gorra3Image',
      color: 'Negro/Blanco',
      sizes: ['One Size'],
      nuevo: false,
      destacado: false,
      category: 'gorras'
    },
    {
      id: 'gorra-4',
      model: 'Vintage Baseball',
      brand: 'Otros',
      price: 55,
      image: 'gorra4Image',
      color: 'Gris',
      sizes: ['One Size'],
      nuevo: true,
      destacado: true,
      category: 'gorras'
    },
    {
      id: 'gorra-5',
      model: 'Sport Cap',
      brand: '31 Hats',
      price: 52,
      image: 'gorra5Image',
      color: 'Negro',
      sizes: ['One Size'],
      nuevo: false,
      destacado: false,
      category: 'gorras'
    },
    {
      id: 'gorra-6',
      model: 'Minimalist Hat',
      brand: 'Dandy Hats',
      price: 48,
      image: 'gorra5Image',
      color: 'Blanco',
      sizes: ['One Size'],
      nuevo: false,
      destacado: true,
      category: 'gorras'
    },
    {
      id: 'gorra-7',
      model: 'Premium Snapback',
      brand: 'Barba Hats',
      price: 65,
      image: 'gorra7Image',
      color: 'Negro',
      sizes: ['One Size'],
      nuevo: true,
      destacado: true,
      category: 'gorras'
    },
    {
      id: 'gorra-8',
      model: 'Mesh Trucker',
      brand: 'Otros',
      price: 42,
      image: 'gorra8Image',
      color: 'Blanco/Negro',
      sizes: ['One Size'],
      nuevo: false,
      destacado: false,
      category: 'gorras'
    }
  ];

  return (
    <div className="gorras-page">
      <div className="gorras-content">
        <main className="gorras-main">
          <div className="gorras-grid">
            {gorrasData.map(gorra => (
              <ProductCard 
                key={gorra.id}
                product={gorra}
                showSizes={true}
                addButtonText="Agregar"
                category="gorras"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gorras;
