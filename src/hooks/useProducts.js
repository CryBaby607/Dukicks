import { useState, useEffect } from 'react';
import { gorrasData } from '../data/products/gorrasData';
import { hombresData } from '../data/products/hombresData';
import { mujeresData } from '../data/products/mujeresData';

export const useProducts = (category) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Intentar cargar productos desde localStorage
    const savedProducts = localStorage.getItem('dukicks_all_products');
    
    let allProducts = [];
    
    if (savedProducts) {
      try {
        allProducts = JSON.parse(savedProducts);
      } catch (error) {
        console.error('Error al cargar productos guardados:', error);
        // Si hay error, usar datos por defecto
        allProducts = [...gorrasData, ...hombresData, ...mujeresData];
      }
    } else {
      // Si no hay datos guardados, usar datos por defecto
      allProducts = [...gorrasData, ...hombresData, ...mujeresData];
    }

    // Filtrar por categoría
    const categoryMap = {
      'gorras': 'gorras',
      'hombres': 'tenis-hombre',
      'mujeres': 'tenis-mujer',
      'tenis-hombre': 'tenis-hombre',
      'tenis-mujer': 'tenis-mujer'
    };

    const targetCategory = categoryMap[category] || category;
    const filteredProducts = allProducts.filter(p => p.category === targetCategory);
    
    setProducts(filteredProducts);
  }, [category]);

  return products;
};