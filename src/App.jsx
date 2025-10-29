// src/App.jsx

// 1. Importa el componente Header desde su nueva ubicación
import Header from './components/layout/Header/Header.jsx'; 
// Importa el Footer si ya lo creaste
// import Footer from './components/layout/Footer/Footer.jsx'; 

function App() {
  return (
    // 2. Usamos una etiqueta semántica o un Fragmento (<>...</>) como contenedor
    <div className="app-container"> 
      
      {/* 3. Colocamos el Header. Estará fijo en todas las "páginas" */}
      <Header /> 
      
      {/*
        4. Aquí irá el contenido que cambiará según la ruta (Páginas)
        Por ahora, pon un texto simple. Luego lo reemplazaremos con React Router.
      */}
      <main className="main-content">
        <h1>¡Bienvenido a DUKICKS E-commerce!</h1>
        <p>Este contenido cambiará.</p>
      </main>
      
      {/* 5. Si ya tienes el Footer, lo incluyes aquí */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
