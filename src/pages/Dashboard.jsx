import React, { useState, useEffect, useCallback } from 'react';
import './Dashboard.css';

// ===== DASHBOARD CON CARGA DE IMÁGENES =====
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('reciente');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ total: 0, inStock: 0, outOfStock: 0 });

  // Cargar productos iniciales
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
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch(sortBy) {
      case 'precio-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'precio-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'nombre':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(result);
  }, [filterCategory, products, searchTerm, sortBy]);

  // Actualizar estadísticas
  useEffect(() => {
    const inStock = products.filter(p => p.stock).length;
    setStats({
      total: products.length,
      inStock,
      outOfStock: products.length - inStock
    });
  }, [products]);

  const loadProducts = () => {
    setIsLoading(true);
    setTimeout(() => {
      const savedProducts = localStorage.getItem('dashboard_products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        const initialProducts = [
          {
            id: 1,
            name: 'AIR RUNNER PRO',
            category: 'zapatillas',
            subcategory: 'hombres',
            price: 189,
            stock: true,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            description: 'Zapatillas de alto rendimiento con tecnología air'
          },
          {
            id: 2,
            name: 'CLASSIC CAP',
            category: 'gorras',
            subcategory: 'unisex',
            price: 49,
            stock: true,
            image: 'https://images.unsplash.com/photo-1595777707802-c8b0adf82475?w=400&h=400&fit=crop',
            description: 'Gorra clásica premium de algodón'
          }
        ];
        setProducts(initialProducts);
        localStorage.setItem('dashboard_products', JSON.stringify(initialProducts));
      }
      setIsLoading(false);
    }, 500);
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
      setProducts(updatedProducts);
      localStorage.setItem('dashboard_products', JSON.stringify(updatedProducts));
    }
  }, [products]);

  const handleSaveProduct = useCallback((productData) => {
    let updatedProducts;
    
    if (editingProduct) {
      updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      );
    } else {
      const newProduct = { ...productData, id: Date.now() };
      updatedProducts = [...products, newProduct];
    }

    setProducts(updatedProducts);
    localStorage.setItem('dashboard_products', JSON.stringify(updatedProducts));
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
        <h1 className="header-title">Panel de Control</h1>
        <p className="header-subtitle">Bienvenido, {username}</p>
      </div>
      <button
        onClick={onLogout}
        className="logout-btn"
      >
        Cerrar Sesión
      </button>
    </div>
  </header>
);

// ===== GRID DE ESTADÍSTICAS =====
const StatsGrid = ({ stats }) => {
  const statCards = [
    { label: 'Total Productos', value: stats.total, color: '#0066cc' },
    { label: 'En Stock', value: stats.inStock, color: '#4caf50' },
    { label: 'Agotados', value: stats.outOfStock, color: '#ff6b6b' }
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, idx) => (
        <div
          key={idx}
          className="stat-card"
          style={{ borderLeftColor: stat.color }}
        >
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
      <h2 className="products-title">Productos</h2>
      <button
        onClick={onAddProduct}
        className="add-product-btn"
      >
        + Agregar Producto
      </button>
    </div>

    <div className="products-controls">
      <input
        type="text"
        placeholder="Buscar productos..."
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
        <option value="zapatillas">Zapatillas</option>
        <option value="gorras">Gorras</option>
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
      <div className="loading-state">
        Cargando productos...
      </div>
    ) : products.length === 0 ? (
      <div className="empty-state">
        <p className="empty-title">📦 No hay productos</p>
        <p className="empty-subtitle">Comienza agregando tu primer producto</p>
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
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, idx) => (
          <tr
            key={product.id}
            className={`table-row ${idx % 2 === 0 ? 'even' : 'odd'}`}
          >
            <td>
              <ProductImage image={product.image} alt={product.name} />
            </td>
            <td>
              <div>
                <p className="product-name">{product.name}</p>
                <p className="product-subcategory">{product.subcategory}</p>
              </div>
            </td>
            <td className="product-category">{product.category}</td>
            <td className="product-price">${product.price}</td>
            <td>
              <span className={`stock-badge ${product.stock ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock ? 'En Stock' : 'Agotado'}
              </span>
            </td>
            <td>
              <div className="action-buttons">
                <button
                  onClick={() => onEdit(product)}
                  className="edit-btn"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="delete-btn"
                >
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

// ===== COMPONENTE DE IMAGEN CON FALLBACK =====
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

// ===== MODAL DE PRODUCTO CON CARGA DE IMAGEN =====
const ProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'zapatillas',
    subcategory: product?.subcategory || 'hombres',
    price: product?.price || '',
    stock: product?.stock !== undefined ? product.stock : true,
    image: product?.image || '',
    description: product?.description || '',
    sizes: product?.sizes || []
  });

  const [imagePreview, setImagePreview] = useState(product?.image || null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
    if (!formData.name || !formData.price || !formData.image) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    onSave({
      ...formData,
      price: parseFloat(formData.price)
    });
  };

  return (
    <>
      <div
        onClick={onClose}
        className="modal-overlay"
      />
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={onClose}
            className="modal-close-btn"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="modal-content">
          
          {/* Preview de Imagen */}
          <div className="image-upload-section">
            <label className="section-label">
              Imagen del Producto *
            </label>
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

            {/* Solo subida de archivo */}
            <div 
              className="file-upload-area"
              onDragEnter={e => {
                e.stopPropagation();
                e.target.style.borderColor = '#0066cc';
                e.target.style.backgroundColor = '#f0f8ff';
              }}
              onDragLeave={e => {
                e.target.style.borderColor = '#ddd';
                e.target.style.backgroundColor = '#f9f9f9';
              }}
              onDrop={e => {
                e.stopPropagation();
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (files[0]) {
                  const event = { target: { files } };
                  handleImageUpload(event);
                }
              }}
            >
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
              <p className="file-format-info">
                Formatos aceptados: JPG, PNG, WebP
              </p>
            </div>
          </div>

          {/* Información del Producto */}
          <div className="form-field">
            <label className="field-label">
              Nombre *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Air Runner Pro"
              className="text-input"
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="field-label">
                Categoría
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select-input"
              >
                <option value="zapatillas">Zapatillas</option>
                <option value="gorras">Gorras</option>
              </select>
            </div>

            <div className="form-field">
              <label className="field-label">
                Subcategoría
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="select-input"
              >
                <option value="hombres">Hombres</option>
                <option value="mujeres">Mujeres</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="field-label">
                Precio *
              </label>
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

            <div className="form-field">
              <label className="field-label">
                Stock
              </label>
              <select
                name="stock"
                value={formData.stock ? 'inStock' : 'outOfStock'}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value === 'inStock' }))}
                className="select-input"
              >
                <option value="inStock">En Stock</option>
                <option value="outOfStock">Agotado</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label className="field-label">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el producto..."
              rows="4"
              className="textarea-input"
            />
          </div>

          {/* Selector de Tallas */}
          <SizesSelector 
            category={formData.category} 
            selectedSizes={formData.sizes}
            onSizesChange={(sizes) => setFormData(prev => ({ ...prev, sizes }))}
          />

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="save-btn"
            >
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
      case 'zapatillas':
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
        <label className="sizes-label">
          Tallas disponibles
        </label>
        <div className="sizes-actions">
          <button
            type="button"
            onClick={selectAll}
            className="select-all-btn"
          >
            Seleccionar todo
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="clear-all-btn"
          >
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