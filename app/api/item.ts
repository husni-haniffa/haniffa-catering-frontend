
import { Item } from "../types/Item";

export const fetchItem = async (id: string): Promise<Item> => {
    const response = await fetch(`http://192.168.8.104:8080/api/items/${id}`);
    const data = await response.json()
    console.log(data)
    return data;
}

export const fetchItems = async () => {
    const response = await fetch(`http://192.168.8.104:8080/api/items`);
    const data = await response.json()
    console.log(data)
    return data;
}