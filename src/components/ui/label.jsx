import React from 'react';  // Importa React para crear componentes
import * as LabelPrimitive from '@radix-ui/react-label';  // Importa el componente Label base de Radix UI
import { cva } from 'class-variance-authority';  // Librería para manejar variantes de clases CSS
import { cn } from '@/lib/utils';  // Función para combinar clases CSS limpiamente

// Define las clases base para el label, con soporte para estado disabled vía peer
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

// Componente Label que envuelve LabelPrimitive.Root para añadir estilos y soporte forwardRef
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}  // Permite referenciar directamente el elemento DOM
    className={cn(labelVariants(), className)}  // Aplica clases base y las adicionales que se pasen
    {...props}  // Pasa todas las demás props (htmlFor, children, etc.)
  />
));

Label.displayName = LabelPrimitive.Root.displayName;  // Usa el nombre de Radix para debugging

export { Label };  // Exporta el componente para usarlo en otros archivos
