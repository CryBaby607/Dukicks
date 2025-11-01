import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 
import './Mujeres.css';

const Mujeres = () => {
  const [selectedBrand, setSelectedBrand] = useState('todas');
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('destacado');

  // Datos de zapatillas para mujeres - SOLO MARCAS Y MODELOS
  const zapatillasData = [
    {
      id: 'Mujer-1',
      brand: 'Nike',
      model: 'Air Max 270',
      price: 179,
      image: '👟',
      sizes: [5, 6, 7, 8, 9],
      color: 'Rosa/Blanco',
      colorCode: 'rosa',
      nuevo: true,
      destacado: true
    },
    {
      id: 'Mujer-2',
      brand: 'Adidas',
      model: 'Ultraboost 22',
      price: 159,
      image: '👟',
      sizes: [5, 6, 7, 8, 9, 10],
      color: 'Blanco',
      colorCode: 'blanco',
      nuevo: true,
      destacado: true
    },
    {
      id: 'Mujer-3',
      brand: 'Nike',
      model: 'Metcon 8',
      price: 169,
      image: '👟',
      sizes: [6, 7, 8, 9],
      color: 'Negro/Morado',
      colorCode: 'negro',
      nuevo: false,
      destacado: true
    },
    {
      id: 'Mujer-4',
      brand: 'Puma',
      model: 'Cali Dream',
      price: 149,
      image: '👟',
      sizes: [5, 6, 7, 8, 9],
      color: 'Beige',
      colorCode: 'beige',
      nuevo: false,
      destacado: false
    },
    {
      id: 'Mujer-5',
      brand: 'New Balance',
      model: 'FuelCell Rebel',
      price: 189,
      image: '👟',
      sizes: [6, 7, 8, 9, 10],
      color: 'Coral',
      colorCode: 'rosa',
      nuevo: false,
      destacado: false
    },
    {
      id: 'Mujer-6',
      brand: 'Adidas',
      model: 'NMD_R1',
      price: 139,
      image: '👟',
      sizes: [5, 6, 7, 8],
      color: 'Negro',
      colorCode: 'negro',
      nuevo: false,
      destacado: true
    },
    {
      id: 'Mujer-7',
      brand: 'Nike',
      model: 'Free Metcon 5',
      price: 175,
      image: '👟',
      sizes: [6, 7, 8, 9],
      color: 'Gris/Rosa',
      colorCode: 'gris',
      nuevo: true,
      destacado: true
    },
    {
      id: 'Mujer-8',
      brand: 'Puma',
      model: 'RS-X',
      price: 155,
      image: '👟',
      sizes: [5, 6, 7, 8, 9, 10],
      color: 'Blanco/Dorado',
      colorCode: 'blanco',
      nuevo: true,
      destacado: true
    }
  ];

  // Obtener marcas únicas para los filtros
  const brands = ['todas', ...new Set(zapatillasData.map(zapato => zapato.brand))];

  // Filtrar zapatillas
  const filteredZapatillas = zapatillasData.filter(zapato => {
    const brandMatch = selectedBrand === 'todas' || zapato.brand === selectedBrand;
    const sizeMatch = selectedSize === 'all' || zapato.sizes.includes(parseInt(selectedSize));
    const priceMatch = 
      priceRange === 'all' ||
      (priceRange === 'low' && zapato.price < 150) ||
      (priceRange === 'mid' && zapato.price >= 150 && zapato.price <= 175) ||
      (priceRange === 'high' && zapato.price > 175);
    
    return brandMatch && sizeMatch && priceMatch;
  });

  // Ordenar zapatillas
  const sortedZapatillas = [...filteredZapatillas].sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    if (sortBy === 'marca') return a.brand.localeCompare(b.brand);
    if (sortBy === 'modelo') return a.model.localeCompare(b.model);
    if (sortBy === 'destacado') return b.destacado - a.destacado;
    return 0;
  });

  return (
    <div className="mujeres-page">
      <div className="mujeres-content">
        
        {/* SIDEBAR DE FILTROS */}
        <aside className="mujeres-sidebar">
          
          {/* Marcas */}
          <div className="filter-group">
            <h3 className="filter-title">Marca</h3>
            <div className="filter-options">
              {brands.map(brand => (
                <button 
                  key={brand}
                  className={`filter-btn ${selectedBrand === brand ? 'active' : ''}`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand === 'todas' ? 'Todas las marcas' : brand}
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
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
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
                $150 - $175
              </button>
              <button 
                className={`filter-btn ${priceRange === 'high' ? 'active' : ''}`}
                onClick={() => setPriceRange('high')}
              >
                Más de $175
              </button>
            </div>
          </div>

        </aside>

        {/* ÁREA DE PRODUCTOS */}
        <main className="mujeres-main">
          
          {/* Barra superior con contador y ordenamiento */}
          <div className="mujeres-toolbar">
            <div className="products-count">
              {sortedZapatillas.length} {sortedZapatillas.length === 1 ? 'producto' : 'productos'}
            </div>
            
            <div className="mujeres-sort">
              <label htmlFor="sort">Ordenar por:</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="destacado">Destacados</option>
                <option value="marca">Marca</option>
                <option value="modelo">Modelo</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* Grid de productos */}
          <div className="mujeres-grid">
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
      category: 'zapatillas-mujeres' 
    };

    addToCart(cartItem);
    openCart(); // Abrir el carrito automáticamente
  };

  return (
    <div className="zapato-card">
      
      {/* Etiquetas */}
      <div className="zapato-badges">
        {zapato.nuevo && <span className="badge badge-new">NUEVO</span>}
        {zapato.destacado && <span className="badge badge-featured">DESTACADO</span>}
      </div>

      {/* Imagen */}
      <div className="zapato-image">
        <span className="zapato-icon">{zapato.image}</span>
      </div>

      {/* Información */}
      <div className="zapato-info">
        <h3 className="zapato-brand">{zapato.brand}</h3>
        <h4 className="zapato-model">{zapato.model}</h4>
        
        {/* Selector de tallas */}
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
        <div className="zapato-footer">
          <span className="zapato-price">${zapato.price}</span>
          <button 
            className="zapato-add-btn"
            onClick={handleAddToCart}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mujeres;