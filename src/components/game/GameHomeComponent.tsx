import React from "react";
import { Text, View } from "react-native";
import CircleComponent from "../../base/Circle";
import Game1 from "../../svg/Game1";
import { nextQuiz } from "../../store/features/UserQuiz/UserQuizSlices";
import { useTheme } from "../../context/ThemeContext";
import TextComponent from "../../base/Text";

interface GameHomeComponentProps {
	nextQuiz: nextQuiz | undefined;
}

const GameHomeComponent = ({ nextQuiz }: GameHomeComponentProps) => {
	const { themeVariables } = useTheme();
	return (
		<View className="justify-center flex-1 my-1">
			<View className="flex-row w-full items-center">
				<CircleComponent img={<Game1 />} isDisabled={false} isDone={false} isNext />
				<View className="flex-col ml-2 flex-1 justify-center">
					<TextComponent content="Continue à t'amuser !" />
					<TextComponent content={`Prochain quiz : ${nextQuiz?.title}`} style={{ color: themeVariables.text }}/>
				</View>
			</View>
		</View>
	);
};

export default GameHomeComponent;
