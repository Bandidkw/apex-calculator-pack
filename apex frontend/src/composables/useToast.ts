import { reactive } from "vue";

export interface Toast {
  id: number;
  message: string;
  type: "info" | "warning" | "error" | "success";
}

const state = reactive({
  toasts: [] as Toast[],
});

let nextId = 0;

export function useToast() {
  const addToast = (message: string, type: Toast["type"] = "info") => {
    const id = nextId++;
    state.toasts.push({ id, message, type });

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: number) => {
    const index = state.toasts.findIndex((t) => t.id === id);
    if (index !== -1) {
      state.toasts.splice(index, 1);
    }
  };

  return {
    toasts: state.toasts,
    addToast,
    removeToast,
  };
}
