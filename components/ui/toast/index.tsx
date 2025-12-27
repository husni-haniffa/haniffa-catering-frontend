import { useToastStore } from "@/store/toastStore";
import { Modal, Text, View } from "react-native";

const Toast = () => {
    const {visible, type, message} = useToastStore()
    if(!visible) return null

    const color = type === "success" ? "bg-green-500" :
                  type=== "error" ? "bg-red-500" : "bg-yellow-500"

    return (
        <Modal
            visible
            transparent
            animationType="fade"
            statusBarTranslucent
            presentationStyle="overFullScreen"
        >
            <View className="absolute top-12 self-center">
                <View className={`${color} px-4 py-3 items-center rounded-3xl`}>
                    <Text className="text-white font-semibold">{message}</Text>
                </View>
            </View>
        </Modal>
    )
}

export default Toast