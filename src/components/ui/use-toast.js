import { useState, useEffect } from "react";

// Límite máximo de toasts que se pueden mostrar simultáneamente
const TOAST_LIMIT = 1;

// Contador para generar IDs únicos para cada toast
let count = 0;
function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

// Objeto que almacena el estado global de los toasts y gestiona listeners para actualizar componentes
const toastStore = {
  state: {
    toasts: [],  // Array con los toasts activos
  },
  listeners: [],  // Array de funciones que se ejecutan al cambiar el estado
  
  // Función para obtener el estado actual
  getState: () => toastStore.state,
  
  // Función para actualizar el estado
  setState: (nextState) => {
    if (typeof nextState === 'function') {
      // Si se pasa una función, la ejecuta con el estado actual para calcular el siguiente estado
      toastStore.state = nextState(toastStore.state);
    } else {
      // Si se pasa un objeto, hace merge con el estado actual
      toastStore.state = { ...toastStore.state, ...nextState };
    }
    
    // Notifica a todos los listeners con el nuevo estado
    toastStore.listeners.forEach(listener => listener(toastStore.state));
  },
  
  // Función para suscribirse a cambios del estado, devuelve función para cancelar la suscripción
  subscribe: (listener) => {
    toastStore.listeners.push(listener);
    return () => {
      toastStore.listeners = toastStore.listeners.filter(l => l !== listener);
    };
  }
};

// Función para crear un nuevo toast
export const toast = ({ ...props }) => {
  const id = generateId();

  // Función para actualizar propiedades del toast específico
  const update = (props) =>
    toastStore.setState((state) => ({
      ...state,
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, ...props } : t
      ),
    }));

  // Función para eliminar (descartar) el toast
  const dismiss = () => toastStore.setState((state) => ({
    ...state,
    toasts: state.toasts.filter((t) => t.id !== id),
  }));

  // Añade el nuevo toast al estado, limitando la cantidad de toasts activos según TOAST_LIMIT
  toastStore.setState((state) => ({
    ...state,
    toasts: [
      { ...props, id, dismiss },
      ...state.toasts,
    ].slice(0, TOAST_LIMIT),
  }));

  return {
    id,
    dismiss,
    update,
  };
};

// Hook React para usar los toasts en componentes
export function useToast() {
  // Estado local que refleja el estado global de los toasts
  const [state, setState] = useState(toastStore.getState());
  
  // Suscribe el componente a cambios en el toastStore para actualizar estado local
  useEffect(() => {
    const unsubscribe = toastStore.subscribe((state) => {
      setState(state);
    });
    return unsubscribe;  // Limpia la suscripción al desmontar componente
  }, []);
  
  // Efecto para manejar el tiempo de duración y auto-dismiss de cada toast
  useEffect(() => {
    const timeouts = [];

    state.toasts.forEach((toast) => {
      if (toast.duration === Infinity) {
        // Si duración es infinita, no se auto-descarta
        return;
      }

      // Programa la función dismiss después de la duración especificada (por defecto 5000 ms)
      const timeout = setTimeout(() => {
        toast.dismiss();
      }, toast.duration || 5000);

      timeouts.push(timeout);
    });

    // Limpia los timeouts cuando cambian los toasts o se desmonta componente
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [state.toasts]);

  // Retorna función para crear toast y array con toasts activos
  return {
    toast,
    toasts: state.toasts,
  };
}
