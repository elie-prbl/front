import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { Color, Content } from "../../base/constant";
import GameScoreComponent from "../../components/game/GameScoreComponent";
import ButtonComponent from "../../base/Button";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp, RouteGameDualQuizScoreProps } from "../../navigation/AppNavigator";
import { useAppDispatch } from "../../store/hooks";
import { restartCurrentQuiz } from "../../store/features/Quiz/CurrentQuizSlice";
import Planet from "../../svg/Planet";

const GameDualQuizScore = ({ route }: RouteGameDualQuizScoreProps) => {
	const { isDraw, isWinner, myScore, scorePlayer, nbQuestions } = route.params;
	const navigation = useNavigation<MyNavigationProp>();
	const dispatch = useAppDispatch();

	const handleResetHome = () => {
		dispatch(restartCurrentQuiz());
		navigation.navigate("TabNav", {
			screen: "Game",
		});
	};

	return (
		<SafeAreaView style={{ backgroundColor: Color.WHITE }}>
			<View className="h-full justify-between mx-4">
				<View className="h-1/2">
					<Planet />
				</View>
				{isDraw ? (
					<Text className="font-bold text-2xl text-center">{Content.DRAW}</Text>
				) : isWinner ? (
					<Text className="font-bold text-2xl text-center">{Content.WINNER}</Text>
				) : (
					<Text className="font-bold text-2xl text-center">{Content.LOSER}</Text>
				)}
				<View>
					<View className="flex-wrap flex-row my-4">
						<Text className="text-lg w-1/2 text-center">Vous</Text>
						<Text className="text-lg w-1/2 text-center">Adversaire</Text>
					</View>
					<View className="flex-wrap flex-row justify-center">
						<GameScoreComponent
							bg={Color.GOLD}
							mr="mr-2"
							title={Content.SUCCESSFUL}
							colorSubTitle={Color.GOLD}
							icon="crown"
							score={`${myScore} / ${nbQuestions}`}
						/>
						<GameScoreComponent
							bg={Color.GOLD}
							mr="mr-2"
							title={Content.SUCCESSFUL}
							colorSubTitle={Color.GOLD}
							icon="crown"
							score={`${scorePlayer} / ${nbQuestions}`}
						/>
					</View>
				</View>
				<ButtonComponent
					onPress={handleResetHome}
					bg={Color.BLUE_BRIGHT_LIGHT}
					shadowColor={Color.BLUE_BRIGHT_DARK}
					content={Content.CONTINUE}
					width="w-full"
				/>
			</View>
		</SafeAreaView>
	);
};

export default GameDualQuizScore;
