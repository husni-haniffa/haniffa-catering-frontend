import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Pressable, Button, Modal, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Payments () {
    const [showPaymentDetails, setPaymentDetails] = useState(false)
    return (
        <SafeAreaView>
             
             <Pressable onPress={() => setPaymentDetails(true)}>
                <Card size="lg" className="flex-row justify-between">
                    <Text>Customer Phone Number</Text>
                    <Badge size="sm" variant="solid" action="warning">
                        <BadgeText>Pending</BadgeText>
                    </Badge>
                </Card>
             </Pressable>
                
            <Modal 
                visible={showPaymentDetails} 
                onRequestClose={() => setPaymentDetails(false)}
                transparent={true}
                animationType="fade"
            >   
                
                <View className="flex-1 justify-center items-center">
                    
                    <Card size="lg" className="w-full">

                        <View className="grid grid-cols-1 gap-2">
                            <View className="flex-row justify-between items-center">
                                <Text>Amount To Pay</Text>
                                <Text>50000</Text>
                            </View>

                            <View className="flex-row justify-between items-center">
                                <Text>Paid So far</Text>
                                <Text>Amount To Pay</Text>
                            </View>

                            <View className="flex-row justify-between items-center">
                                <Text>Paying</Text>
                                <TextInput placeholder="0.00" className="border-b" keyboardType="number-pad"/>
                            </View>

                            <View className="flex-col gap-3 mt-5">
                                <Button title="Save"/>
                                <Button title="Full Paid"/>
                            </View>
                        </View>
                        
                    </Card>
                </View>
               
            </Modal>



        
            
         
              
              
      
           
        </SafeAreaView>
    )
}