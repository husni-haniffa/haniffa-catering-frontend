import { create } from "zustand";
import { Order, OrderSummary } from "../types/Order";
import { createOrder, fetchOrders, fetchOrderSummary, orderCancelled, orderDelivered, orderPaid, orderPaymentTypeBank, orderPaymentTypeCash } from "../api/order";
import { useToastStore } from "./toastStore";

interface State {
    orders: Order[]
    orderSummary: OrderSummary
    orderCreationLoading: boolean
    ordersLoading: boolean
    orderSummaryLoading: boolean
    searchQuery: string
    orderCancelId: string | null
    orderDeliveredId: string | null
    orderPaidId: string | null
    orderPaymentTypeBankId: string | null
    orderPaymentTypeCashId: string | null
}

interface Action {
    placeOrder: (order: Order) => Promise<Order>
    getOrders: () => Promise<Order[]>
    getBalance: (totalAmount: number, advance: number) => number
    updateSearchQuery: (query: State['searchQuery']) => void
    getOrderSummary: () => Promise<OrderSummary>
    cancelOrder: (id: string) => Promise<Order>
    orderDelivered: (id: string) => Promise<Order>
    orderPaid: (id: string) => Promise<Order>
    orderPaymentTypeBank: (id: string) => Promise<Order>
    orderPaymentTypeCash: (id: string) => Promise<Order>
}


export const useOrderStore = create<State & Action>((set) => ({
    orders: [],

    orderSummary: {
        itemCounts: {}, 
    },

    orderCreationLoading: false,

    ordersLoading: false,

    searchQuery: '',

    orderSummaryLoading: false,

    orderCancelId: null,

    orderDeliveredId: null,

    orderPaidId: null,
    
    orderPaymentTypeBankId: null,

    orderPaymentTypeCashId: null,

    placeOrder: async (order) => {
        try {
            set({ orderCreationLoading: true })
            const data = await createOrder(order)
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        } finally {
            set({ orderCreationLoading: false })
        }
        
    },

    getOrders: async () => {
        try {
            set({ ordersLoading: true })
            const data = await fetchOrders()
            set({ orders: data, ordersLoading: false })
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        }
        
    },

    getBalance: (totalAmount, advance) => {
        return totalAmount - advance
    },

    updateSearchQuery: (query) => {
        set({ searchQuery: query })
    },

    getOrderSummary: async () => {
        try {
            set({ orderSummaryLoading: true })
            const data = await fetchOrderSummary()
            set({ orderSummary: data, orderSummaryLoading: false })
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        }

    },

    cancelOrder: async (id) => {
        try {
            set({ orderCancelId: id })
            const data = await orderCancelled(id);
            useToastStore.getState().toast("success", "Order Cancelled")
            set((state) => ({
                orders: state.orders.map(o => o.id === id ? data : o), orderCancelId: null
            }))
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        }
      
    },

    orderDelivered: async (id) => {
        try {
            set({ orderDeliveredId: id })
            const data = await orderDelivered(id);
            useToastStore.getState().toast("success", "Order Delivered")
            set((state) => ({
                orders: state.orders.map(o => o.id === id ? data : o), orderDeliveredId: null
            }))
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        }
       
    },

    orderPaid: async (id) => {
        try {
            set({ orderPaidId: id })
            const data = await orderPaid(id);
            useToastStore.getState().toast("success", "Order Paid")
            set((state) => ({
                orders: state.orders.map(o => o.id === id ? data : o), orderPaidId: null
            }))
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        }
        
        
    },

    orderPaymentTypeBank: async (id) => {
        try {
            set({ orderPaymentTypeBankId: id })
            const data = await orderPaymentTypeBank(id);
            useToastStore.getState().toast("success", "Payment Type Updated")
            set((state) => ({
                orders: state.orders.map(o => o.id === id ? data : o), orderPaymentTypeBankId: null
            }))
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        }
       
    },

    orderPaymentTypeCash: async (id) => {
        try {
            set({ orderPaymentTypeBankId: id })
            const data = await orderPaymentTypeCash(id);
            useToastStore.getState().toast("success", "Payment Type Updated")
            set((state) => ({
                orders: state.orders.map(o => o.id === id ? data : o), orderPaymentTypeBankId: null
            }))
            return data
        } catch(error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        }
     
    },

}))