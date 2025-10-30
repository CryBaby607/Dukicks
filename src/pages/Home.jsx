// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      
      {/* HERO SECTION */}
      <HeroSection />

      {/* PRODUCTOS DESTACADOS */}
      <FeaturedProducts />

      {/* CATEGORÍAS */}
      <Categories />

      {/* CARACTERÍSTICAS */}
      <Features />

      {/* NEWSLETTER */}
      <Newsletter />

    </div>
  );
};

// ===== HERO SECTION COMPONENT =====
const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-pattern"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          EL PRÓXIMO NIVEL<br/>EN ESTILO
        </h1>
        <p className="hero-subtitle">
          Descubre nuestra exclusiva selección de zapatillas y accesorios.<br/>
          Diseño, comodidad y autenticidad en cada paso.
        </p>
        <div className="hero-buttons">
          <Link to="/coleccion" className="btn btn-primary">
            VER COLECCIÓN
          </Link>
          <Link to="/hombres" className="btn btn-secondary">
            EXPLORAR
          </Link>
        </div>
      </div>
    </section>
  );
};

// ===== FEATURED PRODUCTS COMPONENT =====
const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title: 'MIDNIGHT RUNNER',
      subtitle: 'Performance Edition',
      price: '$189',
      tag: 'NUEVO',
      icon: '👟',
      link: '/coleccion'
    },
    {
      id: 2,
      title: 'URBAN CLASSIC',
      subtitle: 'Lifestyle Collection',
      price: '$159',
      tag: 'POPULAR',
      icon: '👟',
      link: '/hombres'
    },
    {
      id: 3,
      title: 'SUMMER CAP',
      subtitle: 'Headwear Series',
      price: '$49',
      tag: 'TRENDING',
      icon: '🧢',
      link: '/gorras'
    }
  ];

  return (
    <section className="featured">
      <div className="section-header">
        <h2 className="section-title">EDICIÓN LIMITADA</h2>
        <div className="section-divider"></div>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

// ===== PRODUCT CARD COMPONENT =====
const ProductCard = ({ title, subtitle, price, tag, icon, link }) => {
  return (
    <Link to={link} className="product-card">
      <div className="product-tag">{tag}</div>
      <div className="product-icon">{icon}</div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-subtitle">{subtitle}</p>
        <div className="product-price">{price}</div>
      </div>
    </Link>
  );
};

// ===== CATEGORIES COMPONENT =====
const Categories = () => {
  const categories = [
    {
      id: 1,
      title: 'HOMBRES',
      subtitle: 'Zapatillas | Lifestyle',
      link: '/hombres'
    },
    {
      id: 2,
      title: 'MUJERES',
      subtitle: 'Zapatillas | Tendencias',
      link: '/mujeres'
    },
    {
      id: 3,
      title: 'GORRAS',
      subtitle: 'Headwear Collection',
      link: '/gorras'
    },
    {
      id: 4,
      title: 'COLECCIÓN',
      subtitle: 'Ver Todo',
      link: '/coleccion'
    }
  ];

  return (
    <section className="categories">
      <div className="categories-grid">
        {categories.map(category => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </section>
  );
};

// ===== CATEGORY CARD COMPONENT =====
const CategoryCard = ({ title, subtitle, link }) => {
  return (
    <Link to={link} className="category-card">
      <h3 className="category-title">{title}</h3>
      <p className="category-subtitle">{subtitle}</p>
    </Link>
  );
};

// ===== FEATURES COMPONENT =====
const Features = () => {
  const features = [
    {
      id: 1,
      icon: '🚚',
      title: 'ENVÍO GRATIS',
      description: 'En compras mayores a $500'
    },
    {
      id: 2,
      icon: '↩️',
      title: 'DEVOLUCIONES',
      description: '30 días para cambios'
    },
    {
      id: 3,
      icon: '✓',
      title: 'GARANTÍA',
      description: 'Productos 100% originales'
    },
  ];

  return (
    <section className="features">
      <div className="features-grid">
        {features.map(feature => (
          <FeatureItem key={feature.id} {...feature} />
        ))}
      </div>
    </section>
  );
};

// ===== FEATURE ITEM COMPONENT =====
const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="feature-item">
      <div className="feature-icon">{icon}</div>
      <h4 className="feature-title">{title}</h4>
      <p className="feature-desc">{description}</p>
    </div>
  );
};

// ===== NEWSLETTER COMPONENT =====
const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log('Email submitted:', email);
    // Aquí agregarías la lógica para suscribirse
    alert('¡Gracias por suscribirte!');
    e.target.reset();
  };

  return (
    <section className="newsletter">
      <h2 className="newsletter-title">ÚNETE AL CLUB DUKICKS</h2>
      <p className="newsletter-subtitle">
        Recibe acceso anticipado a lanzamientos exclusivos y ofertas especiales
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="newsletter-input"
          placeholder="tu@email.com"
          required
        />
        <button type="submit" className="newsletter-button">
          SUSCRIBIRSE
        </button>
      </form>
    </section>
  );
};

export default Home;