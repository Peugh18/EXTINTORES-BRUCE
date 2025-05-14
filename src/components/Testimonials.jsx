
    import React from 'react';
    import { Card, CardContent } from '@/components/ui/card';
    import { Star, UserCircle } from 'lucide-react';
    import { motion } from 'framer-motion';

    const testimonialsData = [
      {
        name: "Constructora Segura SAC",
        role: "Gerente de Operaciones",
        quote: "Extintores Bruce siempre nos ha brindado un servicio rápido y eficiente. Sus recargas son certificadas y confiables. ¡Totalmente recomendados!",
        stars: 5,
      },
      {
        name: "Clínica San Marcos",
        role: "Jefe de Mantenimiento",
        quote: "La capacitación sobre uso de extintores fue muy didáctica y útil para nuestro personal. Además, su servicio de fumigación es excelente.",
        stars: 5,
      },
      {
        name: "Condominio Los Alamos",
        role: "Administrador",
        quote: "Instalaron todo nuestro sistema de señalética y cámaras de seguridad. Un trabajo impecable y profesional. Estamos muy satisfechos.",
        stars: 4,
      },
    ];

    const TestimonialCard = ({ name, role, quote, stars, index }) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="h-full bg-gradient-to-br from-card to-muted/30 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <UserCircle size={48} className="text-primary mr-3" />
              <div>
                <h4 className="font-semibold text-lg text-foreground">{name}</h4>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <p className="text-foreground/80 italic">"{quote}"</p>
          </CardContent>
        </Card>
      </motion.div>
    );

    const Testimonials = () => {
      return (
        <section id="testimonios" className="bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-center mb-4">Lo Que <span className="gradient-text">Dicen Nuestros Clientes</span></h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                La satisfacción de nuestros clientes es nuestra mayor recompensa y motivación.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial, index) => (
                <TestimonialCard key={testimonial.name} {...testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default Testimonials;
  