import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { Color, Content } from "../../base/constant";
import GameScoreComponent from "../../components/game/GameScoreComponent";
import ButtonComponent from "../../base/Button";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp, RouteGameDualQuizScoreProps } from "../../navigation/AppNavigator";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { restartCurrentQuiz } from "../../store/features/Quiz/CurrentQuizSlice";
import Planet from "../../svg/Planet";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { UserQuest } from "../../store/features/UserQuests/UserQuestsSlices";
import { updateUserQuest } from "../../store/features/UserQuests/UserQuestsThunk";

const GameDualQuizScore = ({ route }: RouteGameDualQuizScoreProps) => {
	const { isDraw, isWinner, myScore, scorePlayer, nbQuestions, nameOpponent } = route.params;
	const navigation = useNavigation<MyNavigationProp>();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state: RootState) => state.user.user);
	const { userQuests, isModified } = useSelector((state: RootState) => state.userQuests);

	const [retrieveUserQuestsWinGames, setRetrieveUserQuestsWinGames] = useState<UserQuest[]>([]);
	const [retrieveUserQuestsPlayGames, setRetrieveUserQuestsPlayGames] = useState<UserQuest[]>([]);

	useEffect(() => {
		if (Array.isArray(userQuests)) {
			const winGames = userQuests.filter(
				userQuest =>
					userQuest.quest.tag.name === "WonGameTag" ||
					userQuest.quest.tag.name === "WonQuizTag" ||
					userQuest.quest.tag.name === "PlayGameTag" ||
					userQuest.quest.tag.name === "PlayQuizTag",
			);
			const playGames = userQuests.filter(
				userQuest => userQuest.quest.tag.name === "PlayGameTag" || userQuest.quest.tag.name === "PlayQuizTag",
			);

			setRetrieveUserQuestsWinGames(winGames);
			setRetrieveUserQuestsPlayGames(playGames);
		}
	}, [userQuests]);

	const handleResetHome = () => {
		if (user?.uuid) {
			if (isWinner) {
				retrieveUserQuestsWinGames.forEach(userQuest => {
					dispatch(updateUserQuest({ user_uuid: user.uuid, quest_id: userQuest.quest_id }));
				});
			} else {
				retrieveUserQuestsPlayGames.forEach(userQuest => {
					dispatch(updateUserQuest({ user_uuid: user.uuid, quest_id: userQuest.quest_id }));
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
						<Text className="text-lg w-1/2 text-center">{nameOpponent}</Text>
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
