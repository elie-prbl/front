import React, { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { FontSize } from "./constant";
import { useTheme } from "../context/ThemeContext";
import { color } from "@rneui/base";


interface BoxComponentProps {
	title: string | undefined;
	itemRight?: string | ReactElement;
	height?: string;
	children: any;
	onPress?: () => void;
}

const BoxComponent = ({ title, height, children, itemRight, onPress }: BoxComponentProps) => {
	const { themeVariables } = useTheme();
	return (
		<Pressable
			onPress={onPress}
			style={{ backgroundColor: themeVariables.background }}
			className={`${height} mx-2 my-1.5 p-4 rounded-lg`}>
			<View className="mb-2 flex-row justify-between ">
				<Text className={`${FontSize.TEXT_XL} font-bold`} style={{ color: themeVariables.text }}>
					{title}
				</Text>
				{typeof itemRight === "string" ? (
					<Text className={FontSize.TEXT_XL}>{itemRight}</Text>
				) : (
					<View>{itemRight}</View>
				)}
			</View>
			{children}
		</Pressable>
	);
};

export default BoxComponent;
