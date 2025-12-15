import { create } from "zustand";
import { Order, OrderSummary } from "../types/Order";
import { createOrder, fetchOrders, fetchOrderSummary } from "../api/order";

interface State {
    orders: Order[]
    orderSummary: OrderSummary | null
    orderCreationLoading: boolean
    ordersLoading: boolean
    orderSummaryLoading: boolean
    searchQuery: string
}

interface Action {
    placeOrder: (order: Order) => Promise<Order>
    getOrders: () => Promise<Order[]>
    getBalance: (totalAmount: number, advance: number) => number
    updateSearchQuery: (query: State['searchQuery']) => void
    getOrderSummary: () => Promise<OrderSummary>
}

export const useOrderStore = create<State & Action>((set) => ({
    orders: [],

    orderSummary: null,

    orderCreationLoading: false,

    ordersLoading: false,

    searchQuery: '',

    orderSummaryLoading: false,

    placeOrder: async (order) => {
        set({ orderCreationLoading: true})
        const data = await createOrder(order)
      
        set({ orderCreationLoading: false })
        return data
    },

    getOrders: async () => {
        set({ ordersLoading: true })
        const data = await fetchOrders()
        set({ orders: data, ordersLoading: false })
        return data
    },

    getBalance: (totalAmount, advance) => {
        return totalAmount - advance
    },

    updateSearchQuery: (query) => {
        set({ searchQuery: query })
    },

    getOrderSummary: async () => {
        set({ orderSummaryLoading: true })
        const data = await fetchOrderSummary()
        set({ orderSummary: data, orderSummaryLoading: false })
        return data

    }
    
}))