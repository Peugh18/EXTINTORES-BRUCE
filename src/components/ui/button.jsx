import { cn } from '@/lib/utils';  // Función para combinar clases CSS limpiamente
import { Slot } from '@radix-ui/react-slot';  // Componente para renderizar hijos con un wrapper flexible
import { cva } from 'class-variance-authority';  // Librería para gestionar variantes de clases CSS
import React from 'react';  // React para componentes

// Definición de variantes y tamaños para el botón usando cva
const buttonVariants = cva(
  // Clases base que siempre se aplican al botón
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {  // Variantes visuales del botón
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {  // Tamaños disponibles para el botón
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {  // Variantes por defecto si no se especifica
      variant: 'default',
      size: 'default',
    },
  },
);

// Componente Button que soporta forwardRef y render flexible con asChild
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  // Si asChild es true, renderiza el componente Slot (permite usar otro elemento como wrapper),
  // sino un botón HTML nativo
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}  // Combina clases base + variantes + clase extra
      ref={ref}  // Referencia para acceso directo al DOM
      {...props}  // Pasa todas las otras props al componente
    />
  );
});
Button.displayName = 'Button';  // Nombre para mejor debugging en React DevTools

export { Button, buttonVariants };  // Exporta el componente y las variantes para uso externo
