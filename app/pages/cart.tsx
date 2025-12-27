import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CustomItem from "@/components/ui/custom-item";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";

import { useCartStore } from "../../store/cartStore";
import { useOrderStore } from "../../store/orderStore";
import { useToastStore } from "../../store/toastStore";
import { orderSchema, OrderSchema } from "@/types/Order";

export default function Cart () {

    const router = useRouter()

    const [customItem, setCustomItem] = useState(false)

    const { toast } = useToastStore()

    const { cart, increaseQty, decreaseQty, 
            clearCart, getTotalAmount } = useCartStore()

    const { orderCreationLoading, placeOrder, getOrders, 
            getBalance, } = useOrderStore()

    const totalAmount = getTotalAmount()

    const { control, handleSubmit, formState: { errors }, reset, watch} = useForm<OrderSchema>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            customerName: '',
            customerPhoneNumber: '',
            advance:'',
            totalAmount: totalAmount

        }
    })
   
    const advanceValue = watch('advance')
    const advance = advanceValue ? Number(advanceValue) : 0
    const balance = getBalance(totalAmount, advance)

    const onSubmit = async (data: OrderSchema) => {
         try {
            const order = {
                customerName: data.customerName,
                customerPhoneNumber: Number(data.customerPhoneNumber),
                items: cart,
                totalAmount: totalAmount,
                advance: Number(data.advance),
                balance: balance
            }
            await placeOrder(order)
            getOrders()
            reset({
                customerName: '',
                customerPhoneNumber: '',
                advance: '',
            })
            toast("success", "Order Placed");
            clearCart()
            router.push('/(tabs)/order')
        } catch (error) {
            toast("error", "Failed to place order");
        }
    }
       
    return (
        <View className="flex-1 justify-between">    
            <FlatList data={cart} keyExtractor={(cart) => cart.id}
                ItemSeparatorComponent={() => <View style={{height:12}}/>}
                ListHeaderComponent={() => (

                    <View className="px-4 flex-col gap-6 mt-6 mb-6">
                        <View className="flex-col gap-2">
                            <Text className="font-semibold">Name</Text>
                            <Controller
                                control={control}
                                name="customerName"
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput placeholder="Enter Customer Name" className="border border-gray-100 rounded-xl bg-white" 
                                        onChangeText={onChange} 
                                        value={value}
                                        onBlur={onBlur}
                                    />
                            )}/>
                            {errors.customerName && <Text className="text-red-500">{errors.customerName.message}</Text>}
                        </View>

                        <View className="flex-col gap-2">
                            <Text className="font-semibold">Phone Number</Text>
                            <Controller
                                control={control}
                                name="customerPhoneNumber"
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput placeholder="Enter Phone Number" className="border border-gray-100 rounded-xl bg-white" 
                                        onChangeText={onChange} 
                                        value={value}
                                        onBlur={onBlur}
                                        keyboardType="phone-pad"
                                    />
                            )}/>
                            {errors.customerPhoneNumber && <Text className="text-red-500">{errors.customerPhoneNumber.message}</Text>}
                        </View>
                    </View>)}

                renderItem={({item}) => {
                return (
                    <Card size="lg" className="flex-row justify-between items-center">
                        <View>
                            <Text className="font-semibold mb-1">{item.name}</Text>
                            <Text>{item.subTotal}</Text>
                        </View>
                        <View className="flex-row justify-between items-center gap-3">
                            <Pressable onPress={() => decreaseQty(item.id)} className="bg-blue-50 rounded-full w-12 items-center p-3">
                                <Ionicons name="remove-outline" size={20}/>
                            </Pressable>
                            <Text className="font-semibold">{item.quantity}</Text>
                            <Pressable onPress={() => increaseQty(item.id)} className="bg-blue-100 rounded-full w-12 items-center p-3">
                                <Ionicons name="add-outline" size={20}/>
                            </Pressable>
                        </View>
                    </Card>
                )}}

                ListFooterComponent={() => (
                    <View className="mt-4 px-4">
                        <Text className="font-semibold mb-2">Add a new item</Text>
                        <Button action="custom" className="bg-yellow-500 rounded-xl" onPress={() => setCustomItem(true)}>
                            <ButtonText>Add</ButtonText>
                        </Button>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={customItem}
                            onRequestClose={() => setCustomItem(false)}
                        >
                            <CustomItem onClose={() => setCustomItem(false)}/>
                        </Modal>
                    </View>
                )}/>

             <Card size="lg" className="mt-6 flex-col gap-2 bg-green-50 border-t-2 border-green-700">
                        <View className="flex-row justify-between items-center">
                            <Text>Total</Text>
                            <Text>{totalAmount}</Text>
                        </View>
                        <View className="flex-col gap-1">
                            <View className="flex-row justify-between items-center mb-2">
                                <Text>Advance</Text>
                                <Controller
                                    control={control}
                                    name="advance"
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput placeholder="0.00" className="border border-gray-100 rounded-xl bg-white w-20" 
                                            onChangeText={onChange} 
                                            value={value}
                                            onBlur={onBlur}
                                            keyboardType="number-pad"
                                        />
                                    )}/>
                            </View>
                            {errors.advance && <Text className="text-red-500">{errors.advance.message}</Text>}
                        </View>
                        <View className="flex-row justify-between items-center border-t-2 border-green-100">
                            <Text className="font-semibold mt-3">Balance</Text>
                            <Text className="font-semibold mt-3">{balance}</Text>
                        </View>
                        <Button action="positive" onPress={handleSubmit(onSubmit)} className="mb-6 rounded-xl mt-6" size="lg">
                            {orderCreationLoading ? <View className="flex-row items-center ml-2">
            <ButtonText className="font-medium text-sm">
                Please wait
            </ButtonText>
            <ButtonSpinner color="white" className="ml-2" />
        </View> : <ButtonText className="font-medium text-sm ml-2">Place Order</ButtonText>}
                        </Button>
                </Card>
        </View>
    )
}