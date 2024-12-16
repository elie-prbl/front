import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Content, FontSize } from "../../base/constant";
import { useTheme } from "../../context/ThemeContext";

interface GameSnackBarComponentProps {
	title: string;
	bg: string;
	height: number;
	correctAnswer?: string;
	icon: string;
	colorIcon: string;
	colorContent: string;
}

const GameSnackBarComponent = ({
	title,
	bg,
	height,
	correctAnswer,
	icon,
	colorIcon,
	colorContent,
}: GameSnackBarComponentProps) => {
	const { themeVariables } = useTheme();

	return (
		<View
			className="absolute bottom-0 w-full"
			style={{ backgroundColor: themeVariables.background, zIndex: 1, height }}>
			<View className="flex-wrap flex-row items-center mx-4 mt-5">
				<FontAwesome5 name={icon} size={30} color={colorIcon} />
				<Text className="pl-2 text-2xl font-bold" style={{ color: colorContent }}>
					{title}
				</Text>
			</View>
			{title === Content.INCORRECT && (
				<Text className={`mx-4 mt-5 ${FontSize.TEXT_LG} font-bold`} style={{ color: colorContent }}>
					Réponse correcte : {correctAnswer}
				</Text>
			)}
		</View>
	);
};

export default GameSnackBarComponent;
