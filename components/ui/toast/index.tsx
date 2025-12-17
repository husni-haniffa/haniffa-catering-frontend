import { Modal, View, Text, Pressable } from "react-native";
import { useToastStore } from "@/app/store/toastStore";
import { Badge, BadgeText } from "../badge";

const Toast = () => {
    const {visible, type, message} = useToastStore()
    if(!visible) return null

    return (
        <Modal
            visible
            transparent
            animationType="fade"
            statusBarTranslucent
            presentationStyle="overFullScreen"
        >
            <View className="flex-1 bg-black/50 justify-start items-center px-4 pt-16">
                <Badge size="md" variant="outline" action={type === "success" ? "success" : type === "error" ? "error" : "warning"}>
                    <BadgeText>{message}</BadgeText>
                </Badge>
            </View>
        </Modal>
    )
}

export default Toast