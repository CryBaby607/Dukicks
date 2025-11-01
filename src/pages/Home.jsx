// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <ExclusiveProducts />
      <Categories />
      <Features />
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
        </div>
      </div>
    </section>
  );
};

// ===== SECCIÓN: PRODUCTOS EXCLUSIVOS  =====
const ExclusiveProducts = () => {
  const exclusiveProducts = [
    {
      id: 1,
      model: 'NIKE AIR MAG',
      brand: 'NIKE',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 2,
      model: 'RED OCTOBER',
      brand: 'NIKE',
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80',
    },
    {
      id: 3,
      model: 'AIR YEEZY 2',
      brand: 'NIKE',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    },
    {
      id: 4,
      model: 'DUNK SB',
      brand: 'NIKE',
      image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80',
    }
  ];

  return (
    <section className="exclusive-section">
      <div className="section-header">
        <h2 className="section-title">EDICIONES EXCLUSIVAS</h2>
      </div>
      
      <div className="exclusive-grid">
        {exclusiveProducts.map((product) => (
          <ExclusiveCard 
            key={product.id}
            {...product} 
          />
        ))}
      </div>
    </section>
  );
};

// ===== EXCLUSIVE CARD COMPONENT =====
const ExclusiveCard = ({ model, brand, image }) => {
  return (
    <div className="exclusive-card">
      <div className="exclusive-image">
        <img src={image} alt={`${brand} ${model}`} />
      </div>
      <div className="exclusive-info">
        <h3 className="exclusive-model">{model}</h3>
        <p className="exclusive-brand">{brand}</p>
      </div>
    </div>
  );
};

// ===== CATEGORIES COMPONENT =====
const Categories = () => {
  const categories = [
    {
      id: 1,
      title: 'HOMBRES',
      subtitle: 'Zapatillas | Lifestyle',
      link: '/hombres',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      title: 'MUJERES',
      subtitle: 'Zapatillas | Tendencias',
      link: '/mujeres',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      title: 'GORRAS',
      subtitle: 'Headwear Collection',
      link: '/gorras',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      title: 'COLECCIÓN',
      subtitle: 'Ver Todo',
      link: '/coleccion',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  return (
    <section className="categories">
      <div className="categories-container">
        <div className="categories-header">
          <h2 className="categories-title">EXPLORA CATEGORÍAS</h2>
          <p className="categories-subtitle">Encuentra tu estilo perfecto</p>
        </div>
        <div className="categories-grid">
          {categories.map(category => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== CATEGORY CARD COMPONENT =====
const CategoryCard = ({ title, subtitle, link, gradient }) => {
  return (
    <Link to={link} className="category-card">
      <div 
        className="category-background"
        style={{ background: gradient }}
      ></div>
      <div className="category-content">
        <h3 className="category-title">{title}</h3>
        <p className="category-subtitle">{subtitle}</p>
        <div className="category-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </Link>
  );
};

const Features = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/>
          <path d="M12 15l3-3m0 0l3 3m-3-3v8"/>
        </svg>
      ),
      title: 'ENVÍO GRATIS',
      description: 'En compras mayores a $500'
    },
    {
      id: 2,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/>
          <path d="M9 15l3 3 6-6"/>
        </svg>
      ),
      title: 'DEVOLUCIONES',
      description: '30 días para cambios'
    },
    {
      id: 3,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'GARANTÍA',
      description: 'Productos 100% originales'
    },
  ];

  return (
    <section className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">BENEFICIOS EXCLUSIVOS</h2>
          <p className="features-subtitle">Tu satisfacción es nuestra prioridad</p>
        </div>
        <div className="features-grid">
          {features.map(feature => (
            <FeatureItem key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

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