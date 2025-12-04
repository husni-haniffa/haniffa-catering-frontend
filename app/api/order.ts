import { BASE_URL } from "@env";
import { Order } from "../types/Order";

export const createOrder = async (order: Order) => {
    const response = await fetch('${BASE_URL}/api/orders', {
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
    const response = await fetch(`${BASE_URL}/api/orders`);
    const data = await response.json()
    console.log(data)
    return data;
}