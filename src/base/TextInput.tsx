import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface TextInputComponentProps {
	onChangeText: (text: string) => void;
	label: string;
	textInput: string;
	keyboardType?: KeyboardTypeOptions;
	placeholder: string;
	width?: string;
}

const TextInputComponent = ({
	onChangeText,
	label,
	textInput,
	keyboardType = "default",
	placeholder,
	width = "w-11/12",
}: TextInputComponentProps) => {
	const { themeVariables } = useTheme();
	return (
		<View className={`${width} my-2`}>
			<Text className="text-lg mb-1" style={{ color: themeVariables.text }}>
				{label}
			</Text>
			<View className="rounded-lg h-12" style={{ backgroundColor: themeVariables.primary }}>
				<View className="rounded-lg" style={{ zIndex: 1, backgroundColor: themeVariables.background }}>
					<TextInput
						style={{ borderColor: themeVariables.primary, borderWidth: 1, color: themeVariables.text }}
						className="px-4 rounded-lg h-11"
						onChangeText={onChangeText}
						value={textInput}
						keyboardType={keyboardType}
						placeholder={placeholder}
					/>
				</View>
			</View>
		</View>
	);
};

export default TextInputComponent;
