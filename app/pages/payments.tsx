import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, TextInput, FlatList, ActivityIndicator} from "react-native";
import { usePaymentStore } from "../store/paymentStore";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useToastStore } from "../store/toastStore";

export default function Payments () {
    const [showPaymentDetails, setPaymentDetails] = useState(false)
    const [selectedPaymentId, setSelectedPaymentId] = useState<String>('')
    const { payments, paymentsLoading, payingAmount, 
            paymentProcessing, updatePayingAmount, updatePayment, 
            getPayments } = usePaymentStore()

    const {toast} = useToastStore()

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
                setPaymentDetails(false)
        } catch (error) {
            console.log(error)
            toast('success', 'Success', 'Fail to Update Payment')
        }
        
    }

    return (
        <View className="flex-1 px-4">   
            <View className="flex-1 mt-6">  
                {paymentsLoading ? 
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size={"large"}/>
                    </View> : 
                payments.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text>No records</Text>
                    </View>
                ) : (
                <FlatList data={payments} keyExtractor={payment => payment.id}
                    ItemSeparatorComponent={() => <View style={{height:12}}/>}
                    renderItem={({item}) => (
                    <Pressable onPress={() => openPayment(item.id)}>
                        <Card size="lg" className="flex-row justify-between items-center">
                            <Text className="font-semibold">{item.customerPhoneNumber}</Text>
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
                            <View className="flex-col gap-2">
                                <View className="flex-row justify-between items-center">
                                    <Text>Amount to Pay</Text>
                                    <Text>{selectedPayment.amountToPay}</Text>
                                </View>
                                <View className="flex-row justify-between items-center">
                                    <Text >Paid So far</Text>
                                    <Text>{selectedPayment.paid}</Text>
                                </View>
                                <View className="flex-row justify-between items-center">
                                    <Text  >Paying</Text>
                                    <TextInput placeholder="0.00"  className="border border-gray-100 rounded-xl w-20"  keyboardType="number-pad"
                                        value={payingAmount.toString()} 
                                        onChangeText={(value) => {
                                            const payingAmount = Number(value)
                                            updatePayingAmount(payingAmount)
                                        }}
                                    />
                                </View>
                                <View className="flex-row justify-between items-center border-t-2 border-b-2 border-gray-200 mt-3">
                                    <Text  className="font-semibold mt-3 mb-3">Balance</Text>
                                    <Text className="font-semibold mt-3 mb-3">{selectedPayment.balance}</Text>
                                </View>
                                <View className="flex-col gap-3 mt-5">
                                <Button onPress={() => handleUpdatePayment(selectedPayment.id, payingAmount)} action="positive" className="rounded-xl" size="lg">
                                        {paymentProcessing ? <ButtonSpinner color="white" /> : 
                                        <ButtonText className="font-medium text-sm ml-2">
                                            Update Payment
                                        </ButtonText> }
                                    </Button>
                                </View>
                            </View>            
                        </Card>
                    </View>
                </Modal>
            )}  
            </View> 
        </View>
    )
}