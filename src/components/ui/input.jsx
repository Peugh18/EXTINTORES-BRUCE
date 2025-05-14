import React from 'react';  // Importa React para crear componentes
import { cn } from '@/lib/utils';  // Función para combinar clases CSS limpiamente

// Componente Input que soporta forwardRef para pasar referencia al input HTML nativo
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}  // Tipo de input (text, email, password, etc.)
      className={cn(
        // Clases base para estilo del input usando Tailwind CSS
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ' +
        'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ' +
        'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 ' +
        'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className  // Clases adicionales que se puedan pasar desde afuera
      )}
      ref={ref}  // Referencia para acceso directo al DOM desde el exterior
      {...props}  // Pasa cualquier otra propiedad que se pase al input (como onChange, value, etc.)
    />
  );
});
Input.displayName = 'Input';  // Nombre para que aparezca en React DevTools

export { Input };  // Exporta el componente para usarlo en otras partes de la app
