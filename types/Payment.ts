import { z } from 'zod'

export interface Payment {
    id: string
    customerPhoneNumber: number
    amountToPay: number
    paid: number
    balance: number
    paymentStatus: string
}

export const paymentSchema = z.object({
    customerPhoneNumber: z
        .string()
        .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits (Ex:- 0771234567)"),
    
    amountToPay: z
        .string()
        .refine(
            (val) => {
                if (val === "") return false;
                if (val.length < 3 || val.length > 6) return false;
                if (!/^[0-9]+$/.test(val)) return false;
                return true;
            },
            { message: "Amount must be 3-6 digits only" }
        ),
});

export const updatePaymentSchema = z.object({
    amountPaying: z
            .string()
            .refine(
                (val) => {
                    if (val === "") return false;
                    if (val.length < 3|| val.length > 6) return false;
                    if (!/^[0-9]+$/.test(val)) return false;
                    return true;
                },
                { message: "Advance must be 3-6 digits only and cannot be empty" }
            ),

    amountToPay: z.number(), 
})
.superRefine((values, ctx) => {
    const amountPaying = Number(values.amountPaying || 0);
    const amountToPay = values.amountToPay;

    if (amountPaying > amountToPay) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Advance cannot be greater than Total Amount",
                path: ["amountPaying"],
            });
        }
    });

export type UpdatePaymentSchema = z.infer<typeof updatePaymentSchema>

export type PaymentSchema = z.infer<typeof paymentSchema>


