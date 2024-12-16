import React from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface TextComponentProps extends TextProps {
	className?: string;
	content: string | number | undefined;
	bold?: boolean;
	isError?: boolean;
}

const TextComponent = ({ bold, className = "", style, content, isError, ...props }: TextComponentProps) => {
	const { themeVariables } = useTheme();

	const finalClassName = `${className} ${bold ? "font-bold" : "font-normal"}`;

	return (
		<Text
			className={finalClassName}
			style={[{ color: isError ? themeVariables.textError : themeVariables.text }, style]}
			{...props}>
			{content}
		</Text>
	);
};

export default TextComponent;
