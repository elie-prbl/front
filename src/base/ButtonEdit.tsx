import React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { Color } from "./constant";
import { Ionicons } from "@expo/vector-icons";

interface ButtonEditComponentProps {
	onPress: (event: GestureResponderEvent) => void;
	disabled?: boolean;
	buttonColor?: string;
	width?: string;
}

const ButtonEditComponent = ({
	onPress,
	disabled = false,
	buttonColor = Color.WHITE,
	width = "w-11/12",
}: ButtonEditComponentProps) => {
	return (
		<TouchableOpacity className={width} onPress={onPress} disabled={disabled}>
			<Ionicons name="create-outline" size={20} color={buttonColor} />
		</TouchableOpacity>
	);
};

export default ButtonEditComponent;
