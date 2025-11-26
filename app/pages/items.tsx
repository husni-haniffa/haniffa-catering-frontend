import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, View, Text, Button, Pressable, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useItemStore } from "../store/itemStore";
import { useCartStore } from "../store/cartStore";
import { useEffect } from "react";


export default function Items () {
    const router = useRouter()
    const {items, itemsLoading, getItems} = useItemStore()
    const {cart, addToCart, increaseQty, decreaseQty} = useCartStore()
    const totalItems = useCartStore((state) => state.getTotalItems())
const totalAmount = useCartStore((state) => state.getTotalAmount())

    useEffect(() => {
      getItems()
    }, [])
    return (
        <SafeAreaView className="flex-1 justify-between">
     
                {itemsLoading ? (<ActivityIndicator/>) : (
                  <FlatList data={items} keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                       const inCart = cart.find(c => c.id === item.id)
                       return (
                        <Card size="lg" className="flex-row justify-between items-center">
                          <View>
                              <Text>{item.name}</Text>
                              <Text>{inCart ? inCart.subTotal : item.price}</Text>
                          </View>
                          {inCart ? (
                             <View className="flex-row justify-between items-center gap-2">
                              <Pressable onPress={() => decreaseQty(item.id)}><Ionicons name="remove-outline" size={20}/></Pressable>
                                <Text>{inCart.quantity}</Text>
                              <Pressable onPress={() => increaseQty(item.id)}><Ionicons name="add-outline" size={20}/></Pressable>
                            </View>
                          ) : (
                              <View>
                                <Button title="Add" onPress={() => addToCart(item)}/>
                              </View>
                          )}
                        </Card>
                       )
                    }}
                  />
                )}
     
            {cart.length > 0 && (
              <Card className="flex-row justify-between items-center">
                <View>
                    <Text>{totalItems}</Text>
                    <Text>{totalAmount}</Text>
                </View>
                <View>
                    <Button title="View cart" onPress={() => router.push('/pages/cart')}/>
                </View>
            </Card>
            )}
            
        </SafeAreaView>
    )
}