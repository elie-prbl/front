import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { Color } from "./constant";
import { color } from "ansi-fragments";
import Svg from "react-native-svg";

interface BoxStatComponentProps {
	result: string;
	resultType: string;
	color: Color;
	icon: Svg;
}

const BoxStatComponent = ({ color, result, resultType }: BoxStatComponentProps) => {
	return (
		<>
			<View>
				<Svg></Svg>
				<View className={`border-2 border-${color} rounded-lg p-4 m-1 flex-row items-center justify-between`}>
					<Text className={`text-${color} font-semibold`}>{result}</Text>
					<Text className={`text-${color} font-semibold`}>{resultType}</Text>
				</View>
			</View>
		</>
	);
};

export default BoxStatComponent;
