import React, { ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { FontSize } from "./constant";
import { useTheme } from "../context/ThemeContext";
import TextComponent from "./Text";

interface BoxComponentProps {
	title: string;
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
				<TextComponent content={title} className={`${FontSize.TEXT_XL} font-bold`} />
				{typeof itemRight === "string" ? (
					<TextComponent content={itemRight} className={`${FontSize.TEXT_XL} font-bold`}/>
				) : (
					<View>{itemRight}</View>
				)}
			</View>
			{children}
		</Pressable>
	);
};

export default BoxComponent;
