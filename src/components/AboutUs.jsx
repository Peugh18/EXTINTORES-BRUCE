import React from 'react';  // Importa React para crear componentes
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';  // Componentes de tarjetas reutilizables
import { Briefcase, Building, Award, Users, MapPin, Phone, Mail } from 'lucide-react';  // Iconos SVG para ilustrar información
import { motion } from 'framer-motion';  // Librería para animaciones declarativas

// Componente pequeño para mostrar una tarjeta de información con icono, título y contenido
const InfoCard = ({ icon, title, content }) => (
  <motion.div 
    className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:shadow-lg transition-shadow"
    whileHover={{ y: -5 }}  // Animación que eleva la tarjeta al pasar el cursor
  >
    <div className="text-primary p-2 bg-primary/10 rounded-md">{icon}</div> {/* Icono con fondo y color primario */}
    <div>
      <h4 className="font-semibold text-lg text-foreground">{title}</h4> {/* Título en negrita */}
      <p className="text-muted-foreground text-sm">{content}</p> {/* Texto descriptivo */}
    </div>
  </motion.div>
);

// Componente principal AboutUs que describe la empresa y muestra información relevante
const AboutUs = () => {
  // Datos de la empresa almacenados en un objeto para fácil mantenimiento
  const companyInfo = {
    nombreComercial: "Extintores Bruce E.I.R.L.",
    razonSocial: "BRUCE CARS GENERAL SERVICE E.I.R.L.",
    ruc: "20601643279",
    direccion: "Av. América Norte Nro. 1256, Urbanización Los Jardines, Trujillo, La Libertad, Perú",
    telefonos: ["(044) 374124", "949208893", "949122435"],
    email: "Extintoresbrucecars@gmail.com",
    experiencia: "Más de 12 años en el mercado ofreciendo servicios de seguridad contra incendios."
  };

  return (
    <section id="quienes-somos" className="bg-background">
      <div className="container mx-auto px-4">
        {/* Contenedor animado para título y descripción principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}  // Estado inicial (invisible y abajo)
          whileInView={{ opacity: 1, y: 0 }}  // Al entrar en viewport se vuelve visible y se mueve arriba
          viewport={{ once: true }}  // La animación se ejecuta solo una vez
          transition={{ duration: 0.5 }}  // Duración de la animación
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Conoce a <span className="gradient-text">Extintores Bruce</span> {/* Título con texto en degradado */}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Dedicados a tu seguridad y tranquilidad, con profesionalismo y experiencia comprobada en la protección contra incendios.
          </p>
        </motion.div>

        {/* Grid responsive para distribuir contenido */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Tarjeta con información general de la empresa, animada al entrar */}
          <motion.div 
            className="md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}  // Estado inicial (invisible y a la izquierda)
            whileInView={{ opacity: 1, x: 0 }}  // Animación al aparecer (visible y en su lugar)
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl hover:shadow-2xl transition-shadow h-full border-primary border-2">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <Building size={28} className="mr-3" /> Nuestra Empresa {/* Icono y título */}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-foreground">
                {/* Información textual de la empresa */}
                <p><strong>Nombre Comercial:</strong> {companyInfo.nombreComercial}</p>
                <p><strong>Razón Social:</strong> {companyInfo.razonSocial}</p>
                <p><strong>RUC:</strong> {companyInfo.ruc}</p>
                <div className="pt-2">
                  <h5 className="font-semibold flex items-center">
                    <MapPin size={18} className="mr-2 text-primary" />Dirección:
                  </h5>
                  <p className="text-sm">{companyInfo.direccion}</p>
                </div>
                <div className="pt-2">
                  <h5 className="font-semibold flex items-center">
                    <Phone size={18} className="mr-2 text-primary" />Teléfonos:
                  </h5>
                  <ul className="list-disc list-inside text-sm">
                    {companyInfo.telefonos.map(tel => <li key={tel}>{tel}</li>)}
                  </ul>
                </div>
                <div className="pt-2">
                  <h5 className="font-semibold flex items-center">
                    <Mail size={18} className="mr-2 text-primary" />Correo:
                  </h5>
                  <p className="text-sm">{companyInfo.email}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sección con tarjetas informativas sobre experiencia, compromiso y equipo */}
          <div className="lg:col-span-2 space-y-6">
            <InfoCard 
              icon={<Award size={24} />} 
              title="Experiencia Comprobada" 
              content={companyInfo.experiencia}
            />
            <InfoCard 
              icon={<Briefcase size={24} />} 
              title="Compromiso Profesional" 
              content="Ofrecemos soluciones integrales y personalizadas para cada cliente, garantizando el cumplimiento de normativas y los más altos estándares de calidad."
            />
            <InfoCard 
              icon={<Users size={24} />} 
              title="Equipo Calificado" 
              content="Contamos con personal técnico altamente capacitado y en constante actualización para brindarte el mejor servicio y asesoramiento."
            />
            {/* Aquí puedes cambiar la foto del equipo */}
            <div className="mt-8 text-center md:text-left"> 
              <img  
                className="mx-auto md:mx-0 rounded-lg shadow-lg w-full max-w-md h-auto object-cover" 
                alt="Equipo de Extintores Bruce trabajando" 
                src="/imagenes/extintores.png" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
