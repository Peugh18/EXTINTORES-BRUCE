import { clsx } from 'clsx';  // Importa clsx, una utilidad para combinar clases condicionalmente
import { twMerge } from 'tailwind-merge';  // Importa twMerge, que fusiona clases Tailwind evitando duplicados

// Función que recibe cualquier número de argumentos (clases CSS, condicionales, etc.)
export function cn(...inputs) {
	// Primero combina las clases usando clsx (evalúa strings, arrays, objetos condicionales)
	// Luego usa twMerge para fusionar clases Tailwind y eliminar duplicados o conflictos
	return twMerge(clsx(inputs));
}
