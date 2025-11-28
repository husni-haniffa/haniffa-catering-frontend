import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, TextInput, FlatList, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Payment } from "../types/Payment";
import { usePaymentStore } from "../store/paymentStore";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useToastStore } from "../store/toastStore";

export default function Payments () {
    const [showPaymentDetails, setPaymentDetails] = useState(false)
    const [selectedPaymentId, setSelectedPaymentId] = useState<String>('')
    const {payments, paymentsLoading, getPayments, payingAmount, paymentProcessing, updatePayingAmount, updatePayment} = usePaymentStore()
    const toast = useToastStore((state) => state.toast)
    useEffect(() => {
            getPayments()
        }, [])
 const selectedPayment = payments.find(p => p.id === selectedPaymentId);
    const openPayment = (id: string) => {
            setSelectedPaymentId(id)
            setPaymentDetails(true)
        }

        const handleUpdatePayment = async (id: string, amount: number) => {
            try {   
                     
                    await updatePayment(id, amount)
                    toast('success', 'Success', 'Payment Updated')
            updatePayingAmount(0)
          getPayments()
            } catch (error) {
                console.log(error)
                toast('success', 'Success', 'Fail to Update Payment')
            }
           
        }
    return (
        <SafeAreaView>
        
             {paymentsLoading ? <ActivityIndicator/> : (
                 <FlatList data={payments} keyExtractor={payment => payment.id}
                    renderItem={({item}) => (
                        <Pressable onPress={() => openPayment(item.id)}>
                <Card size="lg" className="flex-row justify-between">
                    <Text>{item.customerPhoneNumber}</Text>
                    <Badge size="sm" variant="solid" action="warning">
                        <BadgeText>{item.paymentStatus}</BadgeText>
                    </Badge>
                </Card>
             </Pressable>
                    )}
                 />
             )}
           
             
            {selectedPayment && (
                <Modal 
                visible={showPaymentDetails} 
                onRequestClose={() => setPaymentDetails(false)}
                transparent={true}
                animationType="fade"
            >   
                
                <View className="flex-1 bg-black/50  justify-center items-center">
                    
                    <Card size="lg" className="w-full">

                        <View className="grid grid-cols-1 gap-2">
                            <View className="flex-row justify-between items-center">
                                <Text>Amount to Pay</Text>
                                <Text>{selectedPayment.amountToPay}</Text>
                                
                            </View>

                            <View className="flex-row justify-between items-center">
                                <Text>Paid So far</Text>
                                <Text>{selectedPayment.paid}</Text>
                            </View>

                            <View className="flex-row justify-between items-center">
                                <Text>Balance</Text>
                                <Text>{selectedPayment.balance}</Text>
                            </View>

                            <View className="flex-row justify-between items-center">
                                <Text>Paying</Text>
                                <TextInput placeholder="0.00" className="border-b" keyboardType="number-pad"
                                 value={payingAmount.toString()} 
                    onChangeText={(value) => {
                        const payingAmount = Number(value)
                        updatePayingAmount(payingAmount)
                    }}
                                />
                            </View>

                            <View className="flex-col gap-3 mt-5">
                               <Button onPress={() => handleUpdatePayment(selectedPayment.id, payingAmount)}>
                    {paymentProcessing ? 
                        
      <ButtonText className="font-medium text-sm ml-2">
        <ButtonSpinner color="gray" /> Please wait...
      </ButtonText> 
                     : <ButtonText className="font-medium text-sm ml-2">
                            Place Order
      </ButtonText> }
                </Button>
                                
                            </View>
                        </View>
                        
                    </Card>
                </View>
               
            </Modal>
            )}  
            



        
            
         
              
              
      
           
        </SafeAreaView>
    )
}