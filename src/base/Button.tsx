import React, { ReactElement } from "react";
import { GestureResponderEvent, TouchableOpacity, Text, View } from "react-native";
import { Color } from "./constant";

interface ButtonComponentProps {
	onPress: (event: GestureResponderEvent) => void;
	content: string | ReactElement;
	disabled?: boolean;
	bg?: string;
	borderColor?: string;
	borderWidth?: number;
	shadowColor?: string;
	textColor?: string;
	width?: string;
	padding?: string;
}

const ButtonComponent = ({
	onPress,
	content,
	disabled = false,
	bg = Color.PRIMARY,
	shadowColor = Color.SECONDARY,
	borderColor,
	borderWidth,
	textColor = Color.WHITE,
	width = "w-11/12",
	padding = "",
}: ButtonComponentProps) => {
	return (
		<TouchableOpacity className={`${width} ${padding}`} onPress={onPress} disabled={disabled}>
			<View
				className="rounded-lg h-12"
				style={{
					backgroundColor: disabled ? Color.GREY : `${shadowColor}`,
					borderColor,
					borderWidth,
				}}>
				<View
					className="rounded-lg h-11 justify-center"
					style={{ zIndex: 1, backgroundColor: disabled ? Color.GREY : `${bg}` }}>
					{typeof content === "string" ? (
						<Text className="text-center font-bold text-xl" style={{ color: textColor }}>
							{content}
						</Text>
					) : (
						<View className="p-3 justify-center">{content}</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ButtonComponent;
