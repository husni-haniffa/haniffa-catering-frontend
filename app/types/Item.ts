import { z } from 'zod'

export interface Item {
    id: string
    name: string
    price: number
}

export const itemSchema = z.object({
    itemName: z
    .string()
    .regex(/^[A-Za-z ]+$/, 'Item name must be only letters')
    .min(5, 'Item name must be within 5-20 charactors')
    .max(5, 'Item name must be within 5-20 charactors'),

    itemPrice: z
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
})

export type ItemSchema = z.infer<typeof itemSchema>