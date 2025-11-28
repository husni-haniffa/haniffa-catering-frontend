import { Card } from "@/components/ui/card";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, Text, Pressable, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";
import { useToastStore } from "../store/toastStore";

export default function Cart () {

    const {cart, increaseQty, decreaseQty, clearCart} = useCartStore()
    const totalAmount = useCartStore((state) => state.getTotalAmount())
    const {order, placeOrder, customerName, customerPhoneNumber, 
        updateCustomerName, updateCustomerPhoneNumber, advance, updateAdvancePaid, placingOrder} = useOrderStore()
    const balance = useOrderStore((state) => state.getBalance(totalAmount, advance))
    const toast = useToastStore.getState().toast;
    const handlePlaceOrder = () => {
        try {
            const order = {
            customerName: customerName,
            customerPhoneNumber: customerPhoneNumber,
            items: cart,
            totalAmount: totalAmount,
            advance: advance,
            balance: balance
        }
        placeOrder(order)
        toast("success", "Success!", "Placed Order");
            clearCart()
            updateCustomerName("")
    updateCustomerPhoneNumber(0)  // or ""
    updateAdvancePaid(0, [])
        } catch (error) {
            toast("error", "Error!", "Failed to Place Order");
            console.log(error)
        }
        
    
        
    }
    return (
        <SafeAreaView>
           
            <Card size="lg" className="flex-col gap-3">
                 <View className="flex-col gap-2">
                    <Text>Name</Text>
                    <TextInput placeholder="Enter Customer Name" className="border rounded-md" onChangeText={updateCustomerName} value={customerName}/>
                </View>
                 <View className="flex-col gap-2">
                    <Text>Phone Number</Text>
                     <TextInput 
                     placeholder="Enter Customer Phone Number" 
                     className="border rounded-md" 
                     keyboardType="phone-pad" 
                     onChangeText={(value) => {
                        const number = Number(value) 
                        updateCustomerPhoneNumber(number)
                     }} 
                     value={customerPhoneNumber.toString()}/>
                </View>
               
            </Card>
            <View className="grid grid-cols-1 gap-3">
                <FlatList data={cart} keyExtractor={(cart) => cart.id}
                renderItem={({item}) => {
                    return (
                         <Card size="lg" className="flex-row justify-between items-center">
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.subTotal}</Text>
                </View>
                <View className="flex-row justify-between items-center gap-2">
                     <Pressable onPress={() => decreaseQty(item.id)}><Ionicons name="remove-outline" size={20}/></Pressable>
                    <Text>{item.quantity}</Text>
                    <Pressable onPress={() => increaseQty(item.id)}><Ionicons name="add-outline" size={20}/></Pressable>
                </View>
            </Card>
                    )
                }}
                />
            </View>
           
            <Card size="lg" className="flex-col gap-4">
                <View className="flex-row justify-between items-center">
                    <Text>Total</Text>
                    <Text>{totalAmount}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text>Advance</Text>
                    <TextInput placeholder="0.00" className="border rounded-md w-20" keyboardType="number-pad" 
                    value={advance.toString()} 
                    onChangeText={(value) => {
                        const advance = Number(value)
                        updateAdvancePaid(advance, cart)
                    }}
                    />
                </View>
                <View className="flex-row justify-between items-center">
                    <Text>Balance</Text>
                    <Text>{balance}</Text>
                </View>
            </Card>
             <Card size="lg" className="">
                <Button onPress={handlePlaceOrder}>
                    {placingOrder ? 
                        
      <ButtonText className="font-medium text-sm ml-2">
        <ButtonSpinner color="gray" /> Please wait...
      </ButtonText> 
                     : <ButtonText className="font-medium text-sm ml-2">
                            Place Order
      </ButtonText> }
                </Button>
                
            </Card>
        </SafeAreaView>
    )
}