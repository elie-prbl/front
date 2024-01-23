import React from "react";
import Layout from "../../base/Layout";
import { Text, View } from "react-native";
import { Color, Content, FontSize } from "../../base/constant";
import GameScoreComponent from "../../components/game/GameScoreComponent";
import ButtonComponent from "../../base/Button";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp, RouteGameScoreProps } from "../../navigation/AppNavigator";
import { useAppDispatch } from "../../store/hooks";
import { restartCurrentQuizModule } from "../../store/features/QuizModules/CurrentQuizModuleSlice";
import { restartCurrentQuiz } from "../../store/features/Quiz/CurrentQuizSlice";

const GameScore = ({ route }: RouteGameScoreProps) => {
	const { score, nbQuestions } = route.params;
	const navigation = useNavigation<MyNavigationProp>();
	const dispatch = useAppDispatch();

	const handleResetHome = () => {
		dispatch(restartCurrentQuizModule());
		dispatch(restartCurrentQuiz());
		navigation.navigate("TabNav", {
			screen: "Game",
		});
	};

	return (
		<Layout>
			<View className="h-full justify-around items-center">
				<Text className={`font-bold ${FontSize.TEXT_XL}`}>{Content.LESSON_FINISHED}</Text>
				<View className="flex-wrap flex-row justify-center">
					<GameScoreComponent
						bg={Color.GOLD}
						ml="ml-4"
						mr="mr-2"
						title={Content.SUCCESSFUL}
						colorSubTitle={Color.GOLD}
						icon="crown"
						score={`${score} / ${nbQuestions}`}
					/>
					<GameScoreComponent
						bg={Color.PRIMARY}
						mr="mr-4"
						ml="ml-2"
						title={Content.PRECISION}
						colorSubTitle={Color.PRIMARY}
						icon="bullseye"
						score={`${(score * 100) / nbQuestions} %`}
					/>
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

export default GameScore;
