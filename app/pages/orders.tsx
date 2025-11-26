import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Button, Modal, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableData,
  TableFooter,
} from '@/components/ui/table';
import { useOrderStore } from "../store/orderStore";
import { Order } from "../types/Order";

export default function Orders () {
    const [showInvoice, setShowInvoice] = useState(false)
    const {orders, orderProcessing, getOrders} = useOrderStore()
    const [selectedOrder, setSelectedOrder] = useState<Order>();
    useEffect(() => {
        getOrders()
    }, [])

    const openInvoice = (order: Order) => {
        setSelectedOrder(order)
        setShowInvoice(true)
    }
    return (
        <SafeAreaView>

            {orderProcessing ? <ActivityIndicator/> : (
                <FlatList data={orders} keyExtractor={(order, index) => order.id ?? index.toString()}
                    renderItem={({item}) => (
                         <Pressable onPress={() => openInvoice(item)}>
                                <Card size="lg" className="flex-row justify-between">
                                    <Text>{item.customerPhoneNumber}</Text>
                                    <Badge size="sm" variant="solid" action="warning">
                                        <BadgeText>Pending</BadgeText>
                                    </Badge>
                                </Card>
                            </Pressable>
                    )}
                />
            )}
           
           {selectedOrder && (
            <Modal
                visible={showInvoice}
                onRequestClose={() => setShowInvoice(false)}
                transparent={true}
                animationType="fade"
            >       
                <View className="flex-1 bg-black/50 justify-center items-center shadow-transparent">
                    <Card className="w-full">
                        
                        <View className="grid grid-col-1 gap-3">

                            <View className="flex-row justify-between items-center">
                                <Text className="font-semibold">Item Name</Text>
                                <Text className="font-semibold">Price</Text>
                                <Text className="font-semibold">QTY</Text>
                                <Text className="font-semibold">Sub Total</Text>
                            </View>

                            <FlatList
                                data={selectedOrder.items}
                                keyExtractor={(i, index) => index.toString()}
                                renderItem={({item}) => (
                                    <View className="flex-row justify-between items-center">
                                <Text>{item.name}</Text>
                                <Text>{item.price}</Text>
                                <Text>{item.quantity}</Text>
                                <Text>{item.subTotal}</Text>
                            </View>
                                )}
                            />
                            

                            <View className="grid grid-cols-1 gap-2">
                                <View className="flex-row justify-between items-center">
                                    <Text className="font-semibold">Total</Text>
                                    <Text>{selectedOrder.totalAmount}</Text>
                                </View>

                                <View className="flex-row justify-between items-center">
                                    <Text className="font-semibold">Advance</Text>
                                    <Text>{selectedOrder.advance}</Text>
                                </View>

                                <View className="flex-row justify-between items-center">
                                    <Text className="font-semibold">Balance</Text>
                                    <Text>{selectedOrder.balance}</Text>
                                </View>
                            </View>

                        </View>
                        

                       


                        


                    </Card>
                </View>
                 
            </Modal>
           )}
            
                  
           

           
        </SafeAreaView>
    )
}