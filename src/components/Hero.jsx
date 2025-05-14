
    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { ShieldCheck, ChevronRight } from 'lucide-react';
    import { motion } from 'framer-motion';

    const Hero = () => {
      return (
        <section id="inicio" className="relative min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-red-700 via-red-500 to-yellow-400 text-white overflow-hidden pt-24">
          <div className="absolute inset-0 bg-black/50 z-0"></div>
          <div className="absolute inset-0 opacity-20">
             <img  class="w-full h-full object-cover" alt="Abstract fire safety background" src="https://images.unsplash.com/photo-1633092228879-d6a88c22e7bc" />
          </div>
          
          <motion.div 
            className="relative z-10 p-6 container mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-block p-3 bg-white/20 rounded-full mb-6 backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <ShieldCheck size={48} className="text-yellow-300" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Extintores <span className="text-yellow-300">Bruce E.I.R.L.</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Su socio confiable en seguridad contra incendios. Más de 12 años protegiendo lo que más importa en Trujillo y La Libertad.
            </motion.p>
            
            <motion.div 
              className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-red-700 font-bold text-lg px-10 py-6 shadow-xl transform hover:scale-105 transition-transform duration-300" onClick={() => document.getElementById('contacto')?.scrollIntoView()}>
                Solicitar Cotización
                <ChevronRight size={24} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600 font-bold text-lg px-10 py-6 shadow-xl transform hover:scale-105 transition-transform duration-300" onClick={() => document.getElementById('servicios')?.scrollIntoView()}>
                Nuestros Servicios
              </Button>
            </motion.div>
            <motion.p 
              className="mt-8 text-yellow-200 text-md italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              "Somos especialistas contra el fuego...!"
            </motion.p>
          </motion.div>
        </section>
      );
    };

    export default Hero;
  