import { Card } from "@/components/ui/card";
import { TextInput, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePaymentStore } from "../store/paymentStore";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useToastStore } from "../store/toastStore";





export default function Payment () { 
    const {customerPhoneNumber, amountToPay, creatingPayment, updateAmountToPay, createPayment, updateCustomerPhoneNumber } = usePaymentStore()
const toast = useToastStore.getState().toast;
    const handlePaymentProcess = async() => {
        try {
            const payment = {
            customerPhoneNumber: customerPhoneNumber,
            amountToPay: amountToPay
        }
        await createPayment(payment)
       
        toast("success", "Success!", "Payment Success");
        updateCustomerPhoneNumber(0)
        updateAmountToPay(0)
        } catch (error) {
            console.log(error)
            toast('error', "Error", "Payment Failed")
        }
        
    }
    return (
        <SafeAreaView className="flex-1 justify-between">
        
            <Card className="flex-col gap-4">
                <View className="flex-col gap-2">
                    <Text>Phone Number</Text>
                    <TextInput placeholder="Enter Customer Phone Number" className="border" keyboardType="phone-pad"
                     value={customerPhoneNumber.toString()} 
                    onChangeText={(value) => {
                        const customerPhoneNumber = Number(value)
                        updateCustomerPhoneNumber(customerPhoneNumber)
                    }}
                    />
                    
                </View>
                <View className="flex-col gap-2">
                    <Text>Amount</Text>
                    <TextInput placeholder="Enter Customer Phone Number" className="border" keyboardType="number-pad"
                    value={amountToPay.toString()} 
                    onChangeText={(value) => {
                        const amountToPay = Number(value)
                        updateAmountToPay(amountToPay)
                    }}
                    />
                </View>
            </Card>
            <Card>
                <Button onPress={handlePaymentProcess}>
                    {creatingPayment ? 
                        
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