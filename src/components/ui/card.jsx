import React from 'react';  // Importa React para crear componentes
import { cn } from '@/lib/utils';  // Función para combinar clases CSS limpiamente

// Componente Card: contenedor principal con estilos básicos y bordes redondeados
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}  // Permite acceso directo al div desde afuera con ref
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',  // Clases base: bordes redondeados, borde, fondo y sombra
      className  // Clases adicionales que pueden pasar desde fuera
    )}
    {...props}  // Pasa todas las demás props al div
  />
));
Card.displayName = 'Card';  // Nombre para mejor debugging

// Componente CardHeader: sección superior del card, con padding y espacio entre elementos verticalmente
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)} // Flex columna, espacio entre hijos, padding
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

// Componente CardTitle: título principal dentro del card, con fuente grande y negrita
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',  // Tamaño fuente, peso y espaciado de letra
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

// Componente CardDescription: texto descriptivo pequeño, con color gris tenue
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}  // Fuente pequeña y color gris tenue
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

// Componente CardContent: contenido principal del card, con padding y sin padding superior
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />  // Padding general excepto arriba
));
CardContent.displayName = 'CardContent';

// Componente CardFooter: pie del card, usualmente para botones o enlaces, con flex horizontal y padding
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}  // Flex fila, centrado vertical y padding
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Exporta todos los componentes para usarlos en otras partes de la app
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
