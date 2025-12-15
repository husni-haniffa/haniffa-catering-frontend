import { createItem, deleteItem, fetchItems } from "../api/item";
import { Item } from "../types/Item";
import { create } from 'zustand'

interface State {
    items: Item[]
    itemsLoading: boolean
    itemCreationLoading: boolean
    deletingItemId: string | null
}

interface Action {
    getItems: () => Promise<Item[]>
    createItem: (item: any) => Promise<Item>
    deleteItem: (id: string) => void
}

export const useItemStore = create<State & Action>((set) => ({
    items: [],

    itemsLoading: false,

    itemCreationLoading: false,

    deletingItemId: null,

    getItems: async () => {
        set({itemsLoading: true})
        const data = await fetchItems()
        set({ itemsLoading: false })
        set({items: data})
        return data
    },

    createItem: async(item) => {
        set({itemCreationLoading: true})
        const response = await createItem(item)
        set({ itemCreationLoading: false })
        return response
    },

    deleteItem: async(id) => {
        set({ deletingItemId: id })
        await deleteItem(id)
        set((state) => ({items: state.items.filter(item => item.id !== id), deletingItemId: null}))
        
    }

}))