import { Order } from "../types/Order";
import { baseUrl } from "./item";

export const createOrder = async (order: Order) => {
    const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            'Content-Type': "application/json"
        }
    })
    const data = await response.json()
    return data
}

export const fetchOrders = async () => {
    const response = await fetch(`${baseUrl}/api/orders`);
    const data = await response.json()
    return data;
}

export const fetchOrderSummary = async () => {
    const response =  await fetch(`${baseUrl}/api/orders/summary`);
    const data = await response.json()
    return data
}

export const orderCancelled = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/orders/cancelled/${id}`, {
        method: "PUT"
    });
    const data = await response.json()
    return data
}

export const orderDelivered = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/orders/delivered/${id}`, {
        method: "PUT"
    });
    const data = await response.json()
    return data
}

export const orderPaid = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/orders/paid/${id}`, {
        method: "PUT"
    });
    const data = await response.json()
    return data
}

export const orderPaymentTypeBank = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/orders/bank/${id}`, {
        method: "PUT"
    });
    const data = await response.json()
    return data
}

export const orderPaymentTypeCash = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/orders/cash/${id}`, {
        method: "PUT"
    });
    const data = await response.json()
    return data
}