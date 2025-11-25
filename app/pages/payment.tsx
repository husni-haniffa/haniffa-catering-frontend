import { Card } from "@/components/ui/card";
import { Button, TextInput, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment () {
    return (
        <SafeAreaView className="flex-1 justify-between">
            <Card className="flex-col gap-4">
                <View className="flex-col gap-2">
                    <Text>Phone Number</Text>
                    <TextInput placeholder="Enter Customer Phone Number" className="border" keyboardType="phone-pad"/>
                </View>
                <View className="flex-col gap-2">
                    <Text>Amount</Text>
                    <TextInput placeholder="Enter Customer Phone Number" className="border" keyboardType="number-pad"/>
                </View>
            </Card>
            <Card>
                <Button title="Save"/>
            </Card>
        </SafeAreaView>
    )
}