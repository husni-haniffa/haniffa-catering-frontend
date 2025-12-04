import { create } from "zustand";
import { Order } from "../types/Order";
import { createOrder, fetchOrders } from "../api/order";

interface State {
    orders: Order[]
    orderCreationLoading: boolean
    ordersLoading: boolean
}

interface Action {
    placeOrder: (order: Order) => Promise<Order>
    getOrders: () => Promise<Order[]>
    getBalance: (totalAmount: number, advance: number) => number
    
}

export const useOrderStore = create<State & Action>((set) => ({
    orders: [],

    orderCreationLoading: false,

    ordersLoading: false,

    placeOrder: async (order) => {
        set({ orderCreationLoading: true})
        const data = await createOrder(order)
      
        set({ orderCreationLoading: false })
        return data
    },

    getOrders: async () => {
        set({ ordersLoading: false })
        const data = await fetchOrders()
        set({ orders: data, ordersLoading: false })
        return data
    },

    getBalance: (totalAmount, advance) => {
        return totalAmount - advance
    },
    
}))