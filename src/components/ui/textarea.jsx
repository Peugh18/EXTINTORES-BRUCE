import React from 'react';  // Importa React para crear componentes
import { cn } from '@/lib/utils';  // Función para combinar clases CSS limpiamente

// Componente Textarea con soporte para forwardRef para acceso directo al DOM
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // Clases base para estilizar el textarea con Tailwind CSS
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ' +
        'ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none ' +
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
        'disabled:cursor-not-allowed disabled:opacity-50',
        className  // Clases adicionales que puedan pasarse
      )}
      ref={ref}  // Referencia al DOM para uso externo
      {...props}  // Pasa otras props como onChange, value, placeholder, etc.
    />
  );
});

Textarea.displayName = 'Textarea';  // Nombre para React DevTools

export { Textarea };  // Exporta el componente para uso en otros archivos
