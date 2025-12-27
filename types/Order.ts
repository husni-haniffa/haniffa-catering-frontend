import { CartItem } from "./Cart"
import { z } from 'zod'

export interface Order {
    id?: string
    customerName: string
    customerPhoneNumber: number
    items: CartItem[]
    totalAmount: number
    advance: number
    balance: number
    orderStatus?: string
    orderPaymentStatus?: string
    orderPaymentType?: string
    
}

export interface OrderSummary {
    itemCounts: Record<string, number>;
}

export const orderSchema = z
    .object({
        customerName: z.string().refine(
            (val) => {
                if (val === "") return true;
                if (val.length < 5 || val.length > 10) return false;
                if (!/^[A-Za-z ]+$/.test(val)) return false;
                return true;
            },
            {
                message: "Name must be 5–10 letters only (or leave empty)",
            }
        ),

        customerPhoneNumber: z
            .string()
            .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

        advance: z
            .string()
            .refine(
                (val) => {
                    if (val === "") return true;
                    if (val.length < 2 || val.length > 6) return false;
                    if (!/^[0-9]+$/.test(val)) return false;
                    return true;
                },
                { message: "Advance must be 3-6 digits only (or leave empty)" }
            ),

        totalAmount: z.number(), 
    })
    .superRefine((values, ctx) => {
        const advance = Number(values.advance || 0);
        const totalAmount = values.totalAmount;

        if (advance > totalAmount) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Advance cannot be greater than Total Amount",
                path: ["advance"],
            });
        }
    });

export type OrderSchema = z.infer<typeof orderSchema>