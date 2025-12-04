import { BASE_URL } from "@env";

export const createPayment = async (payment: any) => {
    const response = await fetch(`${BASE_URL}/api/payments`, {
        method: "POST",
        body: JSON.stringify(payment),
        headers: {
            'Content-Type': "application/json"
        }
    });
    const data = await response.json()
    return data

}

export const getPayments = async () => {
    const response = await fetch(`${BASE_URL}/api/payments`);
    const data = await response.json()
    return data

}

export const updatePayment = async (id: string, amount: number) => {
    const response = await fetch(`${BASE_URL}/api/payments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(amount),
        headers: {
            'Content-Type': "application/json"
        }
    });
    const data = await response.json()
    return data
}