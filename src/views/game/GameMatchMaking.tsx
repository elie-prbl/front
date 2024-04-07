import React, { useEffect } from "react";
import Layout from "../../base/Layout";
import GameHeaderGemLifeComponent from "../../components/game/GameHeaderGemLifeComponent";
import { SafeAreaView, Text, View, Platform, ActivityIndicator } from "react-native";
import { Color, Content, Url } from "../../base/constant";
import BoxComponent from "../../base/Box";
import WebSocketSingleton from "../../websocket/WebSocketSingleton";

const GameMatchMaking = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState(false);

	useEffect(() => {
		let uuid = "";

		// Utilisation de Platform pour faker mes deux utilisateurs
		// Pour avoir deux urls différentes pour le match making
		if (Platform.OS === "ios") {
			uuid = "1";
		} else if (Platform.OS === "android") {
			uuid = "2";
		}

		const wsSingleton = WebSocketSingleton.getInstance();
		const webSocketUrl = `${Url.BASE_URL_WS}/matchmaking/1/${uuid}`;
		const ws = wsSingleton.getWebSocket(webSocketUrl);

		ws.onmessage = event => {
			console.log("Received message:", event.data);
			const data = JSON.parse(event.data.toString());
			if (data.type.toLowerCase() === "queue") {
				setIsLoading(true);
			} else if (data.type.toLowerCase() === "match") {
				setIsLoading(false);
			}
		};

		ws.onerror = () => {
			setError(true);
		};

		return () => {};
	}, []);

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
