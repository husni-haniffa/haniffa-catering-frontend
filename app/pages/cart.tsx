import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, Text, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart () {
    return (
        <SafeAreaView className="flex-1 justify-between">
            <Card size="lg" className="flex-col gap-3">
                 <View className="flex-col gap-2">
                    <Text>Name</Text>
                    <TextInput placeholder="Enter Customer Name" className="border rounded-md"/>
                </View>
                 <View className="flex-col gap-2">
                    <Text>Phone Number</Text>
                     <TextInput placeholder="Enter Customer Phone Number" className="border rounded-md" keyboardType="phone-pad"/>
                </View>
               
            </Card>
            <Card size="lg" className="flex-row justify-between items-center">
                <View>
                    <Text>Item Name</Text>
                    <Text>Item Price</Text>
                </View>
                <View className="flex-row justify-between items-center gap-2">
                     <Pressable><Ionicons name="remove-outline" size={20}/></Pressable>
                    <Text>0</Text>
                    <Pressable><Ionicons name="add-outline" size={20}/></Pressable>
                </View>
            </Card>
            <Card size="lg" className="flex-col gap-4">
                <View className="flex-row justify-between items-center">
                    <Text>Sub Total</Text>
                    <Text>0.00</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text>Advance</Text>
                    <TextInput placeholder="0.00" className="border rounded-md w-20" keyboardType="number-pad"/>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text>Balance</Text>
                    <Text>0.00</Text>
                </View>
            </Card>
             <Card size="lg" className="">
                <Button title="Place order"/>
            </Card>
        </SafeAreaView>
    )
}