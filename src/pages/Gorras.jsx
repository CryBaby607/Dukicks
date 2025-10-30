// src/pages/Gorras.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Gorras.css';

const Gorras = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [sortBy, setSortBy] = useState('destacado');

  // Datos de gorras
  const gorrasData = [
    {
      id: 'gorra-1',
      name: 'CLASSIC CAP',
      category: 'clasica',
      price: 49,
      image: '🧢',
      color: 'Negro',
      stock: true,
      nuevo: false,
      destacado: true
    },
    {
      id: 'gorra-2',
      name: 'URBAN SNAPBACK',
      category: 'snapback',
      price: 59,
      image: '🧢',
      color: 'Blanco',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 'gorra-3',
      name: 'TRUCKER HAT',
      category: 'trucker',
      price: 45,
      image: '🧢',
      color: 'Negro/Blanco',
      stock: true,
      nuevo: false,
      destacado: false
    },
    {
      id: 'gorra-4',
      name: 'VINTAGE BASEBALL',
      category: 'clasica',
      price: 55,
      image: '🧢',
      color: 'Gris',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 'gorra-5',
      name: 'SPORT CAP',
      category: 'deportiva',
      price: 52,
      image: '🧢',
      color: 'Negro',
      stock: false,
      nuevo: false,
      destacado: false
    },
    {
      id: 'gorra-6',
      name: 'MINIMALIST HAT',
      category: 'clasica',
      price: 48,
      image: '🧢',
      color: 'Blanco',
      stock: true,
      nuevo: false,
      destacado: true
    },
    {
      id: 'gorra-7',
      name: 'PREMIUM SNAPBACK',
      category: 'snapback',
      price: 65,
      image: '🧢',
      color: 'Negro',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 'gorra-8',
      name: 'MESH TRUCKER',
      category: 'trucker',
      price: 42,
      image: '🧢',
      color: 'Blanco/Negro',
      stock: true,
      nuevo: false,
      destacado: false
    }
  ];

  // Filtrar gorras
  const filteredGorras = gorrasData.filter(gorra => 
    selectedCategory === 'todas' || gorra.category === selectedCategory
  );

  // Ordenar gorras
  const sortedGorras = [...filteredGorras].sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    if (sortBy === 'nombre') return a.name.localeCompare(b.name);
    if (sortBy === 'destacado') return b.destacado - a.destacado;
    return 0;
  });

  return (
    <div className="gorras-page">
      {/* FILTROS Y ORDENAMIENTO */}
      <section className="gorras-filters">
        <div className="gorras-filters-container">
          
          {/* Categorías */}
          <div className="gorras-categories">
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
              className={`category-btn ${selectedCategory === 'snapback' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('snapback')}
            >
              Snapback
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'trucker' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('trucker')}
            >
              Trucker
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'deportiva' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('deportiva')}
            >
              Deportivas
            </button>
          </div>

          {/* Ordenamiento */}
          <div className="gorras-sort">
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
      <section className="gorras-products">
        <div className="gorras-products-container">
          
          <div className="products-count">
            {sortedGorras.length} {sortedGorras.length === 1 ? 'producto' : 'productos'}
          </div>

          <div className="gorras-grid">
            {sortedGorras.map(gorra => (
              <GorraCard key={gorra.id} gorra={gorra} />
            ))}
          </div>

          {sortedGorras.length === 0 && (
            <div className="no-results">
              <p>No se encontraron productos en esta categoría</p>
            </div>
          )}

        </div>
      </section>

      {/* INFORMACIÓN ADICIONAL */}
      <section className="gorras-info">
        <div className="gorras-info-container">
          
          <div className="info-card">
            <div className="info-icon">✓</div>
            <h3>Calidad Premium</h3>
            <p>Materiales duraderos y confortables</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🚚</div>
            <h3>Envío Gratis</h3>
            <p>En compras superiores a $500</p>
          </div>

          <div className="info-card">
            <div className="info-icon">↩️</div>
            <h3>Devolución Fácil</h3>
            <p>30 días para cambios</p>
          </div>

        </div>
      </section>

    </div>
  );
};

// ===== COMPONENTE DE TARJETA DE GORRA =====
const GorraCard = ({ gorra }) => {
  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: gorra.id,
      name: gorra.name,
      price: gorra.price,
      image: gorra.image,
      color: gorra.color,
      selectedSize: 'Única', // Las gorras normalmente son talla única
      category: 'gorras'
    };

    addToCart(cartItem);
    openCart(); // Abrir el carrito automáticamente
  };

  return (
    <div className={`gorra-card ${!gorra.stock ? 'out-of-stock' : ''}`}>
      
      {/* Etiquetas */}
      <div className="gorra-badges">
        {gorra.nuevo && <span className="badge badge-new">NUEVO</span>}
        {gorra.destacado && <span className="badge badge-featured">DESTACADO</span>}
        {!gorra.stock && <span className="badge badge-out">AGOTADO</span>}
      </div>

      {/* Imagen */}
      <div className="gorra-image">
        <span className="gorra-icon">{gorra.image}</span>
      </div>

      {/* Información */}
      <div className="gorra-info">
        <h3 className="gorra-name">{gorra.name}</h3>
        <p className="gorra-color">{gorra.color}</p>
        <div className="gorra-footer">
          <span className="gorra-price">${gorra.price}</span>
          <button 
            className="gorra-add-btn"
            onClick={handleAddToCart}
            disabled={!gorra.stock}
          >
            {gorra.stock ? 'Agregar' : 'Agotado'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Gorras;