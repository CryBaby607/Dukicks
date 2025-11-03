import React, { useState, useRef, useEffect } from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ 
  label, 
  options, 
  selectedValues, 
  onSelectionChange, 
  type = 'checkbox',
  showCount = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionToggle = (value) => {
    if (type === 'checkbox') {
      const newSelection = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      onSelectionChange(newSelection);
    } else {
      onSelectionChange([value]);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onSelectionChange([]);
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-dropdown-btn"
        onClick={handleToggle}
      >
        <span>{label}</span>
        <svg 
          className={`filter-chevron ${isOpen ? 'open' : ''}`} 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <div className="filter-dropdown-menu">
          <div className="filter-dropdown-header">
            <span className="filter-title">{label}</span>
            {selectedValues.length > 0 && (
              <button 
                className="filter-clear-btn"
                onClick={handleClear}
              >
                Limpiar
              </button>
            )}
          </div>
          
          <div className="filter-options-list">
            {options.map(option => (
              <label key={option.value} className="filter-option-item">
                <input
                  type={type}
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleOptionToggle(option.value)}
                  className="filter-option-checkbox"
                />
                <span className="filter-option-label">{option.label}</span>
                {showCount && option.count && (
                  <span className="filter-option-count">({option.count})</span>
                )}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;