import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";import { usePaymentStore } from "../../store/paymentStore";
import { useToastStore } from "../../store/toastStore";
import { paymentSchema, PaymentSchema } from "@/types/Payment";

export default function Payment () { 

    const router = useRouter()

    const { payentCreationLoading, createPayment, getPayments } = usePaymentStore()

    const { control, handleSubmit, formState: { errors }, reset} = useForm<PaymentSchema>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            customerPhoneNumber: '',
            amountToPay: ''
        }
    })

    const { toast } = useToastStore()

    const onSubmit = async(data: PaymentSchema) => {
        try {
            const payment = {
                customerPhoneNumber: Number(data.customerPhoneNumber),
                amountToPay: Number(data.amountToPay)
            }
            await createPayment(payment)
            getPayments()
            toast("success", "Payment Saved");
            reset({
                customerPhoneNumber: '',
                amountToPay: ''
            })
            router.push('/(tabs)/payment')
        } catch (error) {
            toast('error', "Failed to save payment")
        }
    }


    return (
        <View className="flex-1 justify-between px-4">
            <View className="flex-col gap-6 mt-6">
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
                    )}
                    />
                    {errors.customerPhoneNumber && <Text className="text-red-500">{errors.customerPhoneNumber.message}</Text>}
                </View>
                <View className="flex-col gap-2">
                    <Text className="font-semibold">Amount</Text>
                    <Controller
                    control={control}
                    name="amountToPay"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput placeholder="Enter Amount To Pay" className="border border-gray-100 rounded-xl bg-white" 
                            onChangeText={onChange} 
                            value={value}
                            onBlur={onBlur}
                            keyboardType="number-pad"
                        />
                    )}
                    />
                    {errors.amountToPay && <Text className="text-red-500">{errors.amountToPay.message}</Text>}
                </View>  
            </View>
            <View className="mb-6">
                <Button onPress={handleSubmit(onSubmit)} action="custom" className="bg-blue-500 active:bg-blue-500 hover:bg-blue-500 rounded-xl" size="lg">
                    {payentCreationLoading ? 
                         <View className="flex-row items-center ml-2">
            <ButtonText className="font-medium text-sm">
                Please wait
            </ButtonText>
            <ButtonSpinner color="white" className="ml-2" />
        </View>
                        : 
                        <ButtonText className="font-medium text-sm ml-2">
                            Save Payment
                        </ButtonText> 
                    }
                </Button>
            </View>
        </View>
        
    )
}