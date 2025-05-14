import React, { useState } from 'react';  // React y hook para manejar estado
import { Button } from '@/components/ui/button';  // Botón estilizado
import { Input } from '@/components/ui/input';  // Input estilizado
import { Label } from '@/components/ui/label';  // Label para inputs
import { Textarea } from '@/components/ui/textarea';  // Textarea estilizado
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';  // Tarjetas UI
import { useToast } from '@/components/ui/use-toast';  // Hook para mostrar notificaciones tipo toast
import { Send, Phone, Mail, MapPin } from 'lucide-react';  // Iconos SVG para botones y contacto
import { motion } from 'framer-motion';  // Animaciones declarativas

const ContactForm = () => {
  // Hook para crear notificaciones toast
  const { toast } = useToast();

  // Estado local para los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Estado local para errores de validación
  const [errors, setErrors] = useState({});

  // Actualiza los datos del formulario y elimina error si existe para el campo
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  // Función para validar el formulario y establecer errores si hay campos vacíos o incorrectos
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'El asunto es obligatorio.';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es obligatorio.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
      
      try {
        // Guarda mensajes en localStorage simulando backend
        const existingMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        localStorage.setItem('contactMessages', JSON.stringify([...existingMessages, { ...formData, date: new Date().toISOString() }]));
        
        // Muestra notificación de éxito
        toast({
          title: '¡Mensaje Enviado!',
          description: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
          variant: 'default',
        });

        // Limpia el formulario
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        // Notificación de error al guardar
        toast({
          title: 'Error al Enviar',
          description: 'Hubo un problema al guardar tu mensaje. Inténtalo de nuevo.',
          variant: 'destructive',
        });
      }
    } else {
      // Notificación si hay errores de validación
      toast({
        title: 'Error de Validación',
        description: 'Por favor, corrige los errores en el formulario.',
        variant: 'destructive',
      });
    }
  };

  // Información de contacto directo para mostrar en tarjetas con iconos
  const companyContacts = [
    { icon: <Phone size={20} className="text-primary"/>, text: "(044) 374124 | 949208893 | 949122435", href: "tel:949122435" },
    { icon: <Mail size={20} className="text-primary"/>, text: "Extintoresbrucecars@gmail.com", href: "mailto:Extintoresbrucecars@gmail.com" },
    { icon: <MapPin size={20} className="text-primary"/>, text: "Av. América Norte Nro. 1256, Urb. Los Jardines, Trujillo", href: "https://maps.google.com/?q=Av. América Norte Nro. 1256, Urbanización Los Jardines, Trujillo, La Libertad, Perú" },
  ];

  return (
    <section id="contacto" className="bg-background">
      <div className="container mx-auto px-4">
        {/* Título y descripción con animación al aparecer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">Ponte en <span className="gradient-text">Contacto</span></h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            ¿Tienes preguntas o necesitas una cotización? Estamos aquí para ayudarte.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Formulario de contacto animado */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl border-primary/50">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Envíanos un Mensaje</CardTitle>
                <CardDescription>Completa el formulario y te responderemos a la brevedad.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Campo Nombre */}
                  <div>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" value={formData.name} onChange={handleChange} placeholder="Ej: Juan Pérez" className={errors.name ? 'border-destructive' : ''} />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>
                  {/* Campos Email y Teléfono */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="juan.perez@example.com" className={errors.email ? 'border-destructive' : ''} />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono (Opcional)</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="987654321" />
                    </div>
                  </div>
                  {/* Campo Asunto */}
                  <div>
                    <Label htmlFor="subject">Asunto</Label>
                    <Input id="subject" value={formData.subject} onChange={handleChange} placeholder="Ej: Cotización de extintores" className={errors.subject ? 'border-destructive' : ''}/>
                    {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                  </div>
                  {/* Campo Mensaje */}
                  <div>
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Escribe tu consulta aquí..." rows={5} className={errors.message ? 'border-destructive' : ''} />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>
                  {/* Botón de envío */}
                  <Button type="submit" className="w-full text-lg py-3 bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary">
                    Enviar Mensaje <Send size={18} className="ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Información de contacto directo con iconos y enlaces */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">Información de Contacto Directo</h3>
            {companyContacts.map(contact => (
              <a
                key={contact.text}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:shadow-md transition-shadow group"
              >
                <div className="p-3 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">{contact.icon}</div>
                <div>
                  <p className="text-foreground group-hover:text-primary transition-colors">{contact.text}</p>
                </div>
              </a>
            ))}
            {/* Imagen de mapa de ubicación */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-xl">
              <img className="w-full h-64 object-cover" alt="Mapa de ubicación de Extintores Bruce E.I.R.L." src="/imagenes/LugarExt.png" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
