
import { Modal, View, Text, Pressable } from "react-native";
import { Card } from "../card";
import { useToastStore } from "@/app/store/toastStore";


const Toast = () => {
    const {visible, type, title, message} = useToastStore()
    if(!visible) return null

    const titleColor = type === "success" ? "text-green-600" : type === "error" ? "text-red-600" : "text-yellow-600"
    const borderColor = type === "success" ? "border border-2 border-green-600" : type === "error" ? "border border-2 border-red-600" : "border-none"

    return (
        <Modal
            visible
            transparent
            animationType="fade"
        >
            <View className="flex-1 bg-black/50 justify-center items-center px-4">
                <Card className={`rounded-xl ${borderColor} w-full`} >
                    <Text className={`text-lg font-semibold mb-1 ${titleColor}`}>{title}</Text>
                    <Text>{message}</Text>
                </Card>
            </View>
        </Modal>
    )
}

export default Toast