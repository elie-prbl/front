import React, { useEffect, useState } from "react";
import Layout from "../../base/Layout";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { RouteGameDualQuizProps } from "../../navigation/AppNavigator";
import { Color, Url } from "../../base/constant";
import { w3cwebsocket as WebSocketClient } from "websocket";
import ProgressBar from "../../base/ProgressBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import ModuleGameDualQuiz from "../../base/ModuleGameDualQuiz";
import GameAnswerComponent from "../../components/game/GameAnswerComponent";

export interface Questions {
	question: string;
	good_answer: string;
	answers: string[];
}

interface QuizData {
	id: number;
	topic: string;
	questions: Questions[];
	title: string;
	current_question: number;
}

interface DualQuizData {
	type: number;
	type_message: string;
	status: number;
	status_message: string;
	room_id: number;
	quiz_data: QuizData;
	current_question: number;
	timer: number;
}

interface DualQuizAnswer {
	type: number;
	type_message: string;
	client_uuid: string;
	is_correct: boolean;
	correct_answer: number;
	end_timer: number;
}

enum DualQuizStatus {
	LoadQuiz,
	Answer,
}

const GameDualQuiz = ({ route }: RouteGameDualQuizProps) => {
	const { roomId } = route.params;

	const [uuid, setUuid] = useState("");
	const [dualQuizData, setDualQuizData] = useState<DualQuizData | null>(null);
	const [dualQuizAnswer, setDualQuizAnswer] = useState<DualQuizAnswer | null>(null);
	const [ws, setWs] = useState<WebSocketClient>();
	const [currentQuestion, setCurrentQuestion] = useState<Questions>();
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isDisabled, setIsDisabled] = useState(false);
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
			try {
				const data = JSON.parse(event.data.toString());

				if (data.type === DualQuizStatus.LoadQuiz) {
					data.quiz_data = JSON.parse(data.quiz_data);
					console.log("Load quiz data:", data);
					setDualQuizData(data);
					setCurrentQuestion(data.quiz_data.questions[data.current_question]);
				} else if (data.type === DualQuizStatus.Answer) {
					console.log("Answer data:", data);
					setDualQuizAnswer(data);
				} else {
					console.log("Unknown type:", data.type);
				}
			} catch (error) {
				console.error("Failed to parse data:", error);
				setError(true);
				ws.close();
			}
		};

		ws.onerror = () => {
			setError(true);
		};

		ws.onclose = () => {
			console.log("Game DualQuiz closed");
		};

		setWs(ws);

		return () => {
			ws.close();
		};
	}, [uuid]);

	const handleAnswer = (selectedOption: string) => {
		setSelectedOption(selectedOption);
		setIsDisabled(true);

		const choice = dualQuizData?.quiz_data.questions[dualQuizData?.current_question].answers.findIndex(
			answer => answer === selectedOption,
		);

		if (ws && ws.readyState === WebSocketClient.OPEN && choice !== -1) {
			const message = {
				type: "Answer",
				choice: choice,
			};
			ws.send(JSON.stringify(message));
		} else {
			console.error("WebSocket is not open");
		}
	};

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
		<SafeAreaView style={{ backgroundColor: Color.WHITE }}>
			<View className="h-full">
				{!dualQuizData || !currentQuestion ? (
					<View className="h-full items-center justify-center">
						<ActivityIndicator size="large" color={Color.PRIMARY} className="justify-center" />
					</View>
				) : (
					<>
						<View className="flex-row items-center justify-between m-4">
							<AntDesign name="close" size={30} color={Color.GREY} onPress={() => {}} />
							<ProgressBar currentStep={1} totalStep={5} width={240} />
							<FontAwesome6 name="bolt" size={30} color={Color.WHITE} />
						</View>
						<View className="flex-1 justify-between">
							<View className="mx-4">
								<ModuleGameDualQuiz topic={dualQuizData.quiz_data.topic} title={dualQuizData.quiz_data.title} />
								<Text className="mt-3 font-bold text-lg">{currentQuestion.question}</Text>
								<View className="w-24 h-[1] my-2" style={{ backgroundColor: Color.PRIMARY }} />
							</View>
							<View>
								<GameAnswerComponent
									currentQuestion={currentQuestion}
									onPress={handleAnswer}
									selectedOption={selectedOption}
									isDisabled={isDisabled}
								/>
							</View>
						</View>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

export default GameDualQuiz;
