import React, { useEffect, useState } from "react";
import Layout from "../../base/Layout";
import { ActivityIndicator, Text, View } from "react-native";
import { NavigationGameDualQuizScoreProps, RouteGameDualQuizProps } from "../../navigation/AppNavigator";
import { Color, Content, Url } from "../../base/constant";
import { w3cwebsocket as WebSocketClient } from "websocket";
import ProgressBar from "../../base/ProgressBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import ModuleGameDualQuiz from "../../base/ModuleGameDualQuiz";
import GameAnswerComponent from "../../components/game/GameAnswerComponent";
import { useNavigation } from "@react-navigation/core";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

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

enum DualQuizType {
	DualQuiz,
	DualQuizAnswer,
}

enum DualQuizStatus {
	GameStarting,
	GamePending,
	GameFinished,
	GameRoundStarting,
	GameRoundFinished,
}

const GameDualQuiz = ({ route }: RouteGameDualQuizProps) => {
	const { roomId } = route.params;

	const navigation = useNavigation<NavigationGameDualQuizScoreProps>();
	const { user } = useAppSelector((state: RootState) => state.user);
	const [dualQuizData, setDualQuizData] = useState<DualQuizData | null>(null);
	const [ws, setWs] = useState<WebSocketClient>();
	const [currentQuestion, setCurrentQuestion] = useState<Questions>();
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [answerValidated, setAnswerValidated] = useState(false);
	const [infos, setInfos] = useState<string>("");
	const [isDisabled, setIsDisabled] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!user?.uuid) return;

		const ws = new WebSocketClient(`${Url.BASE_URL_WS}/dualquiz/${roomId}/${user.uuid}`);

		ws.onopen = () => {
			console.log("Game DualQuiz connected");
		};

		ws.onmessage = event => {
			try {
				const data = JSON.parse(event.data.toString());
				setInfos("");

				switch (data.type) {
					case DualQuizType.DualQuiz:
						handleDualQuiz(data);
						break;
					case DualQuizType.DualQuizAnswer:
						console.log("Answer data:", data);
						if (data.client_uuid === user.uuid) {
							setInfos(Content.WAITING_ANSWER_PLAYER);
						} else {
							setInfos(Content.ANSWER_PLAYER);
						}
						break;
					default:
						console.log("Unknown type:", data);
				}
			} catch (error) {
				console.log("Failed to parse data:", error);
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
	}, [user?.uuid]);

	const handleDualQuiz = (data: any) => {
		switch (data.status) {
			case DualQuizStatus.GameStarting:
				console.log("Game starting = ", data);

				setSelectedOption(null);
				setIsDisabled(false);
				setAnswerValidated(false);

				data.quiz_data = JSON.parse(data.quiz_data);
				setDualQuizData(data);
				setCurrentQuestion(data.quiz_data.questions[data.current_question]);
				setTotalQuestions(data.quiz_data.questions.length);
				break;
			case DualQuizStatus.GamePending:
				console.log("Game is pending = ", data);
				break;
			case DualQuizStatus.GameFinished:
				console.log("Game is finished = ", data);

				setTimeout(() => {
					navigation.navigate("GameDualQuizScore", {
						// TODO : Fix le cas d'égalité
						isWinner: data.winner.UserUuid === user?.uuid,
						myScore: data.winner.UserUuid === user?.uuid ? data.winner.Score : data.loser.Score,
						scorePlayer: data.winner.UserUuid === user?.uuid ? data.loser.Score : data.winner.Score,
						// TODO : Fix le nombre de questions total
						nbQuestions: 0,
					});
				}, 1000);
				break;
			case DualQuizStatus.GameRoundStarting:
				console.log("Round is starting = ", data);
				break;
			case DualQuizStatus.GameRoundFinished:
				console.log("Round is finished = ", data);
				setInfos("La prochaine question va débuter !");
				break;
			default:
				console.log("Unknown status:", data);
		}
	};

	const handleAnswer = (selectedOption: string) => {
		setSelectedOption(selectedOption);
		setIsDisabled(true);
		setAnswerValidated(true);

		const choice = dualQuizData?.quiz_data.questions[dualQuizData?.current_question].answers.findIndex(
			answer => answer === selectedOption,
		);

		if (ws && ws.readyState === WebSocketClient.OPEN && choice !== -1) {
			const message = {
				type: "Answer",
				choice,
			};
			ws.send(JSON.stringify(message));
		} else {
			console.log("WebSocket is not open");
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
							<ProgressBar currentStep={dualQuizData.current_question + 1} totalStep={totalQuestions} width={240} />
							<FontAwesome6 name="bolt" size={30} color={Color.WHITE} />
						</View>
						<View className="flex-1 justify-between">
							<View className="mx-4">
								<ModuleGameDualQuiz topic={dualQuizData.quiz_data.topic} title={dualQuizData.quiz_data.title} />
								<Text className="mt-3 font-bold text-lg">{currentQuestion.question}</Text>
								<View className="w-24 h-[1] my-2" style={{ backgroundColor: Color.PRIMARY }} />
							</View>
							<View>
								{infos && <Text className="mx-4 mb-4 text-center">{infos}</Text>}
								<GameAnswerComponent
									currentQuestion={currentQuestion}
									onPress={handleAnswer}
									selectedOption={selectedOption}
									isDisabled={isDisabled}
									answerValidated={answerValidated}
									correctAnswer={currentQuestion.good_answer}
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
