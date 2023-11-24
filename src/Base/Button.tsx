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
	width?: string;
}

const ButtonComponent = ({
	onPress,
	content,
	disabled = false,
	bg = Color.PRIMARY,
	shadowColor = Color.SECONDARY,
	borderColor,
	borderWidth,
	width = "w-11/12",
}: ButtonComponentProps) => {
	return (
		<TouchableOpacity className={width} onPress={onPress} disabled={disabled}>
			<View
				className={"rounded-lg h-12"}
				style={{
					backgroundColor: disabled ? Color.GREY : `${shadowColor}`,
					borderColor: borderColor,
					borderWidth: borderWidth,
				}}>
				<View className={"rounded-lg h-11"} style={{ zIndex: 1, backgroundColor: disabled ? Color.GREY : `${bg}` }}>
					{typeof content === "string" ? (
						<Text className={"text-center font-bold text-xl py-3"} style={{ color: Color.WHITE }}>
							{content}
						</Text>
					) : (
						<View className={"p-3 justify-center"}>{content}</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ButtonComponent;
