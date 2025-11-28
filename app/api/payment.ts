export interface IPayment {
    customerPhoneNumber: number
    amountToPay: number
}

export const createPayment = async (payment: IPayment) => {
    const response = await fetch(`http://192.168.8.105:8080/api/payments`, {
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
    const response = await fetch(`http://192.168.8.105:8080/api/payments`);
    const data = await response.json()
    return data

}

export const updatePayment = async (id: string, amount: number) => {
    const response = await fetch(`http://192.168.8.105:8080/api/payments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(amount),
        headers: {
            'Content-Type': "application/json"
        }
    });
    const data = await response.json()
    return data
}