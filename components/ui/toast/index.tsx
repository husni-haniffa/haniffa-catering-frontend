import { Modal, View, Text, Pressable } from "react-native";
import { Card } from "../card";
import { useToastStore } from "@/app/store/toastStore";

const Toast = () => {
    const {visible, type, title, message} = useToastStore()
    if(!visible) return null

    const titleColor = type === "success" ? "text-green-700" : type === "error" ? "text-red-700" : "text-yellow-700"
    const borderColor = type === "success" ? "border border-2 border-green-700 bg-green-50" : type === "error" ? "border border-2 border-red-700 bg-red-50" : "border border-2 border-yellow-700 bg-yellow-50"

    return (
        <Modal
            visible
            transparent
            animationType="fade"
            statusBarTranslucent
            presentationStyle="overFullScreen"
        >
            <View className="flex-1 bg-black/50 justify-start items-center px-4 pt-16">
                <Card className={`rounded-xl ${borderColor} w-full flex-row items-center gap-4 `} >
                    <Text className={`text-lg font-semibold ${titleColor}`}>{title}</Text>
                    <Text className="font-semibold">{message}</Text>
                </Card>
            </View>
        </Modal>
    )
}

export default Toast