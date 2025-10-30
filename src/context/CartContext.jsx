// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('dukicks_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('dukicks_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Verificar si el producto ya existe en el carrito
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItemIndex > -1) {
        // Si existe, incrementar cantidad
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    // Mostrar notificación (opcional)
    console.log('Producto agregado al carrito:', product.name);
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId, size) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === productId && item.selectedSize === size))
    );
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Limpiar todo el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calcular precio total
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Obtener cantidad de un producto específico
  const getProductQuantity = (productId, size) => {
    const item = cartItems.find(
      item => item.id === productId && item.selectedSize === size
    );
    return item ? item.quantity : 0;
  };

  // Verificar si un producto está en el carrito
  const isInCart = (productId, size) => {
    return cartItems.some(
      item => item.id === productId && item.selectedSize === size
    );
  };

  // Abrir/cerrar carrito
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getProductQuantity,
    isInCart,
    toggleCart,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};