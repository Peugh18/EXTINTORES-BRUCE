import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast';  // Importa componentes de notificación (toast) personalizados
import { useToast } from '@/components/ui/use-toast';  // Hook para manejar el estado de los toasts
import React from 'react';

// Componente que muestra las notificaciones (toasts) activas
export function Toaster() {
	const { toasts } = useToast();  // Obtiene el arreglo de toasts activos desde el hook

	return (
		<ToastProvider>  {/* Proveedor de contexto para manejar los toasts */}
			{/* Itera sobre cada toast activo para renderizarlo */}
			{toasts.map(({ id, title, description, action, ...props }) => {
				return (
					<Toast key={id} {...props}>  {/* Componente Toast con props como duración, estado, etc. */}
						<div className="grid gap-1">
							{/* Muestra el título si existe */}
							{title && <ToastTitle>{title}</ToastTitle>}
							{/* Muestra la descripción si existe */}
							{description && (
								<ToastDescription>{description}</ToastDescription>
							)}
						</div>
						{/* Renderiza la acción (botón, enlace) si la hay */}
						{action}
						{/* Botón para cerrar el toast */}
						<ToastClose />
					</Toast>
				);
			})}
			{/* Contenedor donde se posicionan los toasts en pantalla */}
			<ToastViewport />
		</ToastProvider>
	);
}
