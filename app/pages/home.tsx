import { Card } from "@/components/ui/card";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home () {
   const router = useRouter()
    return (
        <SafeAreaView className="flex-col gap-6">
            <Pressable onPress={() => router.push('/pages/items')}>
                <Card size="lg" className="items-center text-2xl">
                    <Text>Order</Text>
                </Card>
            </Pressable>
            <Pressable onPress={() => router.push('/pages/payment')}>
                <Card size="lg" className="items-center">
                    <Text>Payment</Text>
                </Card>
            </Pressable>
        </SafeAreaView>
    )
}