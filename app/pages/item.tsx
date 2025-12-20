import { TextInput, View, Text } from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useItemStore } from "../store/itemStore";
import { ItemSchema, itemSchema } from "../types/Item";
import { useToastStore } from "../store/toastStore";
import { useRouter } from "expo-router";

export default function Item () {

    const router = useRouter()

    const { itemCreationLoading, createItem, getItems } = useItemStore()
 
    const { control, handleSubmit, formState: { errors }, reset} = useForm<ItemSchema>({
            resolver: zodResolver(itemSchema),
            defaultValues: {
                itemName: '',
                itemPrice: ''
            }
        })

    const { toast } = useToastStore()
    
        const onSubmit = async(data: ItemSchema) => {
            try {
                const item = {
                    name: data.itemName,
                    price: Number(data.itemPrice)
                }
                await createItem(item)
                getItems()
                toast("success", "Item created");
                reset({
                    itemName: '',
                    itemPrice: ''
                })
                router.push('/(tabs)/item')
            } catch (error) {
                toast('error', "Item creation failed")
            }
        }

    return (
        <View className="flex-1 justify-between px-4">
                    <View className="flex-col gap-6 mt-6">
                        <View className="flex-col gap-2">
                            <Text className="font-semibold">Item Name</Text>
                            <Controller
                            control={control}
                            name="itemName"
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput placeholder="Enter Item Name" className="border border-gray-100 rounded-xl bg-white" 
                                    onChangeText={onChange} 
                                    value={value}
                                    onBlur={onBlur}
                                    keyboardType="default"
                                />
                            )}
                            />
                            {errors.itemName && <Text className="text-red-500">{errors.itemName.message}</Text>}
                        </View>
                        <View className="flex-col gap-2">
                            <Text className="font-semibold">Item Price</Text>
                            <Controller
                            control={control}
                            name="itemPrice"
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput placeholder="Enter Item Price" className="border border-gray-100 rounded-xl bg-white" 
                                    onChangeText={onChange} 
                                    value={value}
                                    onBlur={onBlur}
                                    keyboardType="number-pad"
                                />
                            )}
                            />
                            {errors.itemPrice && <Text className="text-red-500">{errors.itemPrice.message}</Text>}
                        </View>  
                    </View>
                    <View className="mb-6">
                        <Button onPress={handleSubmit(onSubmit)} action="custom" className="bg-blue-500 active:bg-blue-500 hover:bg-blue-500 rounded-xl" size="lg">
                            {itemCreationLoading ? <View className="flex-row items-center ml-2">
            <ButtonText className="font-medium text-sm">
                Please wait
            </ButtonText>
            <ButtonSpinner color="white" className="ml-2" />
        </View> : 
                                <ButtonText className="font-medium text-sm ml-2">
                                    Save Item
                                </ButtonText> 
                            }
                        </Button>
                    </View>
                </View>
    )
}