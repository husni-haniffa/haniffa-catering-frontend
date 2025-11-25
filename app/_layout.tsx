import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import './global.css'
import { StatusBar } from "react-native";
import { OverlayProvider } from "@gluestack-ui/core/overlay/creator";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <OverlayProvider>
          <StatusBar barStyle={"dark-content"}/>
          <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="pages/items" options={{title: 'Items'}}/>
            <Stack.Screen name="pages/cart" options={{title: 'Cart'}}/>
            <Stack.Screen name="pages/payment" options={{title: 'Payment'}}/>
          </Stack>
      </OverlayProvider>
    </GluestackUIProvider>
  )
}
