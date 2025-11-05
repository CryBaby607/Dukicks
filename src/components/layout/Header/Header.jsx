import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const searchRef = useRef(null);

  const { 
    isCartOpen, 
    toggleCart, 
    closeCart: closeCartPanel,
    getTotalItems 
  } = useCart();

  // Cargar productos al iniciar
  useEffect(() => {
    const savedProducts = localStorage.getItem('dukicks_all_products');
    if (savedProducts) {
      try {
        setAllProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    }
  }, []);

  // Buscar productos
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allProducts.filter(product => {
      const brand = (product.brand || '').toLowerCase();
      const model = (product.model || '').toLowerCase();
      const color = (product.color || '').toLowerCase();
      const category = (product.category || '').toLowerCase();

      return (
        brand.includes(query) ||
        model.includes(query) ||
        color.includes(query) ||
        category.includes(query)
      );
    }).slice(0, 8); // Límitar a 8 resultados

    setSearchResults(results);
  }, [searchQuery, allProducts]);

  // Cerrar búsqueda al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isCartOpen) closeCartPanel();
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleCartHandler = () => {
    toggleCart();
    if (isMenuOpen) setIsMenuOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isCartOpen) closeCartPanel();
  };

  const closeMenu = () => setIsMenuOpen(false);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleProductClick = (product) => {
    closeSearch();
    const category = product.category === 'gorras' ? 'gorras' : 
                     product.category === 'tenis-hombre' ? 'hombres' :
                     'mujeres';
    window.location.href = `/${category}`;
  };

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'gorras': return '🧢 Gorras';
      case 'tenis-hombre': return '👟 Hombres';
      case 'tenis-mujer': return '👟 Mujeres';
      default: return category;
    }
  };

  return (
    <header className="header">
      
      {/* Logo */}
      <Link to="/" className="header__logo">DUKICKS</Link>
      
      {/* Nav */}
      <nav className={`header__nav ${isMenuOpen ? 'header__nav--active' : ''}`}>
        <ul className="header__menu">
          <li className="header__item"><Link to="/" onClick={closeMenu}>Inicio</Link></li>
          <li className="header__item"><Link to="/hombres" onClick={closeMenu}>Hombres</Link></li>
          <li className="header__item"><Link to="/mujeres" onClick={closeMenu}>Mujeres</Link></li>
          <li className="header__item"><Link to="/gorras" onClick={closeMenu}>Gorras</Link></li>
        </ul>
      </nav>
      
      {/* Actions */}
      <div className="header__actions">

        {/* Search - Nueva implementación */}
        <div ref={searchRef} className="header__search-wrapper">
          <button className="header__search-btn" onClick={toggleSearch}>
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>

          {/* Search Dropdown */}
          {isSearchOpen && (
            <div className="header__search-dropdown">
              <div className="header__search-input-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="Buscar marca, modelo, color..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    className="header__search-clear"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="header__search-results">
                {searchQuery.trim() === '' ? (
                  <div className="header__search-empty">
                    <p>Escribe para buscar productos</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="header__search-empty">
                    <p>No se encontraron resultados para "{searchQuery}"</p>
                  </div>
                ) : (
                  <>
                    <div className="header__search-items">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          className="header__search-item"
                          onClick={() => handleProductClick(product)}
                        >
                          <div className="search-item__image">
                            {product.image ? (
                              <img src={product.image} alt={product.model} onError={(e) => e.target.style.display = 'none'} />
                            ) : (
                              <span>👟</span>
                            )}
                          </div>
                          <div className="search-item__info">
                            <p className="search-item__brand">{product.brand}</p>
                            <p className="search-item__model">{product.model}</p>
                            <div className="search-item__meta">
                              <span className="search-item__price">${product.price}</span>
                              <span className="search-item__category">
                                {getCategoryLabel(product.category)}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {searchResults.length > 0 && (
                      <div className="header__search-footer">
                        <p className="search-footer__text">
                          Mostrando {searchResults.length} de {allProducts.length} productos
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <Link to="/login" className="header__user-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>
        
        {/* Cart */}
        <button className="header__cart-btn" onClick={toggleCartHandler}>
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {getTotalItems() > 0 && (
            <span className="header__cart-badge">{getTotalItems()}</span>
          )}
        </button>

        {/* Mobile Menu */}
        <button 
          className={`header__hamburger ${isMenuOpen ? 'header__hamburger--active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Cart Panel */}
      <CartPanel />

      {/* Overlay */}
      {(isMenuOpen || isCartOpen || isSearchOpen) && (
        <div className="header__overlay" onClick={() => { setIsMenuOpen(false); closeCartPanel(); closeSearch(); }}></div>
      )}
    </header>
  );
};

/* CART PANEL */
const CartPanel = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    getTotalPrice,
    clearCart
  } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const phoneNumber = "5219611567875";
    
    let message = `Hola, quiero realizar la siguiente compra:`;

    cartItems.forEach(item => {
      message += `%0A• *${item.productName}*`;
      if (item.color) message += `%0A  Color: ${item.color}`;
      message += `%0A  Talla: ${item.selectedSize}`;
      message += `%0A  Cantidad: ${item.quantity}`;
      message += `%0A  Precio: $${item.price}`;
    });

    message += `%0A%0A*Total: $${getTotalPrice().toFixed(2)}*`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className={`header__cart-panel ${isCartOpen ? 'header__cart-panel--active' : ''}`}>
      <div className="header__cart-header">
        <h2>Carrito ({cartItems.length})</h2>
        <button className="header__cart-close" onClick={closeCart}>
          ✖
        </button>
      </div>
      
      <div className="header__cart-content">
        {cartItems.length === 0 ? (
          <div className="header__cart-empty">
            🛒 <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem 
                key={`${item.id}-${item.selectedSize}`}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
            <button className="header__cart-clear" onClick={clearCart}>Vaciar carrito</button>
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="header__cart-footer">
          <div className="header__cart-total">
            <span>Total:</span>
            <span className="header__cart-total-amount">${getTotalPrice().toFixed(2)}</span>
          </div>
          <button className="header__cart-checkout" onClick={handleCheckout}>
            Finalizar por WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

/* CART ITEM */
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const [imageError, setImageError] = useState(false);

  const handleDecrease = () => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1);
  const handleIncrease = () => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1);
  const handleRemove = () => onRemove(item.id, item.selectedSize);
  const handleImageError = () => setImageError(true);

  const hasValidImage = item.image && !imageError;

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        {hasValidImage ? (
          <img src={item.image} alt={item.name} className="cart-item__img" onError={handleImageError} loading="lazy" />
        ) : (
          <div className="cart-item__placeholder">👟</div>
        )}
      </div>
      
      <div className="cart-item__info">
        <h4 className="cart-item__name">{item.productName}</h4>
        <p className="cart-item__details">
          {item.color && <span>Color: {item.color}</span>}
          {item.selectedSize && <span> | Talla: {item.selectedSize}</span>}
        </p>
        <p className="cart-item__price">${item.price}</p>
        
        <div className="cart-item__quantity">
          <button className="quantity-btn" onClick={handleDecrease}>−</button>
          <span className="quantity-value">{item.quantity}</span>
          <button className="quantity-btn" onClick={handleIncrease}>+</button>
        </div>
      </div>

      <button className="cart-item__remove" onClick={handleRemove}>✖</button>
    </div>
  );
};

export default Header;