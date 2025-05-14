import React from 'react';  // Importa la librería React, necesaria para crear componentes
import ReactDOM from 'react-dom/client';  // Importa el módulo para renderizar la app en el DOM
import App from '@/App';  // Importa el componente principal "App" usando alias @ que apunta a src/App.jsx
import '@/index.css';  // Importa los estilos CSS globales desde src/index.css

// Aquí se crea el "root" donde React montará la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  {/* React.StrictMode ayuda a detectar problemas en desarrollo */}
    <App />  {/* Renderiza el componente App dentro del elemento root */}
  </React.StrictMode>
);
