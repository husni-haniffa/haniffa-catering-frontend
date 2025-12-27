import { create } from "zustand";
import { Payment } from "../types/Payment";
import { createPayment, getPayments, updatePayment } from "../api/payment";
import { useToastStore } from "./toastStore";

interface State {
    payments: Payment[]
    paymentsLoading: boolean
    payentCreationLoading: boolean
    paymentUpdating: boolean
}

interface Action {
    getPayments: () => Promise<Payment[]>
    createPayment: (payment: any) => Promise<Payment>
    updatePayment: (id: string, amount: number) => Promise<Payment>
}

export const usePaymentStore = create<State & Action>((set, get) => ({
    payments: [],

    paymentsLoading: false,

    paymentUpdating: false,

    payentCreationLoading: false,

    getPayments: async () => {
        try {
            set({ paymentsLoading: true })
            const data = await getPayments()
            set({ payments: data, paymentsLoading: false })
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        }
        
    },
    
    createPayment: async (payment) => {
        try {
            set({ payentCreationLoading: true })
            const data = await createPayment(payment)
            set({ payentCreationLoading: false })
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        }
       
    },
 
    updatePayment: async(id, amount) => {
        try {
            set({ paymentUpdating: true })
            const data = await updatePayment(id, amount)
            set((state) => ({
                payments: state.payments.map(
                    p => p.id === id ? data : p
                )
            }))
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        } finally {
            set({ paymentUpdating: false })
        }
    },
    
}))