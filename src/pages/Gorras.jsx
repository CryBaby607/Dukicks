import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Gorras.css';

// Importar la imagen
import gorra1Image from '../assets/images/gorras/31Hats.jpg';

const Gorras = () => {
  const [selectedBrand, setSelectedBrand] = useState('todas');
  const [sortBy, setSortBy] = useState('destacado');

  // Datos de gorras con marcas y modelos
  const gorrasData = [
    {
      id: 'gorra-1',
      model: 'New York Crystal',
      brand: '31 Hats',
      price: 49,
      image: gorra1Image, // Usar la importación
      color: 'Negro',
      stock: true,
      nuevo: false,
      destacado: true
    },
    {
      id: 'gorra-2',
      model: 'URBAN SNAPBACK',
      brand: 'Dandy Hats',
      price: 59,
      image: '', // Sin imagen
      color: 'Blanco',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 'gorra-3',
      model: 'TRUCKER HAT',
      brand: 'Barba Hats',
      price: 45,
      image: '', // Sin imagen
      color: 'Negro/Blanco',
      stock: true,
      nuevo: false,
      destacado: false
    },
    {
      id: 'gorra-4',
      model: 'VINTAGE BASEBALL',
      brand: 'Otros',
      price: 55,
      image: '', // Sin imagen
      color: 'Gris',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 'gorra-5',
      model: 'SPORT CAP',
      brand: '31 Hats',
      price: 52,
      image: '', // Sin imagen
      color: 'Negro',
      stock: false,
      nuevo: false,
      destacado: false
    },
    {
      id: 'gorra-6',
      model: 'MINIMALIST HAT',
      brand: 'Dandy Hats',
      price: 48,
      image: '', // Sin imagen
      color: 'Blanco',
      stock: true,
      nuevo: false,
      destacado: true
    },
    {
      id: 'gorra-7',
      model: 'PREMIUM SNAPBACK',
      brand: 'Barba Hats',
      price: 65,
      image: '', // Sin imagen
      color: 'Negro',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 'gorra-8',
      model: 'MESH TRUCKER',
      brand: 'Otros',
      price: 42,
      image: '', // Sin imagen
      color: 'Blanco/Negro',
      stock: true,
      nuevo: false,
      destacado: false
    }
  ];

  // Marcas disponibles - SOLO LAS 4 MARCAS ESPECIFICADAS
  const brands = [
    { value: 'todas', label: 'Todas' },
    { value: '31 Hats', label: '31 HATS' },
    { value: 'Dandy Hats', label: 'DANDY HATS' },
    { value: 'Barba Hats', label: 'BARBA HATS' },
    { value: 'Otros', label: 'OTROS' }
  ];

  // Filtrar gorras por marca
  const filteredGorras = gorrasData.filter(gorra => 
    selectedBrand === 'todas' || gorra.brand === selectedBrand
  );

  // Ordenar gorras
  const sortedGorras = [...filteredGorras].sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    if (sortBy === 'nombre') return a.model.localeCompare(b.model);
    if (sortBy === 'destacado') return b.destacado - a.destacado;
    return 0;
  });

  return (
    <div className="gorras-page">
      {/* FILTROS Y ORDENAMIENTO */}
      <section className="gorras-filters">
        <div className="gorras-filters-container">
          
          {/* Marcas */}
          <div className="gorras-categories">
            {brands.map(brand => (
              <button 
                key={brand.value}
                className={`category-btn ${selectedBrand === brand.value ? 'active' : ''}`}
                onClick={() => setSelectedBrand(brand.value)}
              >
                {brand.label}
              </button>
            ))}
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
              <option value="nombre">Modelo</option>
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
              <p>No se encontraron productos de esta marca</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

// ===== COMPONENTE DE TARJETA DE GORRA =====
const GorraCard = ({ gorra }) => {
  const { addToCart, openCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    const cartItem = {
      id: gorra.id,
      name: `${gorra.brand.toUpperCase()} ${gorra.model}`,
      price: gorra.price,
      image: gorra.image,
      color: gorra.color,
      selectedSize: 'Única',
      category: 'gorras'
    };

    addToCart(cartItem);
    openCart();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Mostrar placeholder si no hay imagen o si falló la carga
  const hasValidImage = gorra.image && !imageError;

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
        {hasValidImage ? (
          <img 
            src={gorra.image} 
            alt={`${gorra.brand} ${gorra.model}`}
            className="gorra-img"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="gorra-placeholder">
            <span className="gorra-icon">🧢</span>
          </div>
        )}
      </div>

      {/* Información */}
      <div className="gorra-info">
        <h3 className="gorra-brand">{gorra.brand.toUpperCase()}</h3>
        <p className="gorra-model">{gorra.model}</p>
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