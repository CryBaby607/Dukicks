import { gorrasData } from '../data/products/gorrasData';
import { hombresData } from '../data/products/hombresData';
import { mujeresData } from '../data/products/mujeresData';

export const useProducts = (category) => {
  const products = {
    'gorras': gorrasData,
    'hombres': hombresData,
    'mujeres': mujeresData,
    'tenis-hombre': hombresData,
    'tenis-mujer': mujeresData
  };
  
  return products[category] || [];
};