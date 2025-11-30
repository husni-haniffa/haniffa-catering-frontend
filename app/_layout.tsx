import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import './global.css'
import { StatusBar } from "react-native";
import { OverlayProvider } from "@gluestack-ui/core/overlay/creator";
import Toast from "@/components/ui/toast";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <OverlayProvider>
          <StatusBar barStyle={"dark-content"}/>
          <Toast/>
          <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="pages/items" options={{title: 'Select Items', headerTitleAlign: "center", headerTitleStyle: {fontWeight: "bold"}}}/>
            <Stack.Screen name="pages/cart" options={{title: 'Cart', headerTitleAlign: "center", headerTitleStyle: {fontWeight: "bold"}}}/>
            <Stack.Screen name="pages/payment" options={{title: 'Create Payment', headerTitleAlign: "center", headerTitleStyle: {fontWeight: "bold"}}}/>
          </Stack>
      </OverlayProvider>
    </GluestackUIProvider>
  )
}
