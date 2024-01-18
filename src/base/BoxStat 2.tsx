import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { Color } from "./constant";
import Svg from "react-native-svg";
import Crown from "../svg/Crown";

interface BoxStatComponentProps {
	result: string;
	resultType: string;
	color: string;
	icon: ReactElement;
}

const BoxStatComponent = ({ color, result, resultType, icon }: BoxStatComponentProps) => {
	return (
		<>
			<View
				className={`flex-row p-2 rounded-lg items-center`}
				style={{ height: 70, width: 165, borderColor: `${color}`, borderBottomWidth: 4, borderWidth: 2 }}>
				<View className={`w-10`}>{icon}</View>
				<View className={`ml-4 flex-col items-start justify-start`}>
					<Text className={`text-${color}-600 font-bold text-xl`}>{result}</Text>
					<Text className="text-center text-gray-600">{resultType}</Text>
				</View>
			</View>
		</>
	);
};

export default BoxStatComponent;
