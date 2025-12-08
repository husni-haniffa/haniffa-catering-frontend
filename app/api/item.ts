
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