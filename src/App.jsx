// src/App.jsx

// 1. Importa los componentes de React Router
import { Routes, Route } from 'react-router-dom';
// 2. Importa el componente Header (ya lo tenías)
import Header from './components/layout/Header/Header.jsx'; 
import Footer from './components/layout/Footer/Footer.jsx'; 

// 3. Importa las nuevas páginas
import Home from './pages/Home.jsx'; 
import Gorras from './pages/Gorras.jsx'; // <--- NUEVA PÁGINA
import Hombres from './pages/Hombres.jsx'; // <--- NUEVA PÁGINA
import Mujeres from './pages/Mujeres.jsx'; // <--- NUEVA PÁGINA
import Coleccion from './pages/Coleccion.jsx'; // <--- NUEVA PÁGINA


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
          <Route path="/gorras" element={<Gorras />} /> 
          <Route path="/hombres" element={<Hombres />} />
          <Route path="/mujeres" element={<Mujeres />} />
          <Route path="/coleccion" element={<Coleccion />} />
          
          {/* Opcional: Ruta para manejar URLs no encontradas (404) */}
          <Route path="*" element={<h1>404 | Página No Encontrada</h1>} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;