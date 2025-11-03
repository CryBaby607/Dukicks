import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/layout/ProductCard/ProductCard';
import './Mujeres.css';

const Mujeres = () => {
  // Datos de zapatillas para mujeres - adaptados al formato ProductCard
const zapatillasData = [
  {
    id: 'Mujer-1',
    brand: 'Nike',
    model: 'Air Max 270',
    price: 179,
    image: '',
    sizes: [5, 6, 7, 8, 9],
    color: 'Rosa/Blanco',
    colorCode: 'rosa',
    nuevo: true,
    destacado: true,
    category: 'tenis-mujer'
  },
  {
    id: 'Mujer-2',
    brand: 'Adidas',
    model: 'Ultraboost 22',
    price: 159,
    image: '',
    sizes: [5, 6, 7, 8, 9, 10],
    color: 'Blanco',
    colorCode: 'blanco',
    nuevo: true,
    destacado: true,
    category: 'tenis-mujer'
  },
  {
    id: 'Mujer-3',
    brand: 'Nike',
    model: 'Metcon 8',
    price: 169,
    image: '',
    sizes: [6, 7, 8, 9],
    color: 'Negro/Morado',
    colorCode: 'negro',
    nuevo: false,
    destacado: true,
    category: 'tenis-mujer'
  },
  {
    id: 'Mujer-4',
    brand: 'Puma',
    model: 'Cali Dream',
    price: 149,
    image: '',
    sizes: [5, 6, 7, 8, 9],
    color: 'Beige',
    colorCode: 'beige',
    nuevo: false,
    destacado: false,
    category: 'tenis-mujer'
  },
  {
    id: 'Mujer-5',
    brand: 'New Balance',
    model: 'FuelCell Rebel',
    price: 189,
    image: '',
    sizes: [6, 7, 8, 9, 10],
    color: 'Coral',
    colorCode: 'rosa',
    nuevo: false,
    destacado: false,
    category: 'tenis-mujer'
  },
  {
    id: 'Mujer-6',
    brand: 'Adidas',
    model: 'NMD_R1',
    price: 139,
    image: '',
    sizes: [5, 6, 7, 8],
    color: 'Negro',
    colorCode: 'negro',
    nuevo: false,
    destacado: true,
    category: 'tenis-mujer'
  },
  {
    id: 'Mujer-7',
    brand: 'Nike',
    model: 'Free Metcon 5',
    price: 175,
    image: '',
    sizes: [6, 7, 8, 9],
    color: 'Gris/Rosa',
    colorCode: 'gris',
    nuevo: true,
    destacado: true,
    category: 'tenis-mujer'
  },
  {
    id: 'Mujer-8',
    brand: 'Puma',
    model: 'RS-X',
    price: 155,
    image: '',
    sizes: [5, 6, 7, 8, 9, 10],
    color: 'Blanco/Dorado',
    colorCode: 'blanco',
    nuevo: true,
    destacado: true,
    category: 'tenis-mujer'
  }
];

  return (
    <div className="mujeres-page">
      
      {/* CONTENEDOR PRINCIPAL SOLO CON PRODUCTOS */}
      <div className="mujeres-content">
        
        {/* ÁREA DE PRODUCTOS SIN BARRA DE HERRAMIENTAS */}
        <main className="mujeres-main">
          
          {/* Grid de productos directamente */}
          <div className="mujeres-grid">
            {zapatillasData.map(zapato => (
              <ProductCard 
                key={zapato.id}
                product={zapato}
                category="tenis-mujer"
                showSizes={true}
                sizeType="US"
                addButtonText="Agregar"
              />
            ))}
          </div>

        </main>

      </div>
    </div>
  );
};

export default Mujeres;