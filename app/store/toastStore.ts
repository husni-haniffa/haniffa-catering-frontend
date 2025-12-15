import { create } from "zustand"

type Toast = "success" | "error" | "info"

interface State {
    visible: boolean
    type: Toast
    message: string
}

interface Action {
    toast: (type: Toast, message: string) => void
   
}

export const useToastStore = create<State & Action>((set) => ({
    visible: false,
    type: "success",
    title: "",
    message: "",
    toast: (type, message) => {
        set({
            visible: true,
            type,
            message
        })
        // setTimeout(() => {
        //     set({visible: false})
        // }, 500);
    },
  
}))