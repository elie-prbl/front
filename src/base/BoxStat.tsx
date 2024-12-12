import React, { ReactElement } from "react";
import { View } from "react-native";
import TextComponent from "./Text";

interface BoxStatComponentProps {
	result: number | undefined;
	resultType: string;
	color: string;
	icon: ReactElement;
}

const BoxStatComponent = ({ color, result, resultType, icon }: BoxStatComponentProps) => {
	return (
		<>
			<View
				className="flex-row p-2 rounded-lg items-center"
				style={{ height: 70, width: 165, borderColor: `${color}`, borderBottomWidth: 4, borderWidth: 2 }}>
				<View className="w-10">{icon}</View>
				<View className="ml-4 flex-col items-start justify-start">
					<TextComponent content={resultType} />
					<TextComponent content={result} className="font-bold text-xl" />
				</View>
			</View>
		</>
	);
};

export default BoxStatComponent;
