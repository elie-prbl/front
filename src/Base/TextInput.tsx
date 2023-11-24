import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { Color } from "./constant";

interface TextInputComponentProps {
	onChangeText: (text: string) => void;
	label: string;
	textInput: string;
	keyboardType?: KeyboardTypeOptions;
	placeholder: string;
	icon?: string;
}

const TextInputComponent = ({
	onChangeText,
	label,
	textInput,
	keyboardType = "default",
	placeholder,
	icon,
}: TextInputComponentProps) => {
	return (
		<View className={"w-11/12 my-2"}>
			<Text className={"text-lg mb-1"}>{label}</Text>
			<View className={"rounded-lg h-12"} style={{ backgroundColor: Color.PRIMARY }}>
				<View className={"rounded-lg"} style={{ zIndex: 1, backgroundColor: Color.WHITE }}>
					<TextInput
						style={{ borderColor: Color.PRIMARY, borderWidth: 1 }}
						className={"px-4 rounded-lg h-11"}
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
