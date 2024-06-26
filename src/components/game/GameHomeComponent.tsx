import React from "react";
import { Text, View } from "react-native";
import CircleComponent from "../../base/Circle";
import Game1 from "../../svg/Game1";

interface GameHomeComponentProps {
	nextQuiz: string;
}

const GameHomeComponent = ({ nextQuiz }: GameHomeComponentProps) => {
	return (
		<View className="justify-center flex-1 my-1">
			<View className="flex-row w-full items-center">
				<CircleComponent img={<Game1 />} isDisabled={false} isDone={false} isNext />
				<View className="flex-col ml-2 flex-1 justify-center">
					<Text>Continue à t'amuser !</Text>
					<Text>Prochain quiz : {nextQuiz}</Text>
				</View>
			</View>
		</View>
	);
};

export default GameHomeComponent;
