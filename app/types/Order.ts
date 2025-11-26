import { CartItem } from "./Cart"

export interface Order {
    id?: string
    customerName: string
    customerPhoneNumber: number
    items: CartItem[]
    totalAmount: number
    advance: number
    balance: number
}