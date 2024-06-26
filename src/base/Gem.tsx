import Gem from "../svg/Gem";
import { Text, View } from "react-native";
import { Color, FontSize } from "./constant";
import React from "react";

interface GemComponentProps {
	nb?: number;
}

const GemComponent = ({ nb }: GemComponentProps) => {
	return (
		<View className="flex-row items-start">
			<Gem />
			<Text className={`${FontSize.TEXT_XL} ml-1 font-bold`} style={{ color: Color.PRIMARY }}>
				{nb}
			</Text>
		</View>
	);
};

export default GemComponent;
