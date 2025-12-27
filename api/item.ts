import { Item } from "../types/Item";

export const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

export const fetchItem = async (id: string): Promise<Item> => {
    const response = await fetch(`${baseUrl}/api/items/${id}`);
    const data = await response.json()
    return data;
}

export const fetchItems = async () => {
    const response = await fetch(`${baseUrl}/api/items`);
    const data = await response.json()
    return data;
}

export const createItem = async (item: any) => {
    const response = await fetch(`${baseUrl}/api/items`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': "application/json"
        }
    })
    const data = await response.json()
    return data
}

export const deleteItem = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/items/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if(!response.ok) {
        throw  new Error("Failed to delete item")
    }
    return true
}