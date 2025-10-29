// src/App.jsx

// 1. Importa los componentes de React Router
import { Routes, Route } from 'react-router-dom';
// 2. Importa el componente Header (ya lo tenías)
import Header from './components/layout/Header/Header.jsx'; 
import Footer from './components/layout/Footer/Footer.jsx'; 

// 3. Importa las nuevas páginas
import Home from './pages/Home.jsx'; // Asume que creaste src/pages/Home.jsx
import Products from './pages/Products.jsx'; // Asume que creaste src/pages/Products.jsx
import Contact from './pages/Contact.jsx'; // Asume que creaste src/pages/Contact.jsx


function App() {
  return (
    <div className="app-container"> 
      
      {/* El Header es un elemento de Layout que se muestra en todas las rutas */}
      <Header /> 
      
      {/* 4. Define el área donde se mostrarán los componentes de la ruta */}
      <main className="main-content">
        <Routes>
          {/* Define cada ruta (path) y su componente asociado (element) */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/contacto" element={<Contact />} />
          
          {/* Opcional: Ruta para manejar URLs no encontradas (404) */}
          <Route path="*" element={<h1>404 | Página No Encontrada</h1>} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
