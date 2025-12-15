import { View, Text, Pressable, FlatList, ActivityIndicator, TextInput } from "react-native";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useItemStore } from "../store/itemStore";
import { Ionicons } from "@expo/vector-icons";
import { useOrderStore } from "../store/orderStore";
export default function AllItems () {
    const { items, itemsLoading, deletingItemId, deleteItem, getItems } = useItemStore()
    useEffect(() => {
        getItems()
    }, [])
 const { searchQuery, updateSearchQuery } = useOrderStore()
 const filteredItems = searchQuery === "" ? items : 
    items.filter((item) => item.name.toString().includes(searchQuery))
    return (
        <View className="flex-1 px-4">
            <View className="mb-6 mt-6 border border-gray-200 rounded-xl bg-white w-full flex-row items-center px-4 py-3">
                <TextInput
                    placeholder="Enter Phone Number"
                    className="flex-1 text-black"
                    keyboardType="number-pad"
                    onChangeText={updateSearchQuery}
                    value={searchQuery}
                    
                />
                <Ionicons
                    name="search-sharp"
                    size={20}
                    color="gray"
                />
            </View>
            <View className="flex-1 mt-4">
                {itemsLoading ? 
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size={"large"}/>
                    </View> : 
                !itemsLoading && items.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text>No records</Text>
                    </View>
                ) : (
            <FlatList data={filteredItems} keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{height:12}}/>}
                    renderItem={({item}) => (
                        <Card size="lg" className="flex-row justify-between items-center">
                            <View className="flex-col gap-1">
                                 <Text className="font-semibold">{item.name}</Text>
                            <Text className="font-semibold">{item.price}</Text>
                            </View>
                           
                            <Pressable onPress={() => deleteItem(item.id)}>
                                {deletingItemId === item.id ? <ActivityIndicator/> : <Ionicons name="trash-bin-sharp" color="red" size={20}/>}
                            </Pressable>
                        </Card>
                    )}
                 />
                )}
            </View>
        </View>
    )
}