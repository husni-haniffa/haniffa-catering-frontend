import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, ButtonText } from "../button";
import { Card } from "../card";


export default function CustomItem ({onClose} : any) {
    
    const [form, setForm] = useState({name: "", price: "", qty: "1"})
    const { addToCart } = useCartStore()
   
    const item = {
        id: Math.random().toString(36).substring(7),
        name: form.name,
        price: Number(form.price),
        qty: Number(form.qty)
    }

    return (
        <View className="flex-1 bg-black/50 justify-center shadow-transparent">
            <Card size="lg">
                <View className="flex-col gap-3">
                    <TextInput 
                        placeholder="Item Name"
                        className="border border-gray-300 rounded-xl bg-white px-3 py-2"
                        keyboardType="default"
                        value={form.name}
                        onChangeText={(text) => setForm({...form, name: text })}
                    />
                    <View className="flex-row items-center gap-3">
                        <TextInput 
                            placeholder="Item Price"
                            className="flex-1 border border-gray-300 rounded-xl bg-white px-3 py-2"
                            keyboardType="number-pad"
                            value={form.price}
                            onChangeText={(text) => setForm({...form, price: text })}
                        />
                        <TextInput 
                            placeholder="QTY"
                            className="w-20 border border-gray-300 rounded-xl bg-white px-3 py-2"
                            keyboardType="number-pad"
                            value={form.qty}
                            onChangeText={(text) => setForm({...form, qty: text })}
                        />
                    </View>    
                    <View className="flex-row items-center gap-3">
                        <Button action="secondary" className="flex-1 rounded-xl" onPress={onClose}>
                            <ButtonText>Close</ButtonText>
                        </Button>
                        <Button onPress={() => addToCart(item)} action="positive" className="flex-1 rounded-xl">
                            <ButtonText>Add</ButtonText>
                        </Button>
                    </View>
                </View>
            </Card>
        </View>
       
    )
}