import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
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
import { TagName, UserQuest } from "../../store/features/UserQuests/UserQuestsSlices";
import TextComponent from "../../base/Text";
import { useTheme } from "../../context/ThemeContext";
import { getUserSuccesses, updateUserSuccesses } from "../../store/features/UserSuccesses/UserSuccessesThunk";
import { UserSuccess } from "../../store/features/UserSuccesses/UserSuccessesSlices";

const GameQuizScore = ({ route }: RouteGameScoreProps) => {
	const { score, nbQuestions } = route.params;
	const navigation = useNavigation<MyNavigationProp>();
	const dispatch = useAppDispatch();
	const { userQuests, isModified } = useSelector((state: RootState) => state.userQuests);
	const { userSuccesses, isModifiedUserSuccess } = useSelector((state: RootState) => state.userSuccesses);
	const user = useAppSelector((state: RootState) => state.user.user);
	const quizWon = score === nbQuestions;
	const { themeVariables } = useTheme();

	const [retrieveUserQuestsWinGames, setRetrieveUserQuestsWinGames] = useState<(UserSuccess | UserQuest)[]>([]);
	const [retrieveUserQuestsPlayGames, setRetrieveUserQuestsPlayGames] = useState<(UserSuccess | UserQuest)[]>([]);
	const [retrieveUserSuccessesWinGames, setRetrieveUserSuccessesWinGames] = useState<(UserSuccess | UserQuest)[]>([]);
	const [retrieveUserSuccessesPlayGames, setRetrieveUserSuccessesPlayGames] = useState<(UserSuccess | UserQuest)[]>([]);

	useEffect(() => {
		if (user?.uuid) {
			dispatch(updateUserSuccesses({ user_uuid: user.uuid, success_id: 3 }));
		}
	}, [userSuccesses]);

	const filterByTag = (userParameter: UserQuest[] | UserSuccess[], type: string) => {
		const isUserQuest = (item: UserQuest | UserSuccess): item is UserQuest => type === "quests";
		const winGames = userParameter.filter(item => {
			const target = isUserQuest(item) ? item.quest : item.success;
			return (
				target.tag.name === "" ||
				target.tag.name === "WonQuizTag" ||
				target.tag.name === "PlayGameTag" ||
				target.tag.name === "PlayQuizTag"
			);
		});

		const playGames = userParameter.filter(item => {
			const target = isUserQuest(item) ? item.quest : item.success;
			return target.tag.name === "PlayGameTag" || target.tag.name === "PlayQuizTag";
		});

		return { winGames, playGames };
	};

	useEffect(() => {
		if (Array.isArray(userQuests)) {
			const { winGames, playGames } = filterByTag(userQuests, "quests");

			setRetrieveUserQuestsWinGames(winGames);
			setRetrieveUserQuestsPlayGames(playGames);
		}
	}, [userQuests]);

	// useEffect(() => {
	// 	if (Array.isArray(userQuests)) {
	// 		const winGames = userQuests.filter(
	// 			userQuest => userQuest.quest.tag.name === TagName.WinGames || userQuest.quest.tag.name === TagName.PlayGames,
	// 		);
	// 		const playGames = userQuests.filter(userQuest => userQuest.quest.tag.name === TagName.PlayGames);
	//
	// 		setRetrieveUserQuestsWinGames(winGames);
	// 		setRetrieveUserQuestsPlayGames(playGames);
	// 	}
	// }, [userQuests]);

	useEffect(() => {
		if (Array.isArray(userSuccesses)) {
			const { winGames, playGames } = filterByTag(userSuccesses, "successes");

			setRetrieveUserSuccessesWinGames(winGames);
			setRetrieveUserSuccessesPlayGames(playGames);
		}
	}, []);

	const handleResetHome = () => {
		if (user?.uuid) {
			if (quizWon) {
				retrieveUserQuestsWinGames.forEach(userQuest => {
					if ("quest_id" in userQuest) {
						dispatch(updateUserQuest({ user_uuid: user.uuid, quest_id: userQuest.quest_id }));
					}
				});
			} else {
				retrieveUserQuestsPlayGames.forEach(userQuest => {
					if ("quest_id" in userQuest) {
						dispatch(updateUserQuest({ user_uuid: user.uuid, quest_id: userQuest.quest_id }));
					}
				});
			}
		}
	};

	useEffect(() => {
		if (isModified) {
			dispatch(restartCurrentQuiz());
			navigation.navigate("TabNav", {
				screen: "Game",
			});
		}
	}, [isModified]);

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
