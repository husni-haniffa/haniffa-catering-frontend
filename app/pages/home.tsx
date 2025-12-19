import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home () {
    const router = useRouter()
    return (
        <View className="flex-col gap-6 px-4 mt-6">
            <Pressable onPress={() => router.push('/pages/items')}>
                <Card size="lg" className="flex-col gap-2">
                    <Ionicons name="cart-sharp" size={20} className="bg-green-50 rounded-full w-12 items-center p-3" color="green"/>
                    <Text className="text-xl font-semibold">Create Order</Text>
                </Card>
            </Pressable>
            <Pressable onPress={() => router.push('/pages/payment')}>
                <Card size="lg" className="flex-col gap-2">
                    <Ionicons name="wallet-sharp" size={20} className="bg-green-50 rounded-full w-12 items-center p-3" color="green"/>
                    <Text className="text-xl font-semibold">Create Payment</Text>
                </Card>
            </Pressable>
            <Pressable onPress={() => router.push('/pages/item')}>
                <Card size="lg" className="flex-col gap-2">
                    <Ionicons name="fast-food-sharp" size={20} className="bg-green-50 rounded-full w-12 items-center p-3" color="green"/>
                    <Text className="text-xl font-semibold">Create Item</Text>
                </Card>
            </Pressable>
      </View>
    )
}