import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface TextComponentProps extends TextProps {
	className?: string;
	content: string | number | undefined;
	bold?: boolean;
}

const TextComponent = ({ bold, className = "", style, content, ...props }: TextComponentProps) => {
	const { themeVariables } = useTheme();

	const finalClassName = `${className} ${bold ? "font-bold" : "font-normal"}`;

	return (
		<Text className={finalClassName} style={[{ color: themeVariables.text }, style]} {...props}>
			{content}
		</Text>
	);
};

export default TextComponent;