import React from "react";
import { Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface TextAreaInputComponentProps {
	onChangeText: (text: string) => void;
	label: string;
	textInput: string;
	placeholder: string;
	numberOfLines?: number;
}

const TextAreaInputComponent = ({
	onChangeText,
	label,
	textInput,
	placeholder,
	numberOfLines = 4,
}: TextAreaInputComponentProps) => {
	const { themeVariables } = useTheme();
	return (
		<View className="w-full my-2">
			<Text className="text-lg mb-1" style={{ color: themeVariables.text }}>
				{label}
			</Text>
			<View className="rounded-lg" style={{ backgroundColor: themeVariables.primary }}>
				<View className="rounded-lg" style={{ zIndex: 1, backgroundColor: themeVariables.background }}>
					<TextInput
						style={{
							borderColor: themeVariables.primary,
							borderWidth: 1,
							color: themeVariables.text,
							textAlignVertical: "top",
						}}
						className="px-4 py-4 rounded-lg border-b-4"
						onChangeText={onChangeText}
						value={textInput}
						placeholder={placeholder}
						multiline
						numberOfLines={numberOfLines}
					/>
				</View>
			</View>
		</View>
	);
};

export default TextAreaInputComponent;
