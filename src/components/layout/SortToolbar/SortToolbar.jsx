import React from 'react';
import './SortToolbar.css';

const SortToolbar = ({ 
  sortBy, 
  onSortChange, 
  productCount,
  sortOptions = [
    { value: 'precio-asc', label: 'Precio: menor a mayor' },
    { value: 'precio-desc', label: 'Precio: mayor a menor' },
    { value: 'nombre', label: 'Modelo' },
    { value: 'destacado', label: 'Destacados' }
  ],
  showCount = true
}) => {
  return (
    <div className="sort-toolbar">
      {showCount && productCount !== undefined && (
        <div className="products-count">
          {productCount} {productCount === 1 ? 'producto' : 'productos'}
        </div>
      )}
      
      <div className="sort-controls">
        <label htmlFor="sort-select" className="sort-label">
          Ordenar por:
        </label>
        <select 
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortToolbar;