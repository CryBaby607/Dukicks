import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useProducts } from '../../../hooks/useProducts';
import { PRODUCT_CONFIG } from '../../../config/productsConfig';


const ProductPage = ({ category }) => {
  const products = useProducts(category);
  const config = PRODUCT_CONFIG[category] || {};

  // Usamos las clases CSS originales para mantener el diseño
  const pageClass = `${category}-page`;
  const contentClass = `${category}-content`;
  const mainClass = `${category}-main`;
  const gridClass = `${category}-grid`;

  return (
    <div className={pageClass}>
      <div className={contentClass}>
        <main className={mainClass}>
          <div className={gridClass}>
            {products.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                category={category}
                showSizes={config.showSizes}
                sizeType={config.sizeType}
                addButtonText={config.addButtonText}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;