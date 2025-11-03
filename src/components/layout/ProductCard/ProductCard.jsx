import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ 
  product,
  category = 'tenis-hombre',
  showSizes = true,
  sizeType = 'US',
  addButtonText = 'Agregar'
}) => {

  // Nombre que se muestra en la tarjeta: SOLO name + model (sin brand)
  const getDisplayName = () => {
    const name = product.name || '';
    const model = product.model || '';
    return `${name} ${model}`.trim();
  };

  // Nombre que se envía al carrito: si product.productName existe úsalo (puede incluir brand),
  // si no, construye brand + name + model (para tener marca en el carrito)
  const getCartProductName = () => {
    if (product.productName) return product.productName;
    const brand = product.brand || '';
    const name = product.name || '';
    const model = product.model || '';
    return `${brand} ${name} ${model}`.trim();
  };

  const getDefaultSize = () => {
    if (!showSizes || !product.sizes) return null;
    
    switch(category) {
      case 'gorras':
        return 'Única';
      case 'playeras-unisex':
        return product.sizes.includes('M') ? 'M' : product.sizes[0];
      case 'tenis-mujer':
        return product.sizes.includes(7) ? 7 : product.sizes[0];
      case 'tenis-hombre':
      default:
        return product.sizes.includes(9) ? 9 : product.sizes[0];
    }
  };

  const [selectedSize, setSelectedSize] = useState(getDefaultSize());
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const { addToCart, openCart } = useCart();

  const getSizeLabel = () => {
    switch(category) {
      case 'gorras':
      case 'playeras-unisex':
        return 'Talla:';
      default:
        return 'Talla (US):';
    }
  };

  const getCategoryIcon = () => {
    switch(category) {
      case 'gorras': return '🧢';
      case 'playeras-unisex': return '👕';
      case 'tenis-mujer':
      case 'tenis-hombre':
      default:
        return '👟';
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.id}-${selectedSize || 'unique'}`,
      productName: getCartProductName(), // nombre con marca para el carrito
      brand: product.brand,
      name: product.name,
      model: product.model,
      price: product.price,
      image: product.image,
      color: product.color,
      selectedSize: selectedSize,
      category: category,
      quantity: 1
    };

    addToCart(cartItem);
    openCart();
  };

  const handleImageLoad = () => setImageLoading(false);
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const hasValidImage = !!product.image && !imageError;
  const displayName = getDisplayName();

  return (
    <div className={`productCard productCard--${category}`}>
      
      <div className="productBadges">
        {product.nuevo && <span className="productBadge badgeNew">NUEVO</span>}
        {product.destacado && <span className="productBadge badgeFeatured">DESTACADO</span>}
        {product.oferta && <span className="productBadge badgeSale">OFERTA</span>}
      </div>

      <div className="productImage">
        {imageLoading && hasValidImage && <div className="productLoading">Cargando...</div>}

        {hasValidImage ? (
          <img 
            src={product.image} 
            alt={`${product.brand ? product.brand + ' ' : ''}${displayName}`}
            className="productImg"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        ) : (
          <div className="productPlaceholder">
            <span className="productIcon">{getCategoryIcon()}</span>
          </div>
        )}
      </div>

      <div className="productInfo">
        {/* Marca arriba */}
        <h3 className="productBrand">{product.brand?.toUpperCase()}</h3>

        {/* Nombre (solo name + model) — evita duplicar la marca */}
        <p className="productName">{displayName}</p>

        {product.colors && product.colors.length > 0 && (
          <div className="productColors">
            <span className="colorsLabel">Colores: {product.colors.length}</span>
          </div>
        )}

        {showSizes && product.sizes && product.sizes.length > 0 && (
          <div className="productSizes">
            <label className="sizeLabel">{getSizeLabel()}</label>
            <div className="sizeOptions">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`sizeBtn ${selectedSize === size ? 'sizeBtnActive' : ''} ${
                    category.includes('tenis') ? 'sizeBtn--shoes' : 'sizeBtn--clothing'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="productPricing">
          {product.originalPrice ? (
            <>
              <span className="productOriginalPrice">${product.originalPrice}</span>
              <span className="productPrice">${product.price}</span>
              <span className="productDiscount">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            </>
          ) : (
            <span className="productPrice">${product.price}</span>
          )}
        </div>

        <div className="productFooter">
          <button 
            className="productAddBtn"
            onClick={handleAddToCart}
            disabled={showSizes && !selectedSize}
            aria-label={`Agregar ${product.brand ? product.brand + ' ' : ''}${displayName} al carrito`}
          >
            {addButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
