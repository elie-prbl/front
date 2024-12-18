import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import { Color, Content } from "../../base/constant";
import GameScoreComponent from "../../components/game/GameScoreComponent";
import ButtonComponent from "../../base/Button";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp, RouteGameScoreProps } from "../../navigation/AppNavigator";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { restartCurrentQuiz } from "../../store/features/Quiz/CurrentQuizSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Planet from "../../svg/Planet";
import { updateUserQuest } from "../../store/features/UserQuests/UserQuestsThunk";
import { UserQuest, Category } from "../../store/features/UserQuests/UserQuestsSlices";
import TextComponent from "../../base/Text";
import { useTheme } from "../../context/ThemeContext";
import { updateUserSuccesses } from "../../store/features/UserSuccesses/UserSuccessesThunk";
import { UserSuccess } from "../../store/features/UserSuccesses/UserSuccessesSlices";
import Layout from "../../base/Layout";

const GameQuizScore = ({ route }: RouteGameScoreProps) => {
	const { score, nbQuestions } = route.params;
	const navigation = useNavigation<MyNavigationProp>();
	const dispatch = useAppDispatch();
	const { userQuests, isModifiedUserQuest, isLoadingUserQuest } = useSelector((state: RootState) => state.userQuests);
	const { userSuccesses, isModifiedUserSuccess, isLoadingUserSuccesses } = useSelector(
		(state: RootState) => state.userSuccesses,
	);
	const user = useAppSelector((state: RootState) => state.user.user);
	const { themeVariables } = useTheme();
	const [retrieveUserQuestByQuiz, setRetrieveUserQuestByQuiz] = useState<UserQuest[] | null>(null);
	const [retrieveUserSuccessByQuiz, setRetrieveUserSuccessByQuiz] = useState<UserSuccess[] | null>(null);

	useEffect(() => {
		if (Array.isArray(userSuccesses)) {
			const userSuccessesByQuiz = userSuccesses.filter(
				userSuccess =>
					userSuccess.success.short_name === Category.PlayQuizzes ||
					userSuccess.success.short_name === Category.WinQuizzes,
			);
			setRetrieveUserSuccessByQuiz(userSuccessesByQuiz);
		}
	}, [userSuccesses]);

	useEffect(() => {
		if (Array.isArray(userQuests)) {
			const userQuestsByQuiz = userQuests.filter(
				userQuest =>
					userQuest.quest.category === Category.PlayQuizzes || userQuest.quest.category === Category.WinQuizzes,
			);
			setRetrieveUserQuestByQuiz(userQuestsByQuiz);
		}
	}, [userQuests]);

	const handleResetHome = () => {
		if (user?.uuid && retrieveUserQuestByQuiz) {
			retrieveUserQuestByQuiz.forEach(userQuest => {
				dispatch(updateUserQuest({ user_uuid: user.uuid, quest_id: userQuest.quest_id }));
			});
		}
		if (user?.uuid && retrieveUserSuccessByQuiz) {
			retrieveUserSuccessByQuiz.forEach(userSuccess => {
				dispatch(updateUserSuccesses({ user_uuid: user.uuid, success_id: userSuccess.success_id }));
			});
		}
	};

	useEffect(() => {
		if (isModifiedUserQuest || isModifiedUserSuccess) {
			dispatch(restartCurrentQuiz());
			navigation.navigate("TabNav", {
				screen: "Game",
			});
		}
	}, [isModifiedUserQuest, isModifiedUserSuccess]);

	if (isLoadingUserQuest || isLoadingUserSuccesses) {
		return (
			<Layout>
				<ActivityIndicator size="large" color={themeVariables.primary} className="justify-center h-full" />
			</Layout>
		);
	}

	return (
		<SafeAreaView style={{ backgroundColor: themeVariables.background }}>
			<View className="h-full justify-between mx-4">
				<View className="h-1/2">
					<Planet />
				</View>
				<TextComponent content={Content.LESSON_FINISHED} className="font-bold text-2xl text-center" />
				<View className="flex-wrap flex-row justify-center">
					<GameScoreComponent
						bg={Color.GOLD}
						mr="mr-2"
						title={Content.SUCCESSFUL}
						colorSubTitle={Color.GOLD}
						icon="crown"
						score={`${score} / ${nbQuestions}`}
					/>
					<GameScoreComponent
						bg={Color.PRIMARY}
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
					width="w-full"
				/>
			</View>
		</SafeAreaView>
	);
};

export default GameQuizScore;
