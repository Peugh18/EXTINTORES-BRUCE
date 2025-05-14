
    import React from 'react';
    import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      const companyInfo = {
        name: "Extintores Bruce E.I.R.L.",
        address: "Av. América Norte Nro. 1256, Urb. Los Jardines, Trujillo, La Libertad, Perú",
        phones: ["(044) 374124", "949208893", "949122435"],
        email: "Extintoresbrucecars@gmail.com",
        ruc: "20601643279"
      };

      const socialLinks = [
        { icon: <Facebook size={24}/>, href: "https://facebook.com", label: "Facebook" },
        { icon: <Instagram size={24}/>, href: "https://instagram.com", label: "Instagram" },
        { icon: <Linkedin size={24}/>, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: <Youtube size={24}/>, href: "https://youtube.com", label: "YouTube" },
      ];
      
      const footerSections = [
        {
          title: "Enlaces Rápidos",
          links: [
            { text: "Quiénes Somos", href: "#quienes-somos" },
            { text: "Servicios", href: "#servicios" },
            { text: "Productos", href: "#productos" },
            { text: "Contacto", href: "#contacto" },
          ]
        },
        {
          title: "Información Legal",
          links: [
            { text: "Términos y Condiciones", href: "#" },
            { text: "Política de Privacidad", href: "#" },
          ]
        }
      ];

      return (
        <motion.footer 
          className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 pt-16 pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              {/* Company Info */}
              <div className="space-y-4">
                <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2a4075a1-8545-4d7c-bb12-1f3efe5d0658/b43e1bb51587918dd19d1377f91eb8dd.png" alt="Extintores Bruce Logo" className="h-16 mb-2" />
                <h3 className="text-xl font-semibold text-white">{companyInfo.name}</h3>
                <p className="text-sm flex items-start"><MapPin size={18} className="mr-2 mt-1 text-primary flex-shrink-0" /> {companyInfo.address}</p>
                <p className="text-sm flex items-center"><Phone size={16} className="mr-2 text-primary" /> {companyInfo.phones.join(' / ')}</p>
                <p className="text-sm flex items-center"><Mail size={16} className="mr-2 text-primary" /> {companyInfo.email}</p>
                <p className="text-sm"><strong>RUC:</strong> {companyInfo.ruc}</p>
              </div>

              {/* Navigation Links */}
              {footerSections.map(section => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-3 border-b-2 border-primary pb-2 inline-block">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map(link => (
                      <li key={link.text}>
                        <a href={link.href} className="hover:text-primary transition-colors duration-300 text-sm">{link.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {/* Social Media & Newsletter */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-3 border-b-2 border-primary pb-2 inline-block">Síguenos</h4>
                <div className="flex space-x-4">
                  {socialLinks.map(social => (
                    <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
                      {social.icon}
                    </a>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Suscríbete</h4>
                  <p className="text-sm mb-3">Recibe novedades y ofertas especiales.</p>
                  <form className="flex">
                    <Input type="email" placeholder="Tu correo electrónico" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-r-none focus:ring-primary focus:border-primary"/>
                    <Button type="submit" variant="default" className="rounded-l-none bg-primary hover:bg-primary/90">Suscribir</Button>
                  </form>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-sm">&copy; {currentYear} {companyInfo.name}. Todos los derechos reservados.</p>
              <p className="text-xs mt-1">Diseñado y Desarrollado con <span className="text-red-500">❤</span> por Hostinger Horizons</p>
            </div>
          </div>
        </motion.footer>
      );
    };

    export default Footer;
  