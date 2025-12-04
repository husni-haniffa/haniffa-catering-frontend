import { fetchItems } from "../api/item";
import { Item } from "../types/Item";
import { create } from 'zustand'

interface State {
    items: Item[]
    itemsLoading: boolean
}

interface Action {
    getItems: () => Promise<Item[]>
}

export const useItemStore = create<State & Action>((set) => ({
    items: [],

    itemsLoading: false,

    getItems: async () => {
        set({itemsLoading: true})
        const data = await fetchItems()
        set({ itemsLoading: false })
        set({items: data})
        return data
    }
    
}))