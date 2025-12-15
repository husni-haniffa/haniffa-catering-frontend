import { Item } from "../types/Item";

export const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

export const fetchItem = async (id: string): Promise<Item> => {
    const response = await fetch(`${baseUrl}/api/items/${id}`);
    const data = await response.json()
    console.log(data)
    return data;
}

export const fetchItems = async () => {
    const response = await fetch(`${baseUrl}/api/items`);
    const data = await response.json()
    console.log(data)
    return data;
}

export const createItem = async (item: any) => {
    const req = await fetch(``, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': "application/json"
        }
    })
    const res = await req.json()
    return res
}

export const deleteItem = async (id: string) => {
    const req = await fetch(`${baseUrl}/api/items/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const res = await req.json()
    if(!res) {
        return false
    }
    return true
}