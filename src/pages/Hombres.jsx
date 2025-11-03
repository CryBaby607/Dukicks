import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/layout/ProductCard/ProductCard';
import './Hombres.css';

import gorra1Image from '../assets/images/gorras/31Hats.jpg';

const Hombres = () => {
  // Datos de zapatillas para hombres - adaptados al formato ProductCard
  const zapatillasData = [
  {
    id: 1,
    brand: "Nike",
    name: "Air Force 1",
    model: "’07",
    price: 2499,
    image: gorra1Image,
    sizes: [7, 8, 9, 10, 11, 12],
    color: "Blanco/Negro",
    nuevo: true,
    destacado: true,
    category: "tenis-hombre"
  },
  {
    id: 2,
    name: "Air Max 270",
    model: "Black White",
    brand: "Nike",
    price: 3599,
    image: "https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/a48a2aa8-22d0-4df8-a4b7-73bdcf5df76e/air-max-270-black-white.png",
    sizes: [7.5, 8, 9, 10, 11],
    color: "Negro/Blanco",
    nuevo: true,
    destacado: true,
    category: "tenis-hombre"
  },
  {
    id: 3,
    name: "Ultraboost",
    model: "Light",
    brand: "Adidas",
    price: 3899,
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/c21b2d25613b407d9334af8a00524a69_9366/Ultraboost_Light_M_Blanco_ID4443_01_standard.jpg",
    sizes: [8, 9, 10, 11],
    color: "Blanco",
    nuevo: true,
    destacado: true,
    category: "tenis-hombre"
  },
  {
    id: 4,
    name: "Forum Low",
    model: "Classic",
    brand: "Adidas",
    price: 2299,
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/8cbb7b18b6fa43e4b6dfaf8e00d0d1fc_9366/Forum_Low_Blanco_GZ1893_01_standard.jpg",
    sizes: [7, 8, 9, 10, 11],
    color: "Blanco/Azul",
    nuevo: false,
    destacado: true,
    category: "tenis-hombre"
  },
  {
    id: 5,
    name: "Old Skool",
    model: "Black White",
    brand: "Vans",
    price: 1499,
    image: "https://images.vans.com/is/image/Vans/UYOLDVYBWW-HERO?$583x583$",
    sizes: [7, 8, 9, 10, 11, 12],
    color: "Negro/Blanco",
    nuevo: false,
    destacado: false,
    category: "tenis-hombre"
  },
  {
    id: 6,
    name: "Classic Leather",
    model: "Gum",
    brand: "Reebok",
    price: 1699,
    image: "https://reebokmexico.vtexassets.com/arquivos/ids/332333-800-auto?v=638040360725370000&width=800&height=auto&aspect=true",
    sizes: [7, 8, 9, 10, 11],
    color: "Blanco/Goma",
    nuevo: false,
    destacado: false,
    category: "tenis-hombre"
  },
  {
    id: 7,
    name: "RS-X",
    model: "Reinvent",
    brand: "Puma",
    price: 2399,
    image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/390777/04/sv01/fnd/PNA/w/800/h/800",
    sizes: [8, 9, 10, 11],
    color: "Blanco/Azul",
    nuevo: true,
    destacado: true,
    category: "tenis-hombre"
  },
  {
    id: 8,
    name: "574",
    model: "Core",
    brand: "New Balance",
    price: 2099,
    image: "https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i?$pdpflexf2$&wid=730&hei=730",
    sizes: [7, 8, 9, 10, 11, 12],
    color: "Gris",
    nuevo: false,
    destacado: true,
    category: "tenis-hombre"
  }
];

  return (
    <div className="hombres-page">
      
      {/* CONTENEDOR PRINCIPAL SOLO CON PRODUCTOS */}
      <div className="hombres-content">
        
        {/* ÁREA DE PRODUCTOS SIN BARRA DE HERRAMIENTAS */}
        <main className="hombres-main">
          
          {/* Grid de productos directamente */}
          <div className="hombres-grid">
            {zapatillasData.map(zapato => (
              <ProductCard 
                key={zapato.id}
                product={zapato}
                category="tenis-hombre"
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

export default Hombres;