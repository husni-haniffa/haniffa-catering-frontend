import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useOrderStore } from "../../store/orderStore";

export default function Dashboard() {
  const {
    orderSummary,
    orderSummaryLoading,
    getOrderSummary,
  } = useOrderStore();

  useEffect(() => {
    getOrderSummary();
  }, [getOrderSummary]);

  if (orderSummaryLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="mb-1">Please wait</Text>
        <ActivityIndicator />
      </View>
    );
  }

  const orderedItems = Object.entries(orderSummary.itemCounts).map(
    ([key, value]) => ({ key, value })
  );

  if (orderedItems.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No records</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4">
      <FlatList
        className="mt-4"
        data={orderedItems}
        keyExtractor={(item) => item.key}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <Card size="lg" className="p-4">
              <Text className="font-semibold">{item.key}</Text>
              <Text className="font-semibold">{item.value}</Text>
            </Card>
          </View>
        )}
      />
    </View>
  );
}
