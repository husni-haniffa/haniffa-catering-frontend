import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, FlatList, ActivityIndicator, TextInput } from "react-native";;;
import { useOrderStore } from "../store/orderStore";
import { Order } from "../types/Order";
import { Button, ButtonText } from "@/components/ui/button";

export default function Orders () {

    const [showInvoice, setShowInvoice] = useState(false)

    const { orders, ordersLoading, getOrders } = useOrderStore()
    
    const [selectedOrder, setSelectedOrder] = useState<Order>();

    useEffect(() => {
        getOrders()
    }, [])

    const openInvoice = (order: Order) => {
        setSelectedOrder(order)
        setShowInvoice(true)
    }

    return (
        <View className="flex-1 px-4 ">
            <View className="mb-6 mt-6 border border-gray-200 rounded-xl bg-white w-full flex-row items-center px-4 py-3">
                <TextInput
                    placeholder="Enter Phone Number"
                    className="flex-1 text-black"
                    keyboardType="default"
                />
                <Ionicons
                    name="search-sharp"
                    size={20}
                    color="gray"
                />
            </View>
            {ordersLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size={"large"}/>
                </View> ) :  
            orders.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Text>No records</Text>
                </View>
            ) : 
            (
                <FlatList data={orders} keyExtractor={(order, index) => order.id ?? index.toString()}
                    ItemSeparatorComponent={() => <View style={{height:12}}/>}
                    renderItem={({item}) => (
                        <Pressable onPress={() => openInvoice(item)}>
                            <Card size="lg" className="flex-col gap-2">
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="font-semibold">Order  {item.id}</Text>
                                        <Text className="text-gray-300">Order Date</Text>
                                    </View>
                                    <Badge size="sm" variant="solid" action="warning">
                                        <BadgeText>Pending</BadgeText>
                                    </Badge>
                                </View>
                                <View>
                                    <Text className="font-semibold">{item.customerPhoneNumber}</Text>
                                </View>
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
                    <Card className="w-full" size="lg">
                        <View className="flex-col gap-6">
                            <FlatList
                                data={selectedOrder.items}
                                keyExtractor={(i, index) => index.toString()}
                                ItemSeparatorComponent={() => <View style={{height:10}}/>}
                                renderItem={({item}) => (
                                    <View className="flex-row justify-between items-center">
                                        <View>
                                            <Text className="font-semibold">{item.name}</Text>
                                            <View className="flex-row gap-2">
                                                <Text>{item.price}</Text>
                                                <Text>*</Text>
                                                <Text>{item.quantity}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text>{item.subTotal}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                            <View className="flex-col gap-2 border-t-2 border-gray-200">
                                <View className="flex-row justify-between items-center mt-3">
                                    <Text className="font-semibold">Total</Text>
                                    <Text>{selectedOrder.totalAmount}</Text>
                                </View>
                                <View className="flex-row justify-between items-center mb-3">
                                    <Text className="font-semibold">Advance</Text>
                                    <Text>{selectedOrder.advance}</Text>
                                </View>
                                <View className="flex-row justify-between items-center border-t-2 border-b-2 border-gray-200">
                                    <Text className="font-semibold mt-3 mb-3">Balance</Text>
                                    <Text className="font-semibold mt-3 mb-3">{selectedOrder.balance}</Text>
                                </View>
                            </View>
                        </View>
                        <Button className="mt-3 rounded xl" action="positive" size="lg">
                            <ButtonText>Send Invoice</ButtonText>
                        </Button>
                    </Card>
                </View> 
            </Modal>
           )}
        </View>
    )
}