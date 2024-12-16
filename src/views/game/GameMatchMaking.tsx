import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../base/Layout";
import GameHeaderGemLifeComponent from "../../components/game/GameHeaderGemLifeComponent";
import { SafeAreaView, Text, View, ActivityIndicator } from "react-native";
import { Content, Url } from "../../base/constant";
import { useNavigation } from "@react-navigation/core";
import { NavigationGameDualQuizProps } from "../../navigation/AppNavigator";
import { w3cwebsocket as WebSocketClient } from "websocket";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { getUserOpponent } from "../../store/features/User/UserOpponent";
import BoxMatchMakingComponent from "../../base/BoxMatchMaking";
import { useTheme } from "../../context/ThemeContext";
import TextComponent from "../../base/Text";

enum MatchMakingStatus {
	InQueue,
	Matched,
}

const GameMatchMaking = () => {
	const navigation = useNavigation<NavigationGameDualQuizProps>();
	const { user } = useAppSelector((state: RootState) => state.user);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [nameOpponent, setNameOpponent] = useState<string | null>(null);
	const { themeVariables } = useTheme();

	const handleWebSocketMessage = useCallback(async (event: any) => {
		const data = JSON.parse(event.data.toString());
		console.log(data);

		if (data.status === MatchMakingStatus.InQueue) {
			setIsLoading(true);
		} else if (data.status === MatchMakingStatus.Matched) {
			setIsLoading(false);
			const opponent = await getUserOpponent(data.opponent_uuid);
			setNameOpponent(opponent.username);
			setTimeout(() => {
				navigation.navigate("GameDualQuiz", { roomId: data.room_id, nameOpponent: opponent.username });
			}, 2000);
		}
	}, []);

	useEffect(() => {
		if (!user?.uuid) return;

		const ws = new WebSocketClient(`${Url.BASE_URL_WS}/matchmaking/1/${user.uuid}`);

		ws.onopen = () => console.log("Game MatchMaking connected");
		ws.onmessage = handleWebSocketMessage;
		ws.onerror = () => setError(true);
		ws.onclose = () => console.log("Game MatchMaking closed");

		return () => {
			ws.close();
		};
	}, [user?.uuid, handleWebSocketMessage]);

	if (error) {
		return (
			<Layout>
				<View className="h-full justify-center">
					<TextComponent className="text-center font-bold" content="Erreur lors du match making." />
					<TextComponent className="text-center font-bold" content="Revenez plus tard." />
				</View>
			</Layout>
		);
	}

	return (
		<SafeAreaView style={{ backgroundColor: themeVariables.background }}>
			<View className="h-full justify-center">
				<View className="my-2 mx-4 justify-center">
					<GameHeaderGemLifeComponent />
				</View>
				<Layout>
					<View className="h-full justify-center">
						{isLoading ? (
							<BoxMatchMakingComponent>
								<Text className="text-center text-5xl font-bold" style={{ color: themeVariables.primary }}>
									{Content.MATCH_MAKING}
								</Text>
								<Text className="text-center text-xl font-bold mt-1 mb-6" style={{ color: themeVariables.primary }}>
									{Content.WAITING_PLAYER}
								</Text>
								<ActivityIndicator size="large" color={themeVariables.primary} className="justify-center" />
							</BoxMatchMakingComponent>
						) : (
							<BoxMatchMakingComponent>
								<Text className="font-bold mb-4 text-3xl" style={{ color: themeVariables.primary }}>
									{user?.username}
								</Text>
								<View className="flex-row items-center my-7">
									<View style={{ flex: 1, height: 2, backgroundColor: "black" }} />
									<View>
										<Text className="text-3xl" style={{ width: 100, textAlign: "center" }}>
											VS
										</Text>
									</View>
									<View style={{ flex: 1, height: 2, backgroundColor: "black" }} />
								</View>
								<Text className="text-right font-bold mt-4 text-3xl" style={{ color: themeVariables.primary }}>
									{nameOpponent}
								</Text>
							</BoxMatchMakingComponent>
						)}
					</View>
				</Layout>
			</View>
		</SafeAreaView>
	);
};

export default GameMatchMaking;
