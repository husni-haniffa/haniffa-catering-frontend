import { createItem, deleteItem, fetchItems } from "../api/item";
import { Item } from "../types/Item";
import { create } from 'zustand'
import { useToastStore } from "./toastStore";

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
        try {
            set({ itemsLoading: true })
            const data = await fetchItems()
            set({ items: data })
            return data
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        } finally {
            set({ itemsLoading: false })
        }
        
    },

    createItem: async(item) => {
        try {
            set({ itemCreationLoading: true })
            const response = await createItem(item)
            return response
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error
        } finally {
            set({ itemCreationLoading: false })
        }
        
    },

    deleteItem: async(id) => {
        try {
            set({ deletingItemId: id })
            const deleted = await deleteItem(id)
            if(deleted)
            useToastStore.getState().toast("success", "Item deleted")
        } catch (error: any) {
            useToastStore.getState().toast("error", error.message)
            throw error

            } finally {
            set((state) => ({ items: state.items.filter(item => item.id !== id), deletingItemId: null }))  
        }

    }

}))