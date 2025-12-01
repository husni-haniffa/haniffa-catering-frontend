import { TextInput, View, Text } from "react-native";
import { usePaymentStore } from "../store/paymentStore";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useToastStore } from "../store/toastStore";
import { useFormStore } from "../store/validationStore";

export default function Payment () { 

    const { customerPhoneNumber, amountToPay, creatingPayment, 
            updateAmountToPay, createPayment, updateCustomerPhoneNumber } = usePaymentStore()

    const { values, errors, setField, validateField, validateAll } = useFormStore();

    const paymentRules = {
            customerPhoneNumber: (value: string) =>
                !value ? "Phone number required" :
                value.length !== 9 ? "Phone number must be 9 digits" : null,
            amountToPay: (value: number) =>
                !value ? "Amount required" : value <= 0 ? "Amount must be greater than 0" : null,
        };

    const { toast } = useToastStore()

    const handlePaymentProcess = async() => {
        
        try {
        const valid = validateAll(paymentRules);
        if (!valid) return;
            const payment = {
            customerPhoneNumber: Number(values.customerPhoneNumber),
            amountToPay: values.amountToPay
        }

            console.log(customerPhoneNumber, amountToPay)
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
        <View className="flex-1 justify-between px-4">
            <View className="flex-col gap-6 mt-6">
                <View className="flex-col gap-2">
                    <Text className="font-semibold">Phone Number</Text>
                    <TextInput placeholder="Enter Customer Phone Number" className="border border-gray-100 rounded-xl bg-white" 
                        keyboardType="phone-pad"
                        value={values.customerPhoneNumber}
                        onChangeText={(text) => setField("customerPhoneNumber", text)}
                        onBlur={() => validateField("customerPhoneNumber", paymentRules.customerPhoneNumber)}
                       
                    />
                    {errors.customerPhoneNumber && <Text className="text-red-500">{errors.customerPhoneNumber}</Text>}
                </View>
                <View className="flex-col gap-2">
                    <Text className="font-semibold">Amount</Text>
                    <TextInput placeholder="Enter Customer Phone Number" className="border border-gray-100 bg-white rounded-xl" 
                        keyboardType="number-pad"
                        value={values.amountToPay}
                        onChangeText={(text) => setField("amountToPay", Number(text))}
                        onBlur={() => validateField("amountToPay", paymentRules.amountToPay)}
                    />
                    {errors.amountToPay && <Text className="text-red-500">{errors.amountToPay}</Text>}
                </View>  
            </View>
            <View className="mb-6">
                <Button onPress={handlePaymentProcess} action="custom" className="bg-blue-500 active:bg-blue-500 hover:bg-blue-500 rounded-xl" size="lg">
                    {creatingPayment ? <ButtonSpinner color="white" /> : 
                        <ButtonText className="font-medium text-sm ml-2">
                            Save Payment
                        </ButtonText> 
                    }
                </Button>
            </View>
        </View>
        
    )
}