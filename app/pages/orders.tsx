import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Pressable, Button, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableData,
  TableFooter,
} from '@/components/ui/table';

export default function Orders () {
    const [showInvoice, setShowInvoice] = useState(false)
    return (
        <SafeAreaView>
            <Pressable onPress={() => setShowInvoice(true)}>
                <Card size="lg" className="flex-row justify-between">
                    <Text>Customer Phone Number</Text>
                    <Badge size="sm" variant="solid" action="warning">
                        <BadgeText>Pending</BadgeText>
                    </Badge>
                </Card>
            </Pressable>
            <Modal
                visible={showInvoice}
                onRequestClose={() => setShowInvoice(false)}
                transparent={true}
                animationType="fade"
            >       
                <View className="flex-1 justify-center items-center">
                    <Card className="w-full">
                        
                        <View className="grid grid-col-1 gap-3">

                            <View className="flex-row justify-between items-center">
                                <Text className="font-semibold">Item Name</Text>
                                <Text className="font-semibold">Price</Text>
                                <Text className="font-semibold">QTY</Text>
                                <Text className="font-semibold">Sub Total</Text>
                            </View>

                            <View className="flex-row justify-between items-center">
                                <Text>Biriyani</Text>
                                <Text>7500</Text>
                                <Text>3</Text>
                                <Text>22500</Text>
                            </View>

                            <View className="grid grid-cols-1 gap-2">
                                <View className="flex-row justify-between items-center">
                                    <Text className="font-semibold">Total</Text>
                                    <Text>22500</Text>
                                </View>

                                <View className="flex-row justify-between items-center">
                                    <Text className="font-semibold">Advance</Text>
                                    <Text>500</Text>
                                </View>

                                <View className="flex-row justify-between items-center">
                                    <Text className="font-semibold">Balance</Text>
                                    <Text>22000</Text>
                                </View>
                            </View>

                        </View>
                        

                       


                        


                    </Card>
                </View>
                 
            </Modal>
                  
           

           
        </SafeAreaView>
    )
}