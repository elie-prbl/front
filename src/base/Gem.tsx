import Gem from "../svg/Gem";
import { Text, View } from "react-native";
import { Color, FontSize } from "./constant";
import React from "react";

interface GemComponentProps {
	nb?: number;
	fontSize?: string;
	widthGem?: number;
	heightGem?: number;
}

const GemComponent = ({ nb, fontSize = FontSize.TEXT_XL, widthGem, heightGem }: GemComponentProps) => {
	return (
		<View className="flex-row items-center">
			<Text className={`${fontSize} mr-1 font-bold`} style={{ color: Color.PRIMARY }}>
				{nb}
			</Text>
			<Gem width={widthGem} height={heightGem} />
		</View>
	);
};

export default GemComponent;
