// src/pages/Mujeres.jsx
import React, { useState } from 'react';
import './Mujeres.css';

const Mujeres = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('destacado');

  // Datos de zapatillas para mujeres
  const zapatillasData = [
    {
      id: 1,
      name: 'CLOUD RUNNER',
      category: 'running',
      price: 179,
      image: '👟',
      sizes: [5, 6, 7, 8, 9],
      color: 'Rosa/Blanco',
      colorCode: 'rosa',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 2,
      name: 'URBAN CHIC',
      category: 'lifestyle',
      price: 159,
      image: '👟',
      sizes: [5, 6, 7, 8, 9, 10],
      color: 'Blanco',
      colorCode: 'blanco',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 3,
      name: 'FITNESS PRO',
      category: 'training',
      price: 169,
      image: '👟',
      sizes: [6, 7, 8, 9],
      color: 'Negro/Morado',
      colorCode: 'negro',
      stock: true,
      nuevo: false,
      destacado: true
    },
    {
      id: 4,
      name: 'CASUAL STYLE',
      category: 'casual',
      price: 149,
      image: '👟',
      sizes: [5, 6, 7, 8, 9],
      color: 'Beige',
      colorCode: 'beige',
      stock: true,
      nuevo: false,
      destacado: false
    },
    {
      id: 5,
      name: 'SPORT FLEX',
      category: 'running',
      price: 189,
      image: '👟',
      sizes: [6, 7, 8, 9, 10],
      color: 'Coral',
      colorCode: 'rosa',
      stock: false,
      nuevo: false,
      destacado: false
    },
    {
      id: 6,
      name: 'ELEGANT WALK',
      category: 'lifestyle',
      price: 139,
      image: '👟',
      sizes: [5, 6, 7, 8],
      color: 'Negro',
      colorCode: 'negro',
      stock: true,
      nuevo: false,
      destacado: true
    },
    {
      id: 7,
      name: 'POWER TRAINING',
      category: 'training',
      price: 175,
      image: '👟',
      sizes: [6, 7, 8, 9],
      color: 'Gris/Rosa',
      colorCode: 'gris',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 8,
      name: 'STREET FASHION',
      category: 'casual',
      price: 155,
      image: '👟',
      sizes: [5, 6, 7, 8, 9, 10],
      color: 'Blanco/Dorado',
      colorCode: 'blanco',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 9,
      name: 'PREMIUM SPORT',
      category: 'running',
      price: 199,
      image: '👟',
      sizes: [6, 7, 8, 9],
      color: 'Negro/Verde',
      colorCode: 'negro',
      stock: true,
      nuevo: true,
      destacado: true
    },
    {
      id: 10,
      name: 'COMFORT PLUS',
      category: 'lifestyle',
      price: 129,
      image: '👟',
      sizes: [5, 6, 7, 8, 9],
      color: 'Gris',
      colorCode: 'gris',
      stock: true,
      nuevo: false,
      destacado: false
    }
  ];

  // Filtrar zapatillas
  const filteredZapatillas = zapatillasData.filter(zapato => {
    const categoryMatch = selectedCategory === 'todas' || zapato.category === selectedCategory;
    const sizeMatch = selectedSize === 'all' || zapato.sizes.includes(parseInt(selectedSize));
    const colorMatch = selectedColor === 'all' || zapato.colorCode === selectedColor;
    const priceMatch = 
      priceRange === 'all' ||
      (priceRange === 'low' && zapato.price < 150) ||
      (priceRange === 'mid' && zapato.price >= 150 && zapato.price <= 175) ||
      (priceRange === 'high' && zapato.price > 175);
    
    return categoryMatch && sizeMatch && colorMatch && priceMatch;
  });

  // Ordenar zapatillas
  const sortedZapatillas = [...filteredZapatillas].sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    if (sortBy === 'nombre') return a.name.localeCompare(b.name);
    if (sortBy === 'destacado') return b.destacado - a.destacado;
    return 0;
  });

  return (
    <div className="mujeres-page">

      {/* CONTENEDOR PRINCIPAL CON SIDEBAR Y PRODUCTOS */}
      <div className="mujeres-content">
        
        {/* SIDEBAR DE FILTROS */}
        <aside className="mujeres-sidebar">
          
          {/* Categorías */}
          <div className="filter-group">
            <h3 className="filter-title">Categoría</h3>
            <div className="filter-options">
              <button 
                className={`filter-btn ${selectedCategory === 'todas' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('todas')}
              >
                Todas
              </button>
              <button 
                className={`filter-btn ${selectedCategory === 'running' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('running')}
              >
                Running
              </button>
              <button 
                className={`filter-btn ${selectedCategory === 'training' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('training')}
              >
                Training
              </button>
              <button 
                className={`filter-btn ${selectedCategory === 'lifestyle' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('lifestyle')}
              >
                Lifestyle
              </button>
              <button 
                className={`filter-btn ${selectedCategory === 'casual' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('casual')}
              >
                Casual
              </button>
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

          {/* Color */}
          <div className="filter-group">
            <h3 className="filter-title">Color</h3>
            <div className="color-options">
              <button 
                className={`color-btn ${selectedColor === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedColor('all')}
                title="Todos"
              >
                Todos
              </button>
              <button 
                className={`color-btn color-negro ${selectedColor === 'negro' ? 'active' : ''}`}
                onClick={() => setSelectedColor('negro')}
                title="Negro"
              >
                <span className="color-circle"></span>
              </button>
              <button 
                className={`color-btn color-blanco ${selectedColor === 'blanco' ? 'active' : ''}`}
                onClick={() => setSelectedColor('blanco')}
                title="Blanco"
              >
                <span className="color-circle"></span>
              </button>
              <button 
                className={`color-btn color-rosa ${selectedColor === 'rosa' ? 'active' : ''}`}
                onClick={() => setSelectedColor('rosa')}
                title="Rosa"
              >
                <span className="color-circle"></span>
              </button>
              <button 
                className={`color-btn color-gris ${selectedColor === 'gris' ? 'active' : ''}`}
                onClick={() => setSelectedColor('gris')}
                title="Gris"
              >
                <span className="color-circle"></span>
              </button>
              <button 
                className={`color-btn color-beige ${selectedColor === 'beige' ? 'active' : ''}`}
                onClick={() => setSelectedColor('beige')}
                title="Beige"
              >
                <span className="color-circle"></span>
              </button>
            </div>
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
                <option value="nombre">Nombre</option>
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
                  setSelectedCategory('todas');
                  setSelectedSize('all');
                  setSelectedColor('all');
                  setPriceRange('all');
                }}
              >
                Limpiar Filtros
              </button>
            </div>
          )}

        </main>

      </div>

      {/* SECCIÓN DE CARACTERÍSTICAS */}
      <section className="mujeres-features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Diseño Exclusivo</h3>
            <p>Colecciones únicas que reflejan tu personalidad</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💪</div>
            <h3>Máximo Confort</h3>
            <p>Tecnología adaptada para cada actividad</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>Calidad Premium</h3>
            <p>Materiales duraderos y sostenibles</p>
          </div>
        </div>
      </section>

    </div>
  );
};

// ===== COMPONENTE DE TARJETA DE ZAPATO =====
const ZapatoCard = ({ zapato }) => {
  const [selectedSize, setSelectedSize] = useState(zapato.sizes[0]);

  const handleAddToCart = () => {
    console.log('Agregado al carrito:', zapato.name, 'Talla:', selectedSize);
    // Aquí irá la lógica del carrito
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
        <h3 className="zapato-name">{zapato.name}</h3>
        <p className="zapato-color">{zapato.color}</p>
        
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

export default Mujeres;