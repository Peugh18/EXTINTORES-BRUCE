
    import React from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ShoppingCart, Zap, AlertTriangle } from 'lucide-react';
    import { motion } from 'framer-motion';

    const productsData = [
      {
        title: "Extintores Certificados",
        description: "Amplia gama de extintores para todo tipo de fuego: PQS, CO2, Agua, K, D. Con garantía y certificación vigente.",
        category: "Extintores",
        icon: <ShoppingCart className="text-primary" size={28}/>,
        imgPlaceholder: "Fila de extintores de diferentes tipos",
        features: ["Certificación NTP", "Variedad de agentes", "Para uso comercial y residencial"]
      },
      {
        title: "Accesorios y Repuestos",
        description: "Mangueras, boquillas, manómetros, soportes, gabinetes y todo lo necesario para el mantenimiento de tus equipos.",
        category: "Accesorios",
        icon: <Zap className="text-primary" size={28}/>,
        imgPlaceholder: "Colección de accesorios para extintores como mangueras y boquillas",
        features: ["Alta calidad", "Compatibilidad garantizada", "Stock permanente"]
      },
      {
        title: "Señalética de Seguridad",
        description: "Señales de evacuación, advertencia, prohibición e informativas. Fotoluminiscentes y reflectivas.",
        category: "Señalética",
        icon: <AlertTriangle className="text-primary" size={28}/>,
        imgPlaceholder: "Varias señales de seguridad iluminadas",
        features: ["Cumplen NTP e INDECI", "Alta visibilidad", "Materiales duraderos"]
      },
    ];

    const ProductCard = ({ title, description, category, icon, imgPlaceholder, features, index }) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
      >
        <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary">
          <div className="aspect-video overflow-hidden">
            <img  class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" alt={imgPlaceholder} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-xl gradient-text">{title}</CardTitle>
              {icon}
            </div>
            <span className="text-xs font-semibold uppercase text-secondary tracking-wider">{category}</span>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription className="text-foreground/80 mb-4">{description}</CardDescription>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside mb-4">
              {features.map(feature => <li key={feature}>{feature}</li>)}
            </ul>
          </CardContent>
          <div className="p-6 pt-0">
            <Button className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-primary-foreground" onClick={() => document.getElementById('contacto')?.scrollIntoView()}>
              Consultar Producto <ShoppingCart size={18} className="ml-2"/>
            </Button>
          </div>
        </Card>
      </motion.div>
    );

    const Products = () => {
      return (
        <section id="productos" className="bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-center mb-4">Nuestros <span className="gradient-text">Productos Destacados</span></h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Equipos y materiales de la más alta calidad para garantizar tu seguridad y la de tu entorno.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsData.map((product, index) => (
                <ProductCard key={product.title} {...product} index={index} />
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default Products;
  