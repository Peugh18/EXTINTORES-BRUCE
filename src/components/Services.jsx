
    import React from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { FaFireExtinguisher, FaSprayCan, FaTools, FaChalkboardTeacher, FaShieldAlt, FaSign } from 'react-icons/fa'; // Using react-icons for variety
    import { motion } from 'framer-motion';

    const servicesData = [
      {
        icon: <FaFireExtinguisher className="text-primary" size={36} />,
        title: "Venta y Recarga de Extintores",
        description: "Proveemos y recargamos todo tipo de extintores (PQS, CO2, Agua, Acetato de Potasio, etc.) con certificación y garantía.",
        imgPlaceholder: "Extintor rojo nuevo sobre fondo blanco"
      },
      {
        icon: <FaSprayCan className="text-primary" size={36} />,
        title: "Fumigación y Saneamiento",
        description: "Servicios de fumigación, desinfección, desratización y desinsectación para hogares, empresas e industrias.",
        imgPlaceholder: "Profesional fumigando una oficina"
      },
      {
        icon: <FaTools className="text-primary" size={36} />,
        title: "Instalación de Sistemas Contra Incendios",
        description: "Diseño e instalación de sistemas de detección y alarma, rociadores automáticos, gabinetes contra incendios y más.",
        imgPlaceholder: "Sistema de rociadores en el techo de un edificio"
      },
      {
        icon: <FaSign className="text-primary" size={36} />,
        title: "Venta e Instalación de Señalética",
        description: "Señalética de seguridad computarizada, fotoluminiscente y reflectiva, cumpliendo con normativas INDECI.",
        imgPlaceholder: "Varias señales de seguridad en una pared"
      },
      {
        icon: <FaShieldAlt className="text-primary" size={36} />,
        title: "Instalación de Sistemas de Seguridad",
        description: "Implementación de cámaras de vigilancia (CCTV), alarmas contra robo, cercos eléctricos y control de acceso.",
        imgPlaceholder: "Cámara de seguridad CCTV montada en una pared exterior"
      },
      {
        icon: <FaChalkboardTeacher className="text-primary" size={36} />,
        title: "Capacitación en Uso de Extintores",
        description: "Cursos teóricos y prácticos sobre el manejo correcto de extintores y actuación en caso de emergencias.",
        imgPlaceholder: "Grupo de personas en una capacitación sobre extintores"
      },
    ];

    const ServiceCard = ({ icon, title, description, imgPlaceholder, index }) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="h-full transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-card to-muted/30">
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-3 inline-block">
              {icon}
            </div>
            <CardTitle className="text-xl gradient-text">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="text-foreground/80 mb-4">{description}</CardDescription>
            <div className="aspect-video bg-muted rounded-md overflow-hidden">
              <img  class="w-full h-full object-cover" alt={imgPlaceholder} src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );

    const Services = () => {
      return (
        <section id="servicios" className="bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-center mb-4">Nuestros <span className="gradient-text">Servicios</span></h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Soluciones integrales en seguridad para proteger tu inversión y bienestar.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <ServiceCard key={service.title} {...service} index={index} />
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default Services;
  