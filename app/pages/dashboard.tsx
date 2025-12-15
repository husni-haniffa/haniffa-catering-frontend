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

    const summaryItems = orderSummary ? [
        { key: 'chickenBiriyani', label: 'Chicken Biriyani', value: orderSummary.chickenBiriyani },
        { key: 'beefBiriyani', label: 'Beef Biriyani', value: orderSummary.beefBiriyani },
        { key: 'muttonBiriyani', label: 'Mutton Biriyani', value: orderSummary.muttonBiriyani },
        { key: 'chicken', label: 'Chicken', value: orderSummary.chicken },
        { key: 'exChicken', label: 'Extra Chicken', value: orderSummary.exChicken },
        { key: 'exWattalapam', label: 'Extra Wattalapam', value: orderSummary.exWattalapam },
    ] : [];
    
    return (
        <View className="flex-1 px-4">
            {orderSummaryLoading ? <ActivityIndicator/> 
            : orderSummary == null ? 
            <View className="flex-1 justify-center items-center"> 
                <Text>No records</Text>
            </View> : 
            <FlatList
                className="mt-4"
                data={summaryItems}
                keyExtractor={(item) => item.key}
                numColumns={2}
                columnWrapperStyle={{ gap: 12 }}   
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        <Card size="lg" className="p-4">
                            <Text className="font-semibold text-xl">{item.label}</Text>
                            <Text className="font-semibold text-lg">{item.value}</Text>
                        </Card>
                    </View>)}
            />  
            }
        </View>  
    )
}