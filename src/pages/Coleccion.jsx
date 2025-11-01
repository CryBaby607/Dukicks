// src/pages/Coleccion.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Importar useCart
import './Coleccion.css';

const Coleccion = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [sortBy, setSortBy] = useState('destacado');

  // Datos de playeras de la colección
  const playerasData = [
    {
      id: 'Coleccion-1', // ID ACTUALIZADO
      name: 'MIDNIGHT LOGO TEE',
      category: 'clasica',
      collection: 'Classic Series',
      price: 45,
      image: '👕',
      description: 'Logo bordado premium en algodón',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      nuevo: true,
      limitada: true
    },
    {
      id: 'Coleccion-2', // ID ACTUALIZADO
      name: 'URBAN STREET',
      category: 'grafica',
      collection: 'Urban Collection',
      price: 49,
      image: '👕',
      description: 'Diseño gráfico exclusivo oversized',
      sizes: ['S', 'M', 'L', 'XL'],
      nuevo: true,
      limitada: false
    },
    {
      id: 'Coleccion-3', // ID ACTUALIZADO
      name: 'MINIMAL BASIC',
      category: 'basica',
      collection: 'Essentials',
      price: 39,
      image: '👕',
      description: 'Esencial de algodón orgánico',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      nuevo: false,
      limitada: false
    },
    {
      id: 'Coleccion-4', // ID ACTUALIZADO
      name: 'COLLAB ARTIST X',
      category: 'colaboracion',
      collection: 'Special Edition',
      price: 65,
      image: '👕',
      description: 'Colaboración artista limitada',
      sizes: ['M', 'L', 'XL'],
      nuevo: true,
      limitada: true
    },
    {
      id: 'Coleccion-5', // ID ACTUALIZADO
      name: 'RETRO VINTAGE',
      category: 'grafica',
      collection: 'Throwback',
      price: 52,
      image: '👕',
      description: 'Estampado vintage wash',
      sizes: ['S', 'M', 'L', 'XL'],
      nuevo: false,
      limitada: false
    },
    {
      id: 'Coleccion-6', // ID ACTUALIZADO
      name: 'PREMIUM POLO',
      category: 'premium',
      collection: 'Luxury Line',
      price: 75,
      image: '👕',
      description: 'Polo premium de algodón piqué',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      nuevo: true,
      limitada: true
    },
    {
      id: 'Coleccion-7', // ID ACTUALIZADO
      name: 'SPORT TECH',
      category: 'deportiva',
      collection: 'Performance',
      price: 55,
      image: '👕',
      description: 'Tecnología anti-humedad',
      sizes: ['S', 'M', 'L', 'XL'],
      nuevo: true,
      limitada: false
    },
    {
      id: 'Coleccion-8', // ID ACTUALIZADO
      name: 'SUMMER VIBES',
      category: 'grafica',
      collection: 'Seasonal',
      price: 48,
      image: '👕',
      description: 'Diseño de temporada exclusivo',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      nuevo: false,
      limitada: false
    }
  ];

  // Filtrar playeras
  const filteredPlayeras = playerasData.filter(playera => 
    selectedCategory === 'todas' || playera.category === selectedCategory
  );

  // Ordenar playeras
  const sortedPlayeras = [...filteredPlayeras].sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    if (sortBy === 'nombre') return a.name.localeCompare(b.name);
    if (sortBy === 'destacado') return b.limitada - a.limitada;
    return 0;
  });

  return (
    <div className="coleccion-page">
      
      {/* FILTROS Y ORDENAMIENTO */}
      <section className="coleccion-filters">
        <div className="coleccion-filters-container">
          
          {/* Categorías */}
          <div className="coleccion-categories">
            <button 
              className={`category-btn ${selectedCategory === 'todas' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('todas')}
            >
              Todas
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'clasica' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('clasica')}
            >
              Clásicas
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'grafica' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('grafica')}
            >
              Gráficas
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'basica' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('basica')}
            >
              Básicas
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'premium' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('premium')}
            >
              Premium
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'deportiva' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('deportiva')}
            >
              Deportivas
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'colaboracion' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('colaboracion')}
            >
              Colaboraciones
            </button>
          </div>

          {/* Ordenamiento */}
          <div className="coleccion-sort">
            <label htmlFor="sort">Ordenar por:</label>
            <select 
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="destacado">Destacados</option>
              <option value="nombre">Nombre</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
            </select>
          </div>

        </div>
      </section>

      {/* GRID DE PRODUCTOS */}
      <section className="coleccion-products">
        <div className="coleccion-products-container">
          
          <div className="products-count">
            {sortedPlayeras.length} {sortedPlayeras.length === 1 ? 'producto' : 'productos'}
          </div>

          <div className="coleccion-grid">
            {sortedPlayeras.map(playera => (
              <PlayeraCard key={playera.id} playera={playera} />
            ))}
          </div>

          {sortedPlayeras.length === 0 && (
            <div className="no-results">
              <p>No se encontraron productos en esta categoría</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

// ===== COMPONENTE DE TARJETA DE PLAYERA =====
const PlayeraCard = ({ playera }) => {
  const [selectedSize, setSelectedSize] = useState(playera.sizes[2]); // Talla M por defecto
  
  // Obtener la función del carrito del contexto
  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    // Crear el objeto del ítem del carrito
    const cartItem = {
      // Usar el nuevo ID de la playera
      id: `${playera.id}-${selectedSize}`, // Crear un ID único que incluya la talla
      name: playera.name,
      price: playera.price,
      image: playera.image,
      color: 'N/A', 
      selectedSize: selectedSize,
      category: 'playeras' 
    };
    
    // Agregar el ítem al carrito y abrirlo
    addToCart(cartItem);
    openCart(); 
  };

  return (
    <div className="playera-card">
      
      {/* Etiquetas */}
      <div className="playera-badges">
        {playera.nuevo && <span className="badge badge-new">NUEVO</span>}
        {playera.limitada && <span className="badge badge-limited">LIMITADA</span>}
        {playera.category === 'colaboracion' && <span className="badge badge-collab">COLLAB</span>}
      </div>

      {/* Imagen */}
      <div className="playera-image">
        <span className="playera-icon">{playera.image}</span>
      </div>

      {/* Información */}
      <div className="playera-info">
        <p className="playera-collection">{playera.collection}</p>
        <h3 className="playera-name">{playera.name}</h3>
        <p className="playera-desc">{playera.description}</p>
        
        {/* Selector de tallas */}
        <div className="playera-sizes">
          <label className="size-label">Talla:</label>
          <div className="size-options">
            {playera.sizes.map(size => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="playera-footer">
          <span className="playera-price">${playera.price}</span>
          <button 
            className="playera-add-btn"
            onClick={handleAddToCart}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coleccion;