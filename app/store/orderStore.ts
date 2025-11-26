import { create } from "zustand";
import { Order } from "../types/Order";
import { createOrder, fetchOrders } from "../api/order";
import { CartItem } from "../types/Cart";

interface State {
    order: Order
    orders: Order[]
    customerName: string
    customerPhoneNumber: number
    advance: number
    placingOrder: boolean
    orderProcessing: boolean
}

interface Action {
    placeOrder: (order: Order) => Promise<Order>
    getOrders: () => Promise<Order[]>
    updateCustomerName: (name: State['customerName']) => void
    updateCustomerPhoneNumber: (phoneNumber: State['customerPhoneNumber']) => void
    updateAdvancePaid: (amount: number, cartItems: CartItem[]) => void
    getBalance: (totalAmount: number, advance: number) => number
    
}

export const useOrderStore = create<State & Action>((set, get) => ({
    order: {
        customerName: "",
        customerPhoneNumber: 0,
        items: [],
        totalAmount: 0,
        advance: 0,
        balance: 0,
    },
    orders: [],
    customerName: '',
    customerPhoneNumber: 0,
    advance: 0,
    placingOrder: false,
    orderProcessing: false,
    placeOrder: async (order) => {
        set({ placingOrder: true})
        const data = await createOrder(order)
      
        set({ placingOrder: false })
        return data
    },
    getOrders: async () => {
        set({ orderProcessing: false })
        const data = await fetchOrders()
        
        set({ orders: data, orderProcessing: false })
        return data
    },
    updateCustomerName: (customerName) => set(() => ({ customerName: customerName })),
    updateCustomerPhoneNumber: (customerPhoneNumber) => set(() => ({ customerPhoneNumber: customerPhoneNumber })),
    updateAdvancePaid: (amount, cartItems) => {
        if (cartItems.length === 0) {
            set({ advance: 0 })
        } else {
            set({ advance: amount })
        }
    },
    getBalance: (totalAmount, advance) => {
        return totalAmount - advance
    },
    
}))