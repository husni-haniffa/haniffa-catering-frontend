import { create } from "zustand"

type Toast = "success" | "error" | "info"

interface State {
    visible: boolean
    type: Toast
    title: string
    message: string
}

interface Action {
    toast: (type: Toast, title: string, message: string) => void
   
}

export const useToastStore = create<State & Action>((set) => ({
    visible: false,
    type: "success",
    title: "",
    message: "",
    toast: (type, title, message) => {
        set({
            visible: true,
            type,
            title,
            message
        })
        setTimeout(() => {
            set({visible: false})
        }, 500);
    },
  
}))