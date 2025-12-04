
import { BASE_URL } from "@env";
import { Item } from "../types/Item";

export const fetchItem = async (id: string): Promise<Item> => {
    const response = await fetch(`${BASE_URL}/api/items/${id}`);
    const data = await response.json()
    console.log(data)
    return data;
}

export const fetchItems = async () => {
    const response = await fetch(`${BASE_URL}/api/items`);
    const data = await response.json()
    console.log(data)
    return data;
}