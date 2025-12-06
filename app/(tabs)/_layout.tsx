import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useOrderStore } from "../store/orderStore";
import { usePaymentStore } from "../store/paymentStore";

export default function TabsLayout () {
    const { getOrders } = useOrderStore()
    const { getPayments } = usePaymentStore()
    
    return (
        <Tabs 
        screenOptions={
            {
            tabBarActiveTintColor: "green", 
            tabBarInactiveTintColor: "black",
            tabBarLabelStyle: {fontSize: 12, fontWeight: "bold"},
            tabBarStyle: {height: 75}
            }
        }>
            <Tabs.Screen
                name="index"
                options={
                    {   
                        title: "Home",
                        headerTitleStyle: {
                            fontWeight: "bold"
                        },
                        tabBarIcon: ({color}) => (
                            <Ionicons name="home-sharp" size={20} color={color}/>
                        )
                    }
                }
            />
            <Tabs.Screen
                name="order"
                options={
                    {
                        title: "Orders",
                        headerTitleStyle: {
                            fontWeight: "bold"
                        },
                        tabBarIcon: ({color}) => (
                            <Ionicons name="restaurant-sharp" size={20} color={color}/>
                        ),
                        headerRight: () => (
                            <Pressable className="mr-9" onPress={getOrders}>
                                <Ionicons name="reload-outline" size={25} color={"black"}/>
                            </Pressable>
                        )
                    }
                }
            />
            <Tabs.Screen
                name="payment"
                options={
                    {
                        title: "Payments",
                        headerTitleStyle: {
                            fontWeight: "bold"
                        },
                        tabBarIcon: ({color}) => (
                            <Ionicons name="cash-sharp" size={20} color={color}/>
                        ),
                        headerRight: () => (
                            <Pressable className="mr-9" onPress={getPayments}>
                                <Ionicons name="reload-outline" size={25} color={"black"}/>
                            </Pressable>
                        )
                    }
                }
            />
        </Tabs>
    )
}