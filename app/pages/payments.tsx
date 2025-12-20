import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, TextInput, FlatList, ActivityIndicator} from "react-native";
import { usePaymentStore } from "../store/paymentStore";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useToastStore } from "../store/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { updatePaymentSchema, UpdatePaymentSchema } from "../types/Payment";
import { Ionicons } from "@expo/vector-icons";
import { useOrderStore } from "../store/orderStore";


export default function Payments () {

    const {toast} = useToastStore()

    const [ showPaymentDetails, setPaymentDetails ] = useState(false)

    const { payments, paymentsLoading, paymentUpdating, 
            updatePayment, getPayments } = usePaymentStore()
    
    const { searchQuery, updateSearchQuery } = useOrderStore()

    const filteredPayments = searchQuery === "" ? payments : 
    payments.filter((payment) => payment.customerPhoneNumber.toString().includes(searchQuery))

    useEffect(() => {
        getPayments()
    }, [])
            
    const [selectedPaymentId, setSelectedPaymentId] = useState<string>('')

    let selectedPayment = payments.find(p => p.id === selectedPaymentId);
    
    const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdatePaymentSchema>({
            resolver: zodResolver(updatePaymentSchema),
                defaultValues: {
                    amountPaying: '',
                    amountToPay: 0
                }
            })
        
    useEffect(() => {
        if (selectedPayment) {
                reset({
                    amountPaying: '',
                    amountToPay: selectedPayment.amountToPay
                })
            }
        }, [selectedPayment, reset]
    )

    const openPayment = (id: string) => {
        setSelectedPaymentId(id)
        setPaymentDetails(true)
    }

    const onSubmit = async(data: UpdatePaymentSchema) => {
        try {   
            await updatePayment(selectedPaymentId, Number(data.amountPaying))
            toast('success', 'Payment Updated')
            reset({ amountPaying: '',})
        } catch (error) {
            toast('error', 'Failed to update payment')
        }
    }

    return (
        <View className="flex-1 px-4">
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
            <View className="flex-1 mt-4">  
                {paymentsLoading ? 
                    <View className="flex-1 justify-center items-center">
                        <Text className="mb-1">Please wait</Text>
                        <ActivityIndicator/>
                    </View> : 
                !paymentsLoading && filteredPayments.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text>No records</Text>
                    </View>
                ) : (
                <FlatList data={filteredPayments} keyExtractor={payment => payment.id}
                    ItemSeparatorComponent={() => <View style={{height:12}}/>}
                    renderItem={({item}) => (
                    <Pressable onPress={() => openPayment(item.id)}>
                        <Card size="lg" className="flex-row justify-between items-center">
                            <Text className="font-semibold">{item.customerPhoneNumber}</Text>
                            <Badge size="sm" variant="solid" action={item.paymentStatus === "PENDING" ? "error" : item.paymentStatus === "PARTIAL" ? "warning" : "success"}>
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
                                <View className="flex-col gap-1">
                                    <View className="flex-row justify-between items-center">
                                        <Text  >Paying Now</Text>
                                        <Controller
                                        control={control}
                                        name="amountPaying"
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <TextInput placeholder="Enter Amount" className="border border-gray-100 rounded-xl bg-white" 
                                                onChangeText={onChange} 
                                                value={value}
                                                onBlur={onBlur}
                                                keyboardType="number-pad"
                                            />
                                        )}
                                        />           
                                    </View>
                                   {errors.amountPaying && <Text className="text-red-500">{errors.amountPaying.message}</Text>}
                                </View>
                                <View className="flex-row justify-between items-center border-t-2 border-b-2 border-gray-200 mt-3">
                                    <Text  className="font-semibold mt-3 mb-3">Balance</Text>
                                    <Text className="font-semibold mt-3 mb-3">{selectedPayment.balance}</Text>
                                </View>
                                <View className="flex-col gap-3 mt-5">
                                    <Button onPress={handleSubmit(onSubmit) } action="positive" className="rounded-xl" size="lg">
                                        {paymentUpdating ? <View className="flex-row items-center ml-2">
            <ButtonText className="font-medium text-sm">
                Please wait
            </ButtonText>
            <ButtonSpinner color="white" className="ml-2" />
        </View> : 
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