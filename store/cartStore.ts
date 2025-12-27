import { create } from "zustand";
import { CartItem } from "../types/Cart";
import { Item } from "../types/Item";

interface State {
    cart: CartItem[]
}

interface Action {
    addToCart: (item: Item) => void
    increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
    getTotalItems: () => number
    getTotalAmount: () => number
    clearCart: () => void

} 

export const useCartStore = create<State & Action>((set, get) => ({
    cart: [],

    addToCart: (item) => {
        const cart = get().cart
        const existing = cart.find((i) => i.id == item.id)
        if(existing) {
            const updateCart = cart.map(
                c => c.id === item.id ? 
                { ...c, quantity: c.quantity + 1,
                  subTotal: (c.quantity + 1) * c.price

                } : c
            )
            set({cart: updateCart})
        }
        else {
            set({
                cart: [...cart, { ...item, quantity: 1, subTotal: item.price }]
            })
        }

    },

    increaseQty: (id) => {
        const cart = get().cart
        const updatedCart = cart.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1, subTotal: (item.quantity + 1) * item.price }
                : item
        )
        set({ cart: updatedCart })
    },

    decreaseQty: (id) => {
        const cart = get().cart
        const updatedCart = cart
            .map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1, subTotal: (item.quantity - 1) * item.price }
                    : item
            )
            .filter(item => item.quantity > 0)

        set({ cart: updatedCart })
    },

    getTotalItems: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0)
        
    },

    getTotalAmount: () =>{
        return get().cart.reduce((sum, item) => sum + item.subTotal, 0)
    },

    clearCart: () => {
        set({cart: []})
    }
    
}))