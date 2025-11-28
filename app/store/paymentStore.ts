import { create } from "zustand";
import { Payment } from "../types/Payment";
import { createPayment, getPayments, IPayment, updatePayment } from "../api/payment";

interface State {
    payments: Payment[]
    paymentsLoading: boolean
    customerPhoneNumber: number
    amountToPay: number
    paymentProcessing: boolean
    creatingPayment: boolean
    payingAmount: number
}

interface Action {
    getPayments: () => Promise<Payment[]>
    createPayment: (payment: IPayment) => Promise<Payment>
    updateCustomerPhoneNumber: (phoneNumber: State['customerPhoneNumber']) => void
    updateAmountToPay: (amountToPay: State['amountToPay']) => void
    updatePayment: (id: string, amount: number) => Promise<Payment>
    updatePayingAmount: (payingAmount: State['payingAmount']) => void
}

export const usePaymentStore = create<State & Action>((set) => ({
    payments: [],
    paymentsLoading: false,
    customerPhoneNumber: 0,
    amountToPay: 0,
    paymentProcessing: false,
    creatingPayment: false,
    payingAmount: 0,
    getPayments: async () => {
        set({paymentsLoading: true })
        const data = await getPayments()
        set({payments: data, paymentsLoading: false})
        return data
    },
    createPayment: async (payment) => {
        set({ creatingPayment: true })
        const data = await createPayment(payment)
        set({  creatingPayment: false })
        return data
    },
    updateCustomerPhoneNumber: (customerPhoneNumber) => set(() => ({ customerPhoneNumber: customerPhoneNumber })),
    updateAmountToPay: (amountToPay) => set(() => ({ amountToPay: amountToPay })),
    updatePayment: async(id, amount) => {
        set({ paymentProcessing: true })
        const data = await updatePayment(id, amount)
        set((state) => ({
            payments: state.payments.map(
                p => p.id === id ? {...p, paid: p.paid + amount, balance: p.balance - amount} : p
            )
        }))
        set({ paymentProcessing: false })
        return data
    },
    updatePayingAmount: (payingAmount) => set(() => ({ payingAmount: payingAmount })),
}))