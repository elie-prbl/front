import React from "react";
import { GestureResponderEvent, TouchableOpacity, Text, View } from "react-native";
import { Color } from "./constant";

interface ButtonComponentProps {
	onPress: (event: GestureResponderEvent) => void;
	text: string;
	disabled?: boolean;
	bg?: string;
	shadowColor?: string;
}

const ButtonComponent = ({
	onPress,
	text,
	disabled = false,
	bg = Color.PRIMARY,
	shadowColor = Color.SECONDARY,
}: ButtonComponentProps) => {
	return (
		<TouchableOpacity className={"w-11/12"} onPress={onPress} disabled={disabled}>
			<View className={"rounded-lg h-12"} style={{ backgroundColor: disabled ? Color.GREY : `${shadowColor}` }}>
				<View className={"rounded-lg h-11"} style={{ zIndex: 1, backgroundColor: disabled ? Color.GREY : `${bg}` }}>
					<Text className={`text-center font-bold text-xl py-3`} style={{ color: Color.WHITE }}>
						{text}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ButtonComponent;
