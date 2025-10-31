// src/pages/Hombres.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Hombres.css';

const Hombres = () => {
  const [selectedBrand, setSelectedBrand] = useState('todas');
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('destacado');

  // Datos de zapatillas para hombres con marca y modelo
  const zapatillasData = [
    {
      id: 1,
      model: 'AIR RUNNER PRO',
      brand: 'Nike',
      price: 189,
      image: '👟',
      sizes: [8, 9, 10, 11, 12],
      color: 'Negro/Blanco',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 2,
      model: 'URBAN STREET',
      brand: 'Adidas',
      price: 159,
      image: '👟',
      sizes: [8, 9, 10, 11],
      color: 'Blanco/Gris',
      stock: true,
      nuevo: false,
      destacado: true
    },
    {
      id: 3,
      model: 'BASKETBALL ELITE',
      brand: 'Nike',
      price: 199,
      image: '👟',
      sizes: [9, 10, 11, 12, 13],
      color: 'Negro/Rojo',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 4,
      model: 'CLASSIC LEATHER',
      brand: 'Reebok',
      price: 149,
      image: '👟',
      sizes: [8, 9, 10, 11, 12],
      color: 'Café',
      stock: true,
      nuevo: false,
      destacado: false
    },
    {
      id: 5,
      model: 'SPORT TRAINER',
      brand: 'Puma',
      price: 169,
      image: '👟',
      sizes: [8, 9, 10, 11],
      color: 'Negro',
      stock: false,
      nuevo: false,
      destacado: false
    },
    {
      id: 6,
      model: 'RUNNING BOOST',
      brand: 'Adidas',
      price: 179,
      image: '👟',
      sizes: [9, 10, 11, 12],
      color: 'Azul/Blanco',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 7,
      model: 'SKATE PRO',
      brand: 'Otros',
      price: 139,
      image: '👟',
      sizes: [8, 9, 10, 11, 12],
      color: 'Negro/Blanco',
      stock: true,
      nuevo: false,
      destacado: false
    },
    {
      id: 8,
      model: 'PERFORMANCE MAX',
      brand: 'Nike',
      price: 209,
      image: '👟',
      sizes: [9, 10, 11, 12, 13],
      color: 'Gris/Verde',
      stock: true,
      nuevo: true,
      destacado: true
    }
  ];

  // Marcas disponibles - 4 MARCAS ESPECÍFICAS
  const brands = [
    { value: 'todas', label: 'Todas' },
    { value: 'Nike', label: 'NIKE' },
    { value: 'Adidas', label: 'ADIDAS' },
    { value: 'Puma', label: 'PUMA' },
    { value: 'Reebok', label: 'REEBOK' },
    { value: 'Otros', label: 'OTROS' }
  ];

  // Filtrar zapatillas
  const filteredZapatillas = zapatillasData.filter(zapato => {
    const brandMatch = selectedBrand === 'todas' || zapato.brand === selectedBrand;
    const sizeMatch = selectedSize === 'all' || zapato.sizes.includes(parseInt(selectedSize));
    const priceMatch = 
      priceRange === 'all' ||
      (priceRange === 'low' && zapato.price < 150) ||
      (priceRange === 'mid' && zapato.price >= 150 && zapato.price <= 180) ||
      (priceRange === 'high' && zapato.price > 180);
    
    return brandMatch && sizeMatch && priceMatch;
  });

  // Ordenar zapatillas
  const sortedZapatillas = [...filteredZapatillas].sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    if (sortBy === 'nombre') return a.model.localeCompare(b.model);
    if (sortBy === 'destacado') return b.destacado - a.destacado;
    return 0;
  });

  return (
    <div className="hombres-page">
      
      {/* CONTENEDOR PRINCIPAL CON SIDEBAR Y PRODUCTOS */}
      <div className="hombres-content">
        
        {/* SIDEBAR DE FILTROS */}
        <aside className="hombres-sidebar">
          
          {/* Marcas */}
          <div className="filter-group">
            <h3 className="filter-title">Marca</h3>
            <div className="filter-options">
              {brands.map(brand => (
                <button 
                  key={brand.value}
                  className={`filter-btn ${selectedBrand === brand.value ? 'active' : ''}`}
                  onClick={() => setSelectedBrand(brand.value)}
                >
                  {brand.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tallas */}
          <div className="filter-group">
            <h3 className="filter-title">Talla (US)</h3>
            <select 
              className="filter-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="all">Todas las tallas</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
            </select>
          </div>

          {/* Rango de precio */}
          <div className="filter-group">
            <h3 className="filter-title">Precio</h3>
            <div className="filter-options">
              <button 
                className={`filter-btn ${priceRange === 'all' ? 'active' : ''}`}
                onClick={() => setPriceRange('all')}
              >
                Todos
              </button>
              <button 
                className={`filter-btn ${priceRange === 'low' ? 'active' : ''}`}
                onClick={() => setPriceRange('low')}
              >
                Menos de $150
              </button>
              <button 
                className={`filter-btn ${priceRange === 'mid' ? 'active' : ''}`}
                onClick={() => setPriceRange('mid')}
              >
                $150 - $180
              </button>
              <button 
                className={`filter-btn ${priceRange === 'high' ? 'active' : ''}`}
                onClick={() => setPriceRange('high')}
              >
                Más de $180
              </button>
            </div>
          </div>

        </aside>

        {/* ÁREA DE PRODUCTOS */}
        <main className="hombres-main">
          
          {/* Barra superior con contador y ordenamiento */}
          <div className="hombres-toolbar">
            <div className="products-count">
              {sortedZapatillas.length} {sortedZapatillas.length === 1 ? 'producto' : 'productos'}
            </div>
            
            <div className="hombres-sort">
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

          {/* Grid de productos */}
          <div className="hombres-grid">
            {sortedZapatillas.map(zapato => (
              <ZapatoCard key={zapato.id} zapato={zapato} />
            ))}
          </div>

          {/* Sin resultados */}
          {sortedZapatillas.length === 0 && (
            <div className="no-results">
              <p>No se encontraron productos con los filtros seleccionados</p>
              <button 
                className="reset-filters-btn"
                onClick={() => {
                  setSelectedBrand('todas');
                  setSelectedSize('all');
                  setPriceRange('all');
                }}
              >
                Limpiar Filtros
              </button>
            </div>
          )}

        </main>

      </div>
    </div>
  );
};

// ===== COMPONENTE DE TARJETA DE ZAPATO =====
const ZapatoCard = ({ zapato }) => {
  const [selectedSize, setSelectedSize] = useState(zapato.sizes[0]);
  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: zapato.id,
      name: `${zapato.brand.toUpperCase()} ${zapato.model}`,
      price: zapato.price,
      image: zapato.image,
      color: zapato.color,
      selectedSize: selectedSize,
      category: 'zapatillas'
    };

    addToCart(cartItem);
    openCart(); // Abrir el carrito automáticamente
  };

  return (
    <div className={`zapato-card ${!zapato.stock ? 'out-of-stock' : ''}`}>
      
      {/* Etiquetas */}
      <div className="zapato-badges">
        {zapato.nuevo && <span className="badge badge-new">NUEVO</span>}
        {zapato.destacado && <span className="badge badge-featured">DESTACADO</span>}
        {!zapato.stock && <span className="badge badge-out">AGOTADO</span>}
      </div>

      {/* Imagen */}
      <div className="zapato-image">
        <span className="zapato-icon">{zapato.image}</span>
      </div>

      {/* Información */}
      <div className="zapato-info">
        <h3 className="zapato-brand">{zapato.brand.toUpperCase()}</h3>
        <p className="zapato-model">{zapato.model}</p>
        
        {/* Selector de tallas */}
        {zapato.stock && (
          <div className="zapato-sizes">
            <label className="size-label">Talla (US):</label>
            <div className="size-options">
              {zapato.sizes.map(size => (
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
        )}

        <div className="zapato-footer">
          <span className="zapato-price">${zapato.price}</span>
          <button 
            className="zapato-add-btn"
            onClick={handleAddToCart}
            disabled={!zapato.stock}
          >
            {zapato.stock ? 'Agregar' : 'Agotado'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Hombres;