import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/layout/ProductCard/ProductCard';
import './Gorras.css';

// Importar imágenes
import gorra1Image from '../assets/images/gorras/31Hats.jpg';

const Gorras = () => {
  // Datos de gorras
  const gorrasData = [
    {
      id: 'gorra-1',
      model: 'New York Crystal',
      brand: '31 Hats',
      price: 49,
      image: gorra1Image,
      color: 'Negro',
      sizes: ['One Size'],
      nuevo: false,
      destacado: true,
      category: 'gorras'
    },
    {
      id: 'gorra-2',
      model: 'URBAN SNAPBACK 2',
      brand: 'Dandy Hats',
      price: 59,
      image: '',
      color: 'Blanco',
      sizes: ['One Size'],
      nuevo: true,
      destacado: true,
      category: 'gorras'
    },
    {
      id: 'gorra-3',
      model: 'TRUCKER HAT',
      brand: 'Barba Hats',
      price: 45,
      image: '',
      color: 'Negro/Blanco',
      sizes: ['One Size'],
      nuevo: false,
      destacado: false,
      category: 'gorras'
    },
    {
      id: 'gorra-4',
      model: 'VINTAGE BASEBALL',
      brand: 'Otros',
      price: 55,
      image: '',
      color: 'Gris',
      sizes: ['One Size'],
      nuevo: true,
      destacado: true,
      category: 'gorras'
    },
    {
      id: 'gorra-5',
      model: 'SPORT CAP',
      brand: '31 Hats',
      price: 52,
      image: '',
      color: 'Negro',
      sizes: ['One Size'],
      nuevo: false,
      destacado: false,
      category: 'gorras'
    },
    {
      id: 'gorra-6',
      model: 'MINIMALIST HAT',
      brand: 'Dandy Hats',
      price: 48,
      image: '',
      color: 'Blanco',
      sizes: ['One Size'],
      nuevo: false,
      destacado: true,
      category: 'gorras'
    },
    {
      id: 'gorra-7',
      model: 'PREMIUM SNAPBACK',
      brand: 'Barba Hats',
      price: 65,
      image: '',
      color: 'Negro',
      sizes: ['One Size'],
      nuevo: true,
      destacado: true,
      category: 'gorras'
    },
    {
      id: 'gorra-8',
      model: 'MESH TRUCKER',
      brand: 'Otros',
      price: 42,
      image: '',
      color: 'Blanco/Negro',
      sizes: ['One Size'],
      nuevo: false,
      destacado: false,
      category: 'gorras'
    }
  ];

  return (
    <div className="gorras-page">
      
      {/* CONTENEDOR PRINCIPAL SOLO CON PRODUCTOS */}
      <div className="gorras-content">
        
        {/* ÁREA DE PRODUCTOS SIN FILTROS */}
        <main className="gorras-main">
          
          {/* Grid de productos directamente */}
          <div className="gorras-grid">
            {gorrasData.map(gorra => (
              <ProductCard 
                key={gorra.id}
                product={gorra}
                showSizes={false}
                addButtonText="Agregar"
              />
            ))}
          </div>

        </main>

      </div>
    </div>
  );
};

export default Gorras;