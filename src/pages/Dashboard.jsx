import React, { useState, useEffect, useCallback } from 'react';
import './Dashboard.css';
// Importar datos reales
import { gorrasData } from '../data/products/gorrasData';
import { hombresData } from '../data/products/hombresData';
import { mujeresData } from '../data/products/mujeresData';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('reciente');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ total: 0, gorras: 0, hombres: 0, mujeres: 0 });

  // Cargar productos al iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  // Filtrar y ordenar productos
  useEffect(() => {
    let result = [...products];

    if (filterCategory !== 'all') {
      result = result.filter(p => p.category === filterCategory);
    }

    if (searchTerm) {
      result = result.filter(p => {
        const searchString = `${p.brand} ${p.model}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
      });
    }

    switch(sortBy) {
      case 'precio-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'precio-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'nombre':
        result.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
        break;
      default:
        result.sort((a, b) => b.id.localeCompare(a.id));
    }

    setFilteredProducts(result);
  }, [filterCategory, products, searchTerm, sortBy]);

  // Actualizar estadísticas
  useEffect(() => {
    const gorras = products.filter(p => p.category === 'gorras').length;
    const hombres = products.filter(p => p.category === 'tenis-hombre').length;
    const mujeres = products.filter(p => p.category === 'tenis-mujer').length;
    
    setStats({
      total: products.length,
      gorras,
      hombres,
      mujeres
    });
  }, [products]);

  const loadProducts = () => {
    setIsLoading(true);
    
    // Intentar cargar desde localStorage
    const savedProducts = localStorage.getItem('dukicks_all_products');
    
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error al cargar productos guardados:', error);
        loadInitialProducts();
      }
    } else {
      loadInitialProducts();
    }
    
    setIsLoading(false);
  };

  const loadInitialProducts = () => {
    // Combinar todos los productos de data
    const allProducts = [
      ...gorrasData,
      ...hombresData,
      ...mujeresData
    ];
    
    setProducts(allProducts);
    localStorage.setItem('dukicks_all_products', JSON.stringify(allProducts));
  };

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('dukicks_all_products', JSON.stringify(updatedProducts));
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminUsername');
    window.location.href = '/login';
  }, []);

  const handleAddProduct = useCallback(() => {
    setEditingProduct(null);
    setShowModal(true);
  }, []);

  const handleEditProduct = useCallback((product) => {
    setEditingProduct(product);
    setShowModal(true);
  }, []);

  const handleDeleteProduct = useCallback((productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      saveProducts(updatedProducts);
    }
  }, [products]);

  const handleSaveProduct = useCallback((productData) => {
    let updatedProducts;
    
    if (editingProduct) {
      updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      );
    } else {
      const newProduct = { 
        ...productData, 
        id: `${productData.category}-${Date.now()}` 
      };
      updatedProducts = [...products, newProduct];
    }

    saveProducts(updatedProducts);
    setShowModal(false);
  }, [products, editingProduct]);

  const username = localStorage.getItem('adminUsername') || 'Admin';

  return (
    <div className="dashboard">
      <DashboardHeader username={username} onLogout={handleLogout} />

      <main className="dashboard-main">
        <div className="dashboard-container">
          <StatsGrid stats={stats} />

          <ProductsSection
            products={filteredProducts}
            isLoading={isLoading}
            filterCategory={filterCategory}
            searchTerm={searchTerm}
            sortBy={sortBy}
            onFilterChange={setFilterCategory}
            onSearchChange={setSearchTerm}
            onSortChange={setSortBy}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      </main>

      {showModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

// ===== HEADER =====
const DashboardHeader = ({ username, onLogout }) => (
  <header className="dashboard-header">
    <div className="header-content">
      <div>
        <h1 className="header-title">Panel de Control - DUKICKS</h1>
        <p className="header-subtitle">Bienvenido, {username}</p>
      </div>
      <button onClick={onLogout} className="logout-btn">
        Cerrar Sesión
      </button>
    </div>
  </header>
);

// ===== GRID DE ESTADÍSTICAS =====
const StatsGrid = ({ stats }) => {
  const statCards = [
    { label: 'Total Productos', value: stats.total, color: '#0066cc' },
    { label: 'Gorras', value: stats.gorras, color: '#ff9900' },
    { label: 'Hombres', value: stats.hombres, color: '#4facfe' },
    { label: 'Mujeres', value: stats.mujeres, color: '#f093fb' }
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, idx) => (
        <div key={idx} className="stat-card" style={{ borderLeftColor: stat.color }}>
          <div className="stat-content">
            <div>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ===== SECCIÓN DE PRODUCTOS =====
const ProductsSection = ({
  products,
  isLoading,
  filterCategory,
  searchTerm,
  sortBy,
  onFilterChange,
  onSearchChange,
  onSortChange,
  onAddProduct,
  onEditProduct,
  onDeleteProduct
}) => (
  <div className="products-section">
    <div className="products-header">
      <h2 className="products-title">Gestión de Productos</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onAddProduct} className="add-product-btn">
          + Agregar Producto
        </button>
      </div>
    </div>

    <div className="products-controls">
      <input
        type="text"
        placeholder="Buscar por marca o modelo..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      <select
        value={filterCategory}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">Todas las categorías</option>
        <option value="gorras">Gorras</option>
        <option value="tenis-hombre">Hombres</option>
        <option value="tenis-mujer">Mujeres</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="reciente">Más Reciente</option>
        <option value="precio-asc">Precio: Menor a Mayor</option>
        <option value="precio-desc">Precio: Mayor a Menor</option>
        <option value="nombre">Nombre</option>
      </select>
    </div>

    {isLoading ? (
      <div className="loading-state">Cargando productos...</div>
    ) : products.length === 0 ? (
      <div className="empty-state">
        <p className="empty-title"> No hay productos</p>
        <p className="empty-subtitle">
          {searchTerm || filterCategory !== 'all' 
            ? 'Intenta cambiar los filtros de búsqueda'
            : 'Comienza agregando tu primer producto'}
        </p>
      </div>
    ) : (
      <ProductsTable
        products={products}
        onEdit={onEditProduct}
        onDelete={onDeleteProduct}
      />
    )}
  </div>
);

// ===== TABLA DE PRODUCTOS =====
const ProductsTable = ({ products, onEdit, onDelete }) => (
  <div className="table-container">
    <table className="products-table">
      <thead>
        <tr className="table-header">
          <th>Imagen</th>
          <th>Producto</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Tallas</th>
          <th>Badges</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, idx) => (
          <tr key={product.id} className={`table-row ${idx % 2 === 0 ? 'even' : 'odd'}`}>
            <td>
              <ProductImage image={product.image} alt={`${product.brand} ${product.model}`} />
            </td>
            <td>
              <div>
                <p className="product-name">{product.brand} {product.model}</p>
                <p className="product-subcategory">{product.color}</p>
              </div>
            </td>
            <td className="product-category">
              {product.category === 'gorras' && '🧢 Gorras'}
              {product.category === 'tenis-hombre' && '👟 Hombres'}
              {product.category === 'tenis-mujer' && '👟 Mujeres'}
            </td>
            <td className="product-price">${product.price}</td>
            <td>
              <span style={{ fontSize: '0.85rem', color: '#666' }}>
                {product.sizes?.length || 0} tallas
              </span>
            </td>
            <td>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {product.features?.nuevo && (
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#000', color: '#fff', borderRadius: '3px' }}>
                    NUEVO
                  </span>
                )}
                {product.features?.destacado && (
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#FFD700', color: '#000', borderRadius: '3px' }}>
                    DESTACADO
                  </span>
                )}
                {product.features?.oferta && (
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#FF4444', color: '#fff', borderRadius: '3px' }}>
                    OFERTA
                  </span>
                )}
              </div>
            </td>
            <td>
              <div className="action-buttons">
                <button onClick={() => onEdit(product)} className="edit-btn">
                  Editar
                </button>
                <button onClick={() => onDelete(product.id)} className="delete-btn">
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ===== COMPONENTE DE IMAGEN =====
const ProductImage = ({ image, alt }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="product-image-container">
      {!imageError && image ? (
        <img
          src={image}
          alt={alt}
          onError={() => setImageError(true)}
          className="product-image"
        />
      ) : (
        <span className="image-fallback">👟</span>
      )}
    </div>
  );
};

// ===== MODAL DE PRODUCTO =====
const ProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    brand: product?.brand || '',
    model: product?.model || '',
    category: product?.category || 'tenis-hombre',
    price: product?.price || '',
    image: product?.image || '',
    color: product?.color || '',
    sizes: product?.sizes || [],
    features: {
      nuevo: product?.features?.nuevo || false,
      destacado: product?.features?.destacado || false,
      oferta: product?.features?.oferta || false
    }
  });

  const [imagePreview, setImagePreview] = useState(product?.image || null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('features.')) {
      const featureName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureName]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.brand || !formData.model || !formData.price) {
      alert('Por favor completa: Marca, Modelo y Precio');
      return;
    }

    onSave({
      ...formData,
      price: parseFloat(formData.price)
    });
  };

  return (
    <>
      <div onClick={onClose} className="modal-overlay" />
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="modal-close-btn">✕</button>
        </div>

        <div className="modal-content">
          {/* Preview de Imagen */}
          <div className="image-upload-section">
            <label className="section-label">Imagen del Producto</label>
            <div className="image-preview">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                  onError={() => setImagePreview(null)}
                />
              ) : (
                <span className="preview-placeholder">📸</span>
              )}
            </div>

            <div className="file-upload-area">
              <p className="upload-text">
                Arrastra una imagen aquí o haz clic para seleccionar
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="file-input"
              />
              <label htmlFor="file-input" className="file-input-label">
                Seleccionar archivo
              </label>
              <p className="file-format-info">Formatos: JPG, PNG, WebP</p>
            </div>
          </div>

          {/* Información del Producto */}
          <div className="form-row">
            <div className="form-field">
              <label className="field-label">Marca *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Ej: Nike"
                className="text-input"
              />
            </div>

            <div className="form-field">
              <label className="field-label">Modelo *</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Ej: Air Force 1"
                className="text-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="field-label">Categoría</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select-input"
              >
                <option value="tenis-hombre">Hombres</option>
                <option value="tenis-mujer">Mujeres</option>
                <option value="gorras">Gorras</option>
              </select>
            </div>

            <div className="form-field">
              <label className="field-label">Precio *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                className="text-input"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="field-label">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Ej: Negro/Blanco"
              className="text-input"
            />
          </div>

          {/* Features / Badges */}
          <div className="form-field">
            <label className="field-label">Características</label>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  name="features.nuevo"
                  checked={formData.features.nuevo}
                  onChange={handleChange}
                />
                <span>Nuevo</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  name="features.destacado"
                  checked={formData.features.destacado}
                  onChange={handleChange}
                />
                <span>Destacado</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  name="features.oferta"
                  checked={formData.features.oferta}
                  onChange={handleChange}
                />
                <span>Oferta</span>
              </label>
            </div>
          </div>

          {/* Selector de Tallas */}
          <SizesSelector 
            category={formData.category} 
            selectedSizes={formData.sizes}
            onSizesChange={(sizes) => setFormData(prev => ({ ...prev, sizes }))}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancelar
            </button>
            <button onClick={handleSubmit} className="save-btn">
              {product ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ===== SELECTOR DE TALLAS =====
const SizesSelector = ({ category, selectedSizes, onSizesChange }) => {
  const getSizeOptions = () => {
    switch(category) {
      case 'tenis-hombre':
      case 'tenis-mujer':
        return [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15];
      case 'gorras':
        return ['One Size'];
      default:
        return [];
    }
  };

  const sizeOptions = getSizeOptions();

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter(s => s !== size));
    } else {
      onSizesChange([...selectedSizes, size].sort((a, b) => {
        if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
        return Number(a) - Number(b);
      }));
    }
  };

  const selectAll = () => {
    onSizesChange(sizeOptions);
  };

  const clearAll = () => {
    onSizesChange([]);
  };

  return (
    <div className="sizes-selector">
      <div className="sizes-header">
        <label className="sizes-label">Tallas disponibles</label>
        <div className="sizes-actions">
          <button type="button" onClick={selectAll} className="select-all-btn">
            Seleccionar todo
          </button>
          <button type="button" onClick={clearAll} className="clear-all-btn">
            Limpiar
          </button>
        </div>
      </div>

      <div className="sizes-grid">
        {sizeOptions.map(size => (
          <button
            key={size}
            type="button"
            onClick={() => toggleSize(size)}
            className={`size-btn ${selectedSizes.includes(size) ? 'selected' : ''}`}
          >
            {size}
          </button>
        ))}
      </div>

      {selectedSizes.length > 0 && (
        <p className="sizes-count">
          {selectedSizes.length} talla{selectedSizes.length !== 1 ? 's' : ''} seleccionada{selectedSizes.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default Dashboard;