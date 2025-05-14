import React from 'react';  // Importa React para poder usar JSX y componentes
import Header from '@/components/Header';  // Importa el componente Header
import Hero from '@/components/Hero';  // Importa el componente Hero (sección principal)
import AboutUs from '@/components/AboutUs';  // Importa sección Sobre Nosotros
import Services from '@/components/Services';  // Importa sección de Servicios
import Products from '@/components/Products';  // Importa sección de Productos
import Testimonials from '@/components/Testimonials';  // Importa sección de Testimonios
import ContactForm from '@/components/ContactForm';  // Importa formulario de contacto
import Footer from '@/components/Footer';  // Importa el pie de página
import { Toaster } from '@/components/ui/toaster';  // Importa componente para notificaciones tipo "toast"
import { motion, AnimatePresence } from 'framer-motion';  // Importa animaciones de framer-motion

function App() {
  return (
    // AnimatePresence permite animar la entrada y salida de componentes hijos
    <AnimatePresence>
      <div className="flex flex-col min-h-screen bg-background"> {/* Contenedor principal con flex column y altura mínima de pantalla */}
        <Header /> {/* Barra o cabecera del sitio */}
        <main className="flex-grow"> {/* Contenedor principal que crece para llenar el espacio */}
          <Hero /> {/* Sección principal con imagen o mensaje destacado */}
          <AboutUs /> {/* Sección sobre la empresa o equipo */}
          <Services /> {/* Servicios que ofrece la empresa */}
          <Products /> {/* Productos disponibles */}
          <Testimonials /> {/* Opiniones o testimonios de clientes */}
          <ContactForm /> {/* Formulario para que los usuarios contacten */}
        </main>
        <Footer /> {/* Pie de página con información adicional */}
        <Toaster /> {/* Contenedor para mostrar notificaciones emergentes */}
      </div>
    </AnimatePresence>
  );
}

export default App;  // Exporta el componente App para usarlo en otros archivos
