import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useItemStore } from "../../store/itemStore";
import { useOrderStore } from "../../store/orderStore";
import { usePaymentStore } from "../../store/paymentStore";

export default function TabsLayout () {
    const { getOrders, getOrderSummary } = useOrderStore()
    const { getPayments } = usePaymentStore()
    const { getItems } = useItemStore()
    
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
                name="dashboard"
                options={
                    {
                        title: "Dashboard",
                        headerTitleStyle: {
                            fontWeight: "bold"
                        },
                        tabBarIcon: ({color}) => (
                            <Ionicons name="speedometer-sharp" size={20} color={color}/>
                        ),
                        headerRight: () => (
                            <Pressable className="mr-9" onPress={getOrderSummary}>
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
            <Tabs.Screen
                name="item"
                options={
                    {
                        title: "Items",
                        headerTitleStyle: {
                            fontWeight: "bold"
                        },
                        tabBarIcon: ({color}) => (
                            <Ionicons name="fast-food-sharp" size={20} color={color}/>
                        ),
                        headerRight: () => (
                            <Pressable className="mr-9" onPress={getItems}>
                                <Ionicons name="reload-outline" size={25} color={"black"}/>
                            </Pressable>
                        )
                    }
                }
            />
        </Tabs>
    )
}