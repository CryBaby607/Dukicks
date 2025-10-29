// src/components/layout/Header/Header.jsx

import React from 'react';
import './Header.css'; // Importa tus estilos

const Header = () => {
  return (
    <header className="header"> 
      <div className="header__logo">DUKICKS</div>
      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__item">Inicio</li>
          <li className="header__item">Productos</li>
          <li className="header__item">Contacto</li>
        </ul>
      </nav>
      <div className="header__actions">
        {/* Aquí irá el ícono del carrito, usuario, etc. */}
        <button className="header__cart-btn">🛒 (0)</button>
      </div>
    </header>
  );
};

export default Header;