// src/components/layout/Header/Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { 
    isCartOpen, 
    toggleCart, 
    closeCart: closeCartPanel,
    getTotalItems 
  } = useCart();

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <header className="header">
      
      {/* Logo minimalista */}
      <Link to="/" className="header__logo">DUKICKS</Link>
      
      {/* Navegación actualizada */}
      <nav className={`header__nav ${isMenuOpen ? 'header__nav--active' : ''}`}>
        <ul className="header__menu">
          <li className="header__item">
            <Link to="/" onClick={closeMenu}>Inicio</Link>
          </li>
          <li className="header__item">
            <Link to="/gorras" onClick={closeMenu}>Gorras</Link>
          </li>
          <li className="header__item">
            <Link to="/hombres" onClick={closeMenu}>Hombres</Link>
          </li>
          <li className="header__item">
            <Link to="/mujeres" onClick={closeMenu}>Mujeres</Link>
          </li>
          <li className="header__item">
            <Link to="/coleccion" onClick={closeMenu}>Nuestra Colección</Link>
          </li>
        </ul>
      </nav>
      
      {/* Acciones con iconos SVG blancos */}
      <div className="header__actions">
        {/* Búsqueda */}
        <button className="header__search-btn" onClick={toggleSearch}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>

        {/* Usuario */}
        <Link to="/login" className="header__user-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>
        
        {/* Carrito con badge */}
        <button className="header__cart-btn" onClick={toggleCartHandler}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {getTotalItems() > 0 && (
            <span className="header__cart-badge">{getTotalItems()}</span>
          )}
        </button>

        {/* Botón menú hamburguesa para móvil */}
        <button 
          className={`header__hamburger ${isMenuOpen ? 'header__hamburger--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Panel lateral del carrito */}
      <CartPanel />

      {/* Barra de búsqueda desplegable */}
      <div className={`header__search-bar ${isSearchOpen ? 'header__search-bar--active' : ''}`}>
        <div className="header__search-container">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="header__search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input 
            type="text" 
            className="header__search-input" 
            placeholder="Buscar productos..."
            autoFocus
          />
          <button className="header__search-close" onClick={closeSearch}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay para cerrar menú o carrito al hacer click fuera */}
      {(isMenuOpen || isCartOpen || isSearchOpen) && (
        <div className="header__overlay" onClick={() => {
          closeMenu();
          closeCartPanel();
          closeSearch();
        }}></div>
      )}
    </header>
  );
};

// ===== COMPONENTE DEL PANEL DEL CARRITO =====
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
    
    alert('Procesando pago... (Esta funcionalidad se implementará próximamente)');
  };

  return (
    <div className={`header__cart-panel ${isCartOpen ? 'header__cart-panel--active' : ''}`}>
      <div className="header__cart-header">
        <h2>Carrito ({cartItems.length})</h2>
        <button className="header__cart-close" onClick={closeCart}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div className="header__cart-content">
        {cartItems.length === 0 ? (
          <div className="header__cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p>Tu carrito está vacío</p>
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
            
            {/* Botón para limpiar carrito */}
            <button className="header__cart-clear" onClick={clearCart}>
              Vaciar carrito
            </button>
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="header__cart-footer">
          <div className="header__cart-total">
            <span>Total:</span>
            <span className="header__cart-total-amount">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
          <button className="header__cart-checkout" onClick={handleCheckout}>
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
};

// ===== COMPONENTE DE ITEM DEL CARRITO =====
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const [imageError, setImageError] = useState(false);

  const handleDecrease = () => {
    onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1);
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1);
  };

  const handleRemove = () => {
    onRemove(item.id, item.selectedSize);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Verificar si la imagen es válida
  const hasValidImage = item.image && !imageError;

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        {hasValidImage ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="cart-item__img"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="cart-item__placeholder">
            <span className="cart-item__placeholder-icon">🧢</span>
          </div>
        )}
      </div>
      
      <div className="cart-item__info">
        <h4 className="cart-item__name">{item.name}</h4>
        <p className="cart-item__details">
          {item.color && <span>Color: {item.color}</span>}
          {item.selectedSize && <span> | Talla: {item.selectedSize}</span>}
        </p>
        <p className="cart-item__price">${item.price}</p>
        
        <div className="cart-item__quantity">
          <button 
            className="quantity-btn" 
            onClick={handleDecrease}
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button 
            className="quantity-btn" 
            onClick={handleIncrease}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      <button 
        className="cart-item__remove" 
        onClick={handleRemove}
        aria-label="Eliminar producto"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default Header;