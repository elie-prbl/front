import React, { useEffect, useState } from "react";
import Layout from "../../base/Layout";
import { Platform, Text, View } from "react-native";
import { RouteGameDualQuizProps } from "../../navigation/AppNavigator";
import { Url } from "../../base/constant";
import { w3cwebsocket as WebSocketClient } from "websocket";

const GameDualQuiz = ({ route }: RouteGameDualQuizProps) => {
	const { roomId } = route.params;

	const [uuid, setUuid] = useState("");
	const [error, setError] = useState(false);

	useEffect(() => {
		// Utilisation de Platform pour faker mes deux utilisateurs
		// Pour avoir deux urls différentes pour le match making
		setUuid(Platform.OS === "ios" ? "1" : "2");
	}, []);

	useEffect(() => {
		if (!uuid) return;

		console.log("Dans le screen GameDualQuiz");
		console.log("roomId:", roomId);

		const ws = new WebSocketClient(`${Url.BASE_URL_WS}/dualquiz/${roomId}/${uuid}`);

		ws.onopen = () => {
			console.log("Game DualQuiz connected");
		};

		ws.onmessage = event => {
			console.log("Game DualQuiz message:", event.data);
			const data = JSON.parse(event.data.toString());
			console.log(data);
		};

		ws.onerror = () => {
			setError(true);
		};

		ws.onclose = () => {
			console.log("Game DualQuiz closed");
		};

		return () => {
			ws.close();
		};
	}, [uuid]);

	if (error)
		return (
			<Layout>
				<View className="h-full justify-center">
					<Text className="text-center font-bold">Erreur lors du DualQuiz.</Text>
					<Text className="text-center font-bold">Revenez plus tard.</Text>
				</View>
			</Layout>
		);

	return (
		<Layout>
			<View />
		</Layout>
	);
};

export default GameDualQuiz;
