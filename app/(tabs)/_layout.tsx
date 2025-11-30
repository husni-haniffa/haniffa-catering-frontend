import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout () {
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
                        )
                    }
                }
            />
        </Tabs>
    )
}