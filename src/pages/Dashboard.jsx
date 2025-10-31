// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Verificar autenticación
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  // Cargar productos iniciales
  useEffect(() => {
    loadProducts();
  }, []);

  // Filtrar productos
  useEffect(() => {
    if (filterCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === filterCategory));
    }
  }, [filterCategory, products]);

  const loadProducts = () => {
    setIsLoading(true);
    // Simular carga desde localStorage o API
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Productos iniciales de ejemplo
      const initialProducts = [
        {
          id: 1,
          name: 'AIR RUNNER PRO',
          category: 'zapatillas',
          subcategory: 'hombres',
          price: 189,
          stock: true,
          image: '👟',
          description: 'Zapatillas de alto rendimiento'
        },
        {
          id: 2,
          name: 'CLASSIC CAP',
          category: 'gorras',
          subcategory: 'unisex',
          price: 49,
          stock: true,
          image: '🧢',
          description: 'Gorra clásica premium'
        },
        {
          id: 3,
          name: 'MIDNIGHT LOGO TEE',
          category: 'playeras',
          subcategory: 'unisex',
          price: 45,
          stock: true,
          image: '👕',
          description: 'Playera con logo bordado'
        }
      ];
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminUsername');
    navigate('/login');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  const handleSaveProduct = (productData) => {
    let updatedProducts;
    
    if (editingProduct) {
      // Editar producto existente
      updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      );
    } else {
      // Crear nuevo producto
      const newProduct = {
        ...productData,
        id: Date.now()
      };
      updatedProducts = [...products, newProduct];
    }

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setShowModal(false);
  };

  const username = localStorage.getItem('adminUsername');

  return (
    <div className="dashboard-page">
      
      {/* Header del Dashboard */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-title-section">
            <h1>Panel de Control</h1>
            <p className="dashboard-welcome">Bienvenido, {username}</p>
          </div>
          <div className="dashboard-actions">
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="dashboard-content">
        
        {/* Sección de Productos */}
        <section className="products-section">
          
          <div className="section-header">
            <h2 className="section-title">Productos</h2>
            <button className="add-product-btn" onClick={handleAddProduct}>
              <span>+</span> Agregar Producto
            </button>
          </div>

          {/* Filtros */}
          <div className="products-filters">
            <select
              className="filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">Todas las categorías</option>
              <option value="zapatillas">Zapatillas</option>
              <option value="gorras">Gorras</option>
              <option value="playeras">Playeras</option>
            </select>
          </div>

          {/* Tabla de Productos */}
          {isLoading ? (
            <div className="empty-state">
              <p>Cargando productos...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <p>No hay productos en esta categoría</p>
              <button className="add-product-btn" onClick={handleAddProduct}>
                Agregar Primer Producto
              </button>
            </div>
          ) : (
            <ProductsTable
              products={filteredProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          )}

        </section>

      </main>

      {/* Modal de Producto */}
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

// ===== COMPONENTE DE TABLA DE PRODUCTOS =====
const ProductsTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="products-table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td data-label="Producto">
                <div className="product-cell">
                  <div className="product-image">{product.image}</div>
                  <div className="product-info">
                    <span className="product-name">{product.name}</span>
                    <span className="product-category">{product.subcategory}</span>
                  </div>
                </div>
              </td>
              <td data-label="Categoría">{product.category}</td>
              <td data-label="Precio">${product.price}</td>
              <td data-label="Stock">
                <span className={`stock-badge ${product.stock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock ? 'En Stock' : 'Agotado'}
                </span>
              </td>
              <td data-label="Acciones">
                <div className="actions-cell">
                  <button
                    className="action-btn"
                    onClick={() => onEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => onDelete(product.id)}
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
};

// ===== COMPONENTE DE MODAL DE PRODUCTO =====
const ProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'zapatillas',
    subcategory: product?.subcategory || 'hombres',
    price: product?.price || '',
    stock: product?.stock !== undefined ? product.stock : true,
    image: product?.image || '👟',
    description: product?.description || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price)
    });
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-header">
          <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Categoría</label>
              <select
                name="category"
                className="form-input"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="zapatillas">Zapatillas</option>
                <option value="gorras">Gorras</option>
                <option value="playeras">Playeras</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Subcategoría</label>
              <select
                name="subcategory"
                className="form-input"
                value={formData.subcategory}
                onChange={handleChange}
                required
              >
                <option value="hombres">Hombres</option>
                <option value="mujeres">Mujeres</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Precio</label>
              <input
                type="number"
                name="price"
                className="form-input"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Emoji/Icono</label>
              <input
                type="text"
                name="image"
                className="form-input"
                value={formData.image}
                onChange={handleChange}
                maxLength="2"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="stock"
                checked={formData.stock}
                onChange={handleChange}
              />
              <span>Producto en stock</span>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {product ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default Dashboard;