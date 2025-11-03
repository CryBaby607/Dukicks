// src/App.jsx

// 1. Importa los componentes de React Router
import { Routes, Route, useLocation } from 'react-router-dom';
// 2. Importa el componente Header y Footer
import Header from './components/layout/Header/Header.jsx'; 
import Footer from './components/layout/Footer/Footer.jsx'; 

// 3. Importa las páginas
import Home from './pages/Home.jsx'; 
import Gorras from './pages/Gorras.jsx';
import Hombres from './pages/Hombres.jsx';
import Mujeres from './pages/Mujeres.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';


function App() {
  const location = useLocation();
  
  // Rutas que NO deben mostrar Header y Footer
  const noLayoutRoutes = ['/login', '/dashboard'];
  const showLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <div className="app-container"> 
      
      {/* Mostrar Header solo si NO estamos en login o dashboard */}
      {showLayout && <Header />}
      
      {/* Área de contenido con clase condicional */}
      <main className={`main-content ${showLayout ? 'with-header' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gorras" element={<Gorras />} /> 
          <Route path="/hombres" element={<Hombres />} />
          <Route path="/mujeres" element={<Mujeres />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Ruta 404 */}
          <Route path="*" element={<h1>404 | Página No Encontrada</h1>} />
        </Routes>
      </main>
      
      {/* Mostrar Footer solo si NO estamos en login o dashboard */}
      {showLayout && <Footer />}
    </div>
  );
}

export default App;