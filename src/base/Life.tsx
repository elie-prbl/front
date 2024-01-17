import { Text, View } from "react-native";
import { Color, FontSize } from "./constant";
import React from "react";
import Life from "../svg/Life";

interface LifeComponentProps {
	nb: number;
}

const LifeComponent = ({ nb }: LifeComponentProps) => {
	return (
		<View className="flex-row items-center">
			<Life />
			<Text className={`${FontSize.TEXT_XL} ml-1 font-bold`} style={{ color: Color.RED_LIGHT }}>
				{nb}
			</Text>
		</View>
	);
};

export default LifeComponent;
