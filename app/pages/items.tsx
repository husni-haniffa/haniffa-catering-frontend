import { Card } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useItemStore } from "../store/itemStore";
import { useCartStore } from "../store/cartStore";
import { useEffect } from "react";
import { Button, ButtonText } from "@/components/ui/button";

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
        <View className="flex-1 justify-between">
          {itemsLoading ? ( 
              <View className="flex-1 justify-center items-center">
                <Text className="mb-1">Please wait</Text>
                <ActivityIndicator/>
              </View> 
            ) : items.length === 0 ? 
            ( <View className="flex-1 justify-center items-center">
                <Text>Items Empty</Text>
              </View> ) : 
            (
            <FlatList data={items} keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{height:12}}/>}
              renderItem={({item}) => {
                  const inCart = cart.find(c => c.id === item.id)
                  return (
                    <Card size="lg" className="flex-row justify-between items-center">
                      <View>
                          <Text className="font-semibold mb-1">{item.name}</Text>
                          <Text>{inCart ? inCart.subTotal : item.price}</Text>
                      </View>
                      {inCart ? (
                          <View className="flex-row justify-between items-center gap-3">
                          <Pressable className="bg-blue-50 rounded-full w-12 items-center p-3" onPress={() => decreaseQty(item.id)}>
                            <Ionicons name="remove-outline" size={20}/>
                          </Pressable>
                          <Text className="font-semibold">{inCart.quantity}</Text>
                          <Pressable className="bg-blue-100 rounded-full w-12 items-center p-3" onPress={() => increaseQty(item.id)}>
                            <Ionicons name="add-outline" size={20}/>
                          </Pressable>
                        </View>
                      ) : (
                          <View>
                            <Button action="custom" className="bg-blue-500 active:bg-blue-500 hover:bg-blue-500 rounded-xl" onPress={() => addToCart(item)}>
                              <ButtonText>Add <Ionicons name="add-sharp"/></ButtonText>
                            </Button>
                          </View>
                      )}
                    </Card>
                  )
              }}
            />
          )}
            
        {cart.length > 0 && (
          <Card className="flex-row justify-between items-center border-t-2 border-green-700 bg-green-50" size="lg">       
            <View>
                <Text className="mb-1">Items: {totalItems}</Text>
                <Text className="font-semibold">Total: {totalAmount}</Text>
            </View>             
            <View>
              <Button action="positive" className="rounded-xl" onPress={() => router.push('/pages/cart')} size="lg">
                <ButtonText>View Cart <Ionicons name="arrow-forward-sharp"/></ButtonText>
              </Button>
            </View>
          </Card>
        )}      
      </View>
    )
}