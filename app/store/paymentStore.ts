import { create } from "zustand";
import { Payment } from "../types/Payment";
import { createPayment, getPayments, updatePayment } from "../api/payment";

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
        set({paymentsLoading: true })
        const data = await getPayments()
        set({payments: data, paymentsLoading: false})
        return data
    },
    
    createPayment: async (payment) => {
        set({ payentCreationLoading: true })
        const data = await createPayment(payment)
        set({ payentCreationLoading: false })
        return data
    },
 
    updatePayment: async(id, amount) => {
        set({ paymentUpdating: true })
        const data = await updatePayment(id, amount)
        set((state) => ({
            payments: state.payments.map(
                p => p.id === id ? {...p, paid: p.paid + amount, balance: p.balance - amount} : p
            )
        }))
        set({ paymentUpdating: false })
        return data
    },
    
}))