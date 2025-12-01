import { Card } from "@/components/ui/card";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, Text, Pressable, FlatList } from "react-native";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";
import { useToastStore } from "../store/toastStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Cart () {

    const router = useRouter()

    const { cart, increaseQty, decreaseQty, 
            clearCart, getTotalAmount } = useCartStore()

    const { customerName, customerPhoneNumber, advance, 
            placingOrder, placeOrder, updateCustomerName, 
            updateCustomerPhoneNumber, updateAdvancePaid, getOrders, getBalance } = useOrderStore()

    const totalAmount = getTotalAmount()
    const balance = getBalance(totalAmount, advance)

    const { toast } = useToastStore()

    useEffect(() => {
        getOrders()
    },[placeOrder])

    const handlePlaceOrder = async () => {
        try {
            const order = {
                customerName: customerName,
                customerPhoneNumber: customerPhoneNumber,
                items: cart,
                totalAmount: totalAmount,
                advance: advance,
                balance: balance
            }
            await placeOrder(order)
        
            toast("success", "Success!", "Placed Order");
            clearCart()
            updateCustomerName("")
            updateCustomerPhoneNumber(0) 
            router.push('/(tabs)') 
            updateAdvancePaid(0, [])
            
        } catch (error) {
            toast("error", "Error!", "Failed to Place Order");
            console.log(error)
        }
    }
       
    return (
        <View className="flex-1 justify-around">
            <View className="px-4 flex-col gap-6 mt-6 mb-6">
                <View className="flex-col gap-2">
                    <Text className="font-semibold">Name</Text>
                    <TextInput placeholder="Enter Customer Name" className="border border-gray-100 rounded-xl bg-white" 
                        onChangeText={updateCustomerName} 
                        value={customerName}
                    />
                </View>
                <View className="flex-col gap-2">
                    <Text className="font-semibold">Phone Number</Text>
                    <TextInput placeholder="Enter Customer Phone Number" className="border border-gray-100 rounded-xl bg-white" 
                        keyboardType="phone-pad" 
                        onChangeText={(value) => {
                            const number = Number(value) 
                            updateCustomerPhoneNumber(number)
                        }} 
                        value={customerPhoneNumber.toString()}/>
                </View>
            </View>
                 
            <FlatList data={cart} keyExtractor={(cart) => cart.id}
                ItemSeparatorComponent={() => <View style={{height:12}}/>}
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
            />
           
            <Card size="lg" className="flex-col gap-2 bg-green-50 border-t-2 border-green-700">
                <View className="flex-row justify-between items-center">
                    <Text>Total</Text>
                    <Text>{totalAmount}</Text>
                </View>
                <View className="flex-row justify-between items-center mb-2">
                    <Text>Advance</Text>
                    <TextInput placeholder="0.00" className="border border-gray-100 rounded-xl  w-20" 
                        keyboardType="number-pad" 
                        value={advance.toString()} 
                        onChangeText={(value) => {
                            const advance = Number(value)
                            updateAdvancePaid(advance, cart)
                        }}
                    />
                </View>
                <View className="flex-row justify-between items-center border-t-2 border-green-100">
                    <Text className="font-semibold mt-3">Balance</Text>
                    <Text className="font-semibold mt-3">{balance}</Text>
                </View>
                <Button action="positive" onPress={handlePlaceOrder} className="mb-6 rounded-xl mt-6" size="lg">
                    {placingOrder ? <ButtonSpinner color="white" /> : <ButtonText className="font-medium text-sm ml-2">Place Order</ButtonText>}
                </Button>
            </Card>
        </View>
    )
}