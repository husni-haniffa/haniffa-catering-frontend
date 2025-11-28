export interface Payment {
    id: string
    customerPhoneNumber: number
    amountToPay: number
    paid: number
    balance: number
    paymentStatus: string
}