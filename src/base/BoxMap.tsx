import React, { ReactElement } from "react";
import { Pressable, View } from "react-native";
import { FontSize } from "./constant";
import { useTheme } from "../context/ThemeContext";
import TextComponent from "./Text";

interface BoxMapProps {
	height?: string;
	children: any;
	onPress?: () => void;
}

const BoxMap = ({ height, children, onPress }: BoxMapProps) => {
	const { themeVariables } = useTheme();
	return (
		<Pressable
			onPress={onPress}
			style={{ backgroundColor: themeVariables.background }}
			className={`${height} mx-2 my-1.5 p-4 rounded-lg`}>
			{children}
		</Pressable>
	);
};

export default BoxMap;
