
    import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';
    import { motion } from 'framer-motion';

    const NavLink = ({ href, children, onClick }) => (
      <a
        href={href}
        onClick={onClick}
        className="text-foreground hover:text-primary transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
      >
        {children}
      </a>
    );

    const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isScrolled, setIsScrolled] = useState(false);

      const navLinks = [
        { href: '#inicio', text: 'Inicio' },
        { href: '#quienes-somos', text: 'Quiénes Somos' },
        { href: '#servicios', text: 'Servicios' },
        { href: '#productos', text: 'Productos' },
        { href: '#testimonios', text: 'Testimonios' },
        { href: '#contacto', text: 'Contacto' },
      ];

      const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
      
      const closeMenu = () => setIsMenuOpen(false);

      return (
        <motion.header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <div className={`flex flex-col lg:flex-row items-center justify-between py-2 ${isScrolled ? '' : 'lg:py-3'}`}>
              <div className="flex items-center justify-between w-full lg:w-auto">
                <a href="#inicio" className="flex items-center space-x-2" onClick={closeMenu}>
                  <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2a4075a1-8545-4d7c-bb12-1f3efe5d0658/b43e1bb51587918dd19d1377f91eb8dd.png" alt="Extintores Bruce E.I.R.L. Logo" className="h-12 md:h-16 w-auto" />
                  <div className="hidden sm:block">
                     <h1 className="text-xl md:text-2xl font-bold text-primary">Extintores Bruce</h1>
                     <p className="text-xs md:text-sm text-secondary-foreground -mt-1">Somos especialistas contra el fuego...!</p>
                  </div>
                </a>
                <div className="lg:hidden">
                  <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
              
              <div className={`w-full lg:w-auto ${isMenuOpen ? 'block mt-4 lg:mt-0' : 'hidden lg:flex'} flex-col lg:flex-row items-center`}>
                <nav className="flex flex-col lg:flex-row items-center lg:space-x-2 w-full lg:w-auto">
                  {navLinks.map(link => (
                    <NavLink key={link.href} href={link.href} onClick={closeMenu}>{link.text}</NavLink>
                  ))}
                </nav>
                <div className="mt-4 lg:mt-0 lg:ml-4 flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4 text-sm">
                  <a href="tel:044374124" className="flex items-center hover:text-primary transition-colors">
                    <Phone size={16} className="mr-1 text-primary" /> (044) 374124
                  </a>
                  <a href="mailto:Extintoresbrucecars@gmail.com" className="flex items-center hover:text-primary transition-colors">
                    <Mail size={16} className="mr-1 text-primary" /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.header>
      );
    };

    export default Header;
  