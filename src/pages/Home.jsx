// crybaby607/dukicks/Dukicks-02871def4a2b7b421d5ec761a6508296e17ed3d8/src/pages/Home.jsx
// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-content home-page">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section" style={{textAlign: 'center', padding: '60px 20px', backgroundColor: '#111', borderRadius: '8px', marginBottom: '40px'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '10px'}}>DUKICKS: El Próximo Nivel en Estilo Callejero</h1>
        <p style={{fontSize: '1.2rem', color: '#ccc'}}>
          Descubre nuestra exclusiva selección de zapatillas y accesorios. ¡Diseño, comodidad y autenticidad en cada paso!
        </p>
        {/* Usamos Link para navegar a la sección principal de productos */}
        <Link to="/coleccion" style={{display: 'inline-block', padding: '12px 25px', backgroundColor: 'white', color: 'black', textDecoration: 'none', borderRadius: '4px', fontWeight: '500', marginTop: '20px', transition: 'background-color 0.2s'}}>
          Ver Toda la Colección
        </Link>
      </section>

      {/* 2. SECCIÓN DESTACADOS / CAMPAÑA */}
      <section className="featured-campaign" style={{marginBottom: '40px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '10px'}}>Lanzamiento Exclusivo - Edición Limitada</h2>
        <div style={{display: 'flex', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap'}}>
          <div style={{flex: '1', minWidth: '300px', backgroundColor: '#333', padding: '30px', borderRadius: '4px', textAlign: 'center'}}>
            <h3>The Midnight Runner</h3>
            <p>Máximo rendimiento y diseño en color oscuro.</p>
            <Link to="/coleccion" style={{color: '#fff', textDecoration: 'underline'}}>Descúbrelo</Link>
          </div>
          <div style={{flex: '1', minWidth: '300px', backgroundColor: '#333', padding: '30px', borderRadius: '4px', textAlign: 'center'}}>
            <h3>Summer Cap Collection</h3>
            <p>Las gorras que definirán tu estilo este verano.</p>
            <Link to="/gorras" style={{color: '#fff', textDecoration: 'underline'}}>Comprar Gorras</Link>
          </div>
        </div>
      </section>

      {/* 3. NAVEGACIÓN POR CATEGORÍAS */}
      <section className="category-navigation">
        <h2 style={{textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '10px'}}>Comprar por Categoría</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
          <Link to="/hombres" style={{padding: '40px 20px', backgroundColor: '#444', color: 'white', textDecoration: 'none', textAlign: 'center', borderRadius: '4px', transition: 'background-color 0.3s'}}>
            <h3>HOMBRES</h3>
            <p>Zapatillas | Lifestyle</p>
          </Link>
          <Link to="/mujeres" style={{padding: '40px 20px', backgroundColor: '#444', color: 'white', textDecoration: 'none', textAlign: 'center', borderRadius: '4px', transition: 'background-color 0.3s'}}>
            <h3>MUJERES</h3>
            <p>Zapatillas | Tendencias</p>
          </Link>
          <Link to="/gorras" style={{padding: '40px 20px', backgroundColor: '#444', color: 'white', textDecoration: 'none', textAlign: 'center', borderRadius: '4px', transition: 'background-color 0.3s'}}>
            <h3>GORRAS</h3>
            <p>Colección de Headwear</p>
          </Link>
          <Link to="/coleccion" style={{padding: '40px 20px', backgroundColor: '#444', color: 'white', textDecoration: 'none', textAlign: 'center', borderRadius: '4px', transition: 'background-color 0.3s'}}>
            <h3>COLECCIÓN</h3>
            <p>Ver Todo el Catálogo</p>
          </Link>
        </div>
      </section>
      
    </div>
  );
};

export default Home;