import React, { useEffect, useState } from "react";
import Layout from "../../base/Layout";
import GameHeaderGemLifeComponent from "../../components/game/GameHeaderGemLifeComponent";
import { SafeAreaView, Text, View, Platform, ActivityIndicator } from "react-native";
import { Color, Content, Url } from "../../base/constant";
import BoxComponent from "../../base/Box";
import { useNavigation } from "@react-navigation/core";
import { NavigationGameDualQuizProps } from "../../navigation/AppNavigator";
import { w3cwebsocket as WebSocketClient } from "websocket";

enum MatchMakingStatus {
	InQueue,
	Matched,
}

const GameMatchMaking = () => {
	const navigation = useNavigation<NavigationGameDualQuizProps>();
	const [uuid, setUuid] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		// Utilisation de Platform pour faker mes deux utilisateurs
		// Pour avoir deux urls différentes pour le match making
		setUuid(Platform.OS === "ios" ? "1" : "2");
	}, []);

	useEffect(() => {
		if (!uuid) return;

		const ws = new WebSocketClient(`${Url.BASE_URL_WS}/matchmaking/1/${uuid}`);

		ws.onopen = () => {
			console.log("Game MatchMaking connected");
		};

		ws.onmessage = event => {
			const data = JSON.parse(event.data.toString());
			console.log(data);
			if (data.status === MatchMakingStatus.InQueue) {
				setIsLoading(true);
			} else if (data.status === MatchMakingStatus.Matched) {
				setIsLoading(false);
				ws.close();
				navigation.navigate("GameDualQuiz", { roomId: data.room_id });
			}
		};

		ws.onerror = () => {
			setError(true);
		};

		ws.onclose = () => {
			console.log("Game MatchMaking closed");
		};

		return () => {
			ws.close();
		};
	}, [uuid]);

	if (error)
		return (
			<Layout>
				<View className="h-full justify-center">
					<Text className="text-center font-bold">Erreur lors du match making.</Text>
					<Text className="text-center font-bold">Revenez plus tard.</Text>
				</View>
			</Layout>
		);

	return (
		<>
			<SafeAreaView style={{ backgroundColor: Color.WHITE }}>
				<View className="my-2 mx-4 justify-center">
					<GameHeaderGemLifeComponent />
				</View>
			</SafeAreaView>
			<Layout>
				<BoxComponent title={Content.MATCH_MAKING.toUpperCase()}>
					{isLoading ? (
						<>
							<Text className="text-center font-bold my-3">{Content.WAITING}</Text>
							<ActivityIndicator size="large" color={Color.PRIMARY} className="justify-center my-5" />
						</>
					) : (
						<Text className="text-center font-bold my-3">{Content.MATCH}</Text>
					)}
				</BoxComponent>
			</Layout>
		</>
	);
};

export default GameMatchMaking;
