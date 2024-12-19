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
			<Text className={`${FontSize.TEXT_XL} mr-1 font-bold`} style={{ color: Color.RED_PALE_LIGHT }}>
				{nb}
			</Text>
			<Life />
		</View>
	);
};

export default LifeComponent;
