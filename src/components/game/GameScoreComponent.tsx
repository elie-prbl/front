import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Color, FontSize } from "../../base/constant";

interface GameScoreComponentProps {
	bg: string;
	ml?: string;
	mr?: string;
	title: string;
	colorSubTitle: string;
	icon: string;
	score: string;
}

const GameScoreComponent = ({ bg, ml, mr, title, colorSubTitle, icon, score }: GameScoreComponentProps) => {
	return (
		<View className="w-1/2">
			<View className={`w-100 h-36 ${ml} ${mr} rounded-xl p-2 justify-between`} style={{ backgroundColor: bg }}>
				<Text className={`text-center ${FontSize.TEXT_XL}`} style={{ color: Color.WHITE }}>
					{title}
				</Text>
				<View
					className="w-full h-24 rounded-xl justify-center flex-row items-center py-4"
					style={{ backgroundColor: Color.WHITE }}>
					<FontAwesome5 name={icon} size={24} color={bg} />
					<Text className={`text-[\`${colorSubTitle}\`] text-center text-2xl pl-2`}>{score}</Text>
				</View>
			</View>
		</View>
	);
};

export default GameScoreComponent;
