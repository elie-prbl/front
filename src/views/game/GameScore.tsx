import React from "react";
import Layout from "../../base/Layout";
import { Text, View } from "react-native";
import { Color, Content, FontSize } from "../../base/constant";
import GameScoreComponent from "../../components/game/GameScoreComponent";
import ButtonComponent from "../../base/Button";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp, RouteGameScoreProps } from "../../navigation/AppNavigator";
import { useAppDispatch } from "../../store/hooks";
import { restartCurrentQuiz } from "../../store/features/Quiz/CurrentQuizSlice";
import { updateQuestsQuiz, updateQuestsQuizWon } from "../../store/features/Quests/QuestsSlices";
import { updateUserQuizWon, updateUserXp } from "../../store/features/User/UserSlices";
import { updateSuccessQuiz, updateSuccessQuizWon } from "../../store/features/Success/SuccessSlices";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const GameScore = ({ route }: RouteGameScoreProps) => {
	const { score, nbQuestions } = route.params;
	const navigation = useNavigation<MyNavigationProp>();
	const dispatch = useAppDispatch();
	const quests = useSelector((state: RootState) => state.quests.quests);
	const quizWon = score === nbQuestions;

	const handleResetHome = () => {
		dispatch(restartCurrentQuiz());
		navigation.navigate("TabNav", {
			screen: "Game",
		});
		if (quizWon) {
			dispatch(updateQuestsQuizWon());
			dispatch(updateSuccessQuizWon());
			dispatch(updateUserQuizWon());
		} else {
			dispatch(updateSuccessQuiz());
			dispatch(updateQuestsQuiz());
		}
		quests.map(quest => {
			if (quest.progress === quest.done_condition) {
				dispatch(updateUserXp(quest.xp));
			}
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
