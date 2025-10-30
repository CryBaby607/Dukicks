// src/components/layout/Header/Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isCartOpen) setIsCartOpen(false); // Cerrar carrito si está abierto
    if (isSearchOpen) setIsSearchOpen(false); // Cerrar búsqueda si está abierta
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isMenuOpen) setIsMenuOpen(false); // Cerrar menú si está abierto
    if (isSearchOpen) setIsSearchOpen(false); // Cerrar búsqueda si está abierta
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false); // Cerrar menú si está abierto
    if (isCartOpen) setIsCartOpen(false); // Cerrar carrito si está abierto
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
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
        
        {/* Carrito */}
        <button className="header__cart-btn" onClick={toggleCart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
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
      <div className={`header__cart-panel ${isCartOpen ? 'header__cart-panel--active' : ''}`}>
        <div className="header__cart-header">
          <h2>Carrito de Compras</h2>
          <button className="header__cart-close" onClick={closeCart}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="header__cart-content">
          {/* Aquí irá el contenido del carrito */}
          <p className="header__cart-empty">Tu carrito está vacío</p>
        </div>

        <div className="header__cart-footer">
          <div className="header__cart-total">
            <span>Total:</span>
            <span className="header__cart-total-amount">$0.00</span>
          </div>
          <button className="header__cart-checkout">Proceder al Pago</button>
        </div>
      </div>

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
          closeCart();
          closeSearch();
        }}></div>
      )}
    </header>
  );
};

export default Header;