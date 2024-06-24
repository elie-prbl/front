import React from "react";
import Layout from "../../base/Layout";
import { Text, View } from "react-native";
import { Color, Content, FontSize } from "../../base/constant";
import GameScoreComponent from "../../components/game/GameScoreComponent";
import ButtonComponent from "../../base/Button";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp, RouteGameDualQuizScoreProps } from "../../navigation/AppNavigator";
import { useAppDispatch } from "../../store/hooks";
import { restartCurrentQuiz } from "../../store/features/Quiz/CurrentQuizSlice";

const GameDualQuizScore = ({ route }: RouteGameDualQuizScoreProps) => {
	const { isWinner, myScore, scorePlayer, nbQuestions } = route.params;
	const navigation = useNavigation<MyNavigationProp>();
	const dispatch = useAppDispatch();

	const handleResetHome = () => {
		dispatch(restartCurrentQuiz());
		navigation.navigate("TabNav", {
			screen: "Game",
		});
	};

	return (
		<Layout>
			<View className="h-full justify-around items-center">
				<Text className={`font-bold ${FontSize.TEXT_XL}`}>{Content.LESSON_FINISHED}</Text>
				{isWinner ? <Text>Vous avez gagné</Text> : <Text>Vous avez perdu</Text>}
				<View>
					<Text className="m-4">Mon score</Text>
					<View className="flex-wrap flex-row justify-center">
						<GameScoreComponent
							bg={Color.GOLD}
							ml="ml-4"
							mr="mr-2"
							title={Content.SUCCESSFUL}
							colorSubTitle={Color.GOLD}
							icon="crown"
							score={`${myScore} / ${nbQuestions}`}
						/>
						<GameScoreComponent
							bg={Color.PRIMARY}
							mr="mr-4"
							ml="ml-2"
							title={Content.PRECISION}
							colorSubTitle={Color.PRIMARY}
							icon="bullseye"
							score={`${(myScore * 100) / nbQuestions} %`}
						/>
					</View>
					<Text className="m-4">Score de l'adversaire</Text>
					<View className="flex-wrap flex-row justify-center">
						<GameScoreComponent
							bg={Color.GOLD}
							ml="ml-4"
							mr="mr-2"
							title={Content.SUCCESSFUL}
							colorSubTitle={Color.GOLD}
							icon="crown"
							score={`${scorePlayer} / ${nbQuestions}`}
						/>
						<GameScoreComponent
							bg={Color.PRIMARY}
							mr="mr-4"
							ml="ml-2"
							title={Content.PRECISION}
							colorSubTitle={Color.PRIMARY}
							icon="bullseye"
							score={`${(scorePlayer * 100) / nbQuestions} %`}
						/>
					</View>
				</View>
				<ButtonComponent
					onPress={handleResetHome}
					bg={Color.BLUE_BRIGHT_LIGHT}
					shadowColor={Color.BLUE_BRIGHT_DARK}
					content={Content.CONTINUE}
				/>
			</View>
		</Layout>
	);
};

export default GameDualQuizScore;
