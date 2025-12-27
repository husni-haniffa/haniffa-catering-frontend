import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Modal, Text, TextInput, View } from "react-native";

import { useOrderStore } from "../../store/orderStore";
import { Order } from "@/types/Order";
;;

export default function Orders () {

    const [showInvoice, setShowInvoice] = useState(false)

    const { orders, ordersLoading, searchQuery, 
            orderCancelId, orderPaidId, orderDeliveredId, 
            orderPaymentTypeBankId, orderPaymentTypeCashId, orderPaymentTypeCash,
            updateSearchQuery, getOrders, cancelOrder, 
            orderPaid, orderDelivered, orderPaymentTypeBank } = useOrderStore()
    
    const filteredOrders = searchQuery === "" ? orders : 
    orders.filter((order) => order.customerPhoneNumber.toString().includes(searchQuery))

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
            {ordersLoading ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="mb-1">Please wait</Text>
                    <ActivityIndicator/>
                </View> ) :  
            !ordersLoading && filteredOrders.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Text>No records</Text>
                </View>
            ) : 
            (
                <FlatList data={filteredOrders} keyExtractor={(order, index) => order.id ?? index.toString()}
                    ItemSeparatorComponent={() => <View style={{height:12}}/>}
                    renderItem={({item}) => (
                        <Card size="lg" className="flex-col gap-3">

                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="font-semibold">Order: {item.id}</Text>
                                    <Text>{item.customerPhoneNumber}</Text>
                                </View>
                                <Badge size="sm" variant="solid" action={item.orderStatus === "PENDING" ? "warning" : item.orderStatus === "CANCELLED" ? "error" : "success"}>
                                    <BadgeText>{item.orderStatus}</BadgeText>
                                </Badge>
                            </View>

                            <View className="flex-row justify-between items-center">
                                <Text>Payment</Text>
                                <Badge size="sm" variant="solid" action={item.orderPaymentStatus === "PENDING" ? "error" : "success"}>
                                    <BadgeText>{item.orderPaymentStatus}</BadgeText>
                                </Badge>
                            </View>

                            <View className="flex-row justify-between items-center">
                                <Badge size="sm" variant="solid" action={item.orderPaymentType === "BANK" ? "info" : "warning"}>
                                    <BadgeText>Payment {item.orderPaymentType}</BadgeText>
                                </Badge>
                                {item.orderPaymentType === "BANK" ? <Button className={`rounded-xl bg-yellow-500 ${item.orderStatus === "CANCELLED" ? 'opacity-75': ""}`} 
                                            action="custom" 
                                            onPress={() => orderPaymentTypeCash(item.id?.toString() ?? "0")} 
                                            disabled={item.orderStatus === "CANCELLED"}
                                            >
                                         {orderPaymentTypeCashId === item.id ? <ActivityIndicator/> : <ButtonText>Change Cash</ButtonText>}
                                    </Button> : <Button className={`rounded-xl bg-blue-900 ${item.orderStatus === "CANCELLED" ? 'opacity-75': ""}`} 
                                            action="custom" 
                                            onPress={() => orderPaymentTypeBank(item.id?.toString() ?? "0")} 
                                             disabled={item.orderStatus === "CANCELLED"}
                                            >
                                        {orderPaymentTypeBankId === item.id ? <ActivityIndicator/> : <ButtonText>Change Bank</ButtonText>}
                                    </Button>}
                                
                                
                            </View>

                            <View className="flex-row items-center gap-3 mt-3">
                                <View className="flex-1">
                                    <Button className={`rounded-xl ${item.orderStatus === "CANCELLED" || item.orderStatus === "DELIVERED" || orderCancelId === item.id ? 'opacity-75' : ''}`} 
                                            action="negative" 
                                            onPress={() => cancelOrder(item.id?.toString() ?? "0")} 
                                            disabled={
                                                item.orderStatus === "CANCELLED" ||
                                                item.orderStatus === "DELIVERED" || orderCancelId === item.id
                                                }>
                                        {orderCancelId === item.id ? <ActivityIndicator/> : <ButtonText>Cancel</ButtonText>}
                                    </Button>
                                </View>
                                <View className="flex-1">
                                    <Button className="rounded-xl" onPress={() => openInvoice(item)} action="positive">
                                        <ButtonText>Invoice <Ionicons name="eye-sharp"/></ButtonText>
                                    </Button>
                                </View>
                            </View>
                             <View className="flex-1 mt-2">
                                    <Button className={`rounded-xl ${item.orderPaymentStatus === "PAID" || orderPaidId === item.id ? 'opacity-75' : ''}`}
                                            action="secondary" 
                                            onPress={() => orderPaid(item.id?.toString() ?? "0")}
                                            disabled={item.orderPaymentStatus === "PAID" || orderPaidId === item.id}>
                                            {orderPaidId === item.id ? <ActivityIndicator/> : <ButtonText>Paid</ButtonText>}
                                    </Button>
                                </View>
                
                        </Card>)}/>)}
           
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
                         <View className="flex-row items-center gap-3 mt-3">
                                <View className="flex-1">
                                    <Button className={`rounded-xl`}
                                            action="secondary" 
                                            onPress={() => setShowInvoice(false)}
                                           >
                                             <ButtonText>Close</ButtonText>
                                    </Button>
                                </View>
                                <View className="flex-1">
                                    <Button className={`rounded-xl ${selectedOrder.orderStatus === "CANCELLED" || selectedOrder.orderStatus === "DELIVERED" || orderDeliveredId === selectedOrder.id ? 'opacity-75' : ''}`}
                                        onPress={() => orderDelivered(selectedOrder.id?.toString() ?? "0")} action="positive"
                                        disabled={
                                        selectedOrder.orderStatus === "CANCELLED" || selectedOrder.orderStatus === "DELIVERED" || orderDeliveredId === selectedOrder.id}>
                                        {orderDeliveredId === selectedOrder.id ? <ActivityIndicator/> : <ButtonText>Delivered</ButtonText>}
                                    </Button>
                                </View>
                            </View>
                    </Card>
                </View> 
            </Modal>
           )}
        </View>
    )
}