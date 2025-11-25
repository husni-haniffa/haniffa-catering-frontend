import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, View, Text, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const items = [
  {
    id: "item_001",
    name: "Wireless Mouse",
    price: 2490,
  },
  {
    id: "item_002",
    name: "Water Bottle",
    price: 1850,
  },
  {
    id: "item_003",
    name: "Bluetooth Speaker",
    price: 5290,
  },
  {
    id: "item_004",
    name: "Notebook",
    price: 320,
  },
  {
    id: "item_005",
    name: "Gaming Keyboard",
    price: 8990,
  },
];

export default function Items () {
    const router = useRouter()
    return (
        <SafeAreaView className="flex-1 justify-between">
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
                <View>
                    <Button title="Add"/>
                </View>
            </Card>
            <Card className="flex-row justify-between items-center">
                <View>
                    <Text>Item Name</Text>
                    <Text>Item Price</Text>
                </View>
                <View>
                    <Button title="View cart" onPress={() => router.push('/pages/cart')}/>
                </View>
            </Card>
        </SafeAreaView>
    )
}