import React from "react";
import { Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";

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
