import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useOrderStore } from "../store/orderStore";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
    const {orderSummaryLoading, orderSummary, getOrderSummary} = useOrderStore()

    useEffect(() => {
        if(orderSummary == null) {
            getOrderSummary()
        }
    }, [])

    

    const orderedItems = Object.keys(orderSummary?.itemCounts).map(key => {
        return { key: key, value: orderSummary?.itemCounts[key] };
    });
    
    return (
        <View className="flex-1 px-4">
            {orderSummaryLoading ? 
                <View className="flex-1 justify-center items-center">
                    <Text className="mb-1">Please wait</Text>
                    <ActivityIndicator />
                </View>
            : orderSummary == null ? 
            <View className="flex-1 justify-center items-center"> 
                <Text>No records</Text>
            </View> : 
            <FlatList
                className="mt-4"
                data={orderedItems}
                keyExtractor={(item) => item.key}
                numColumns={2}
                columnWrapperStyle={{ gap: 12 }}   
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        <Card size="lg" className="p-4">
                            <Text className="font-semibold text-xl">{item.key}</Text>
                            <Text className="font-semibold text-lg">{item.value}</Text>
                        </Card>
                    </View>)}
            />  
            }
        </View>  
    )
}