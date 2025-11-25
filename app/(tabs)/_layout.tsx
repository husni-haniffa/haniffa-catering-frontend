import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout () {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={
                    {   
                        title: "Home",
                        tabBarIcon: () => (
                            <Ionicons name="home" size={25}/>
                        )
                    }
                }
            />
            <Tabs.Screen
                name="order"
                options={
                    {
                        title: "Orders",
                        tabBarIcon: () => (
                            <Ionicons name="cafe" size={25}/>
                        )
                    }
                }
            />
            <Tabs.Screen
                name="payment"
                options={
                    {
                        title: "Payments",
                        tabBarIcon: () => (
                            <Ionicons name="cash-outline" size={25}/>
                        )
                    }
                }
            />
        </Tabs>
    )
}