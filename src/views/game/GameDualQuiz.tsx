import React, { useEffect, useState, useCallback, useRef } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/core";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import Layout from "../../base/Layout";
import ProgressBar from "../../base/ProgressBar";
import ModuleGameDualQuiz from "../../base/ModuleGameDualQuiz";
import GameAnswerComponent from "../../components/game/GameAnswerComponent";
import Elie from "../../svg/Elie";
import { NavigationGameDualQuizScoreProps, RouteGameDualQuizProps } from "../../navigation/AppNavigator";
import { Color, Content, Url } from "../../base/constant";
import { w3cwebsocket as WebSocketClient } from "websocket";
import { DualQuizData, DualQuizStatus, DualQuizType, Questions } from "../../store/interface/dualquiz";

const GameDualQuiz = ({ route }: RouteGameDualQuizProps) => {
	const { roomId, nameOpponent } = route.params;
	const navigation = useNavigation<NavigationGameDualQuizScoreProps>();
	const { user } = useAppSelector((state: RootState) => state.user);

	const [ws, setWs] = useState<WebSocketClient | null>(null);
	const [dualQuizData, setDualQuizData] = useState<DualQuizData | null>(null);
	const [currentQuestion, setCurrentQuestion] = useState<Questions | null>(null);
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [answerValidated, setAnswerValidated] = useState(false);
	const [infos, setInfos] = useState<string>("");
	const [isDisabled, setIsDisabled] = useState(false);
	const [error, setError] = useState(false);
	const [timer, setTimer] = useState(10);
	const isTimeElapsed = useRef(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const lastQuestion = useRef<boolean>(false);
	const userHasAnswered = useRef(false);

	const handleWebSocketMessage = useCallback((event: any) => {
		try {
			const data = JSON.parse(event.data.toString());

			switch (data.type) {
				case DualQuizType.DualQuiz:
					handleDualQuiz(data);
					break;
				case DualQuizType.DualQuizAnswer:
					handleDualQuizAnswer(data);
					break;
				default:
					console.error("Unknown type:", data);
			}
		} catch (error) {
			console.error("Failed to parse data:", error);
			setError(true);
			ws?.close();
		}
	}, []);

	useEffect(() => {
		if (!user?.uuid) return;

		const wsClient = new WebSocketClient(`${Url.BASE_URL_WS}/dualquiz/${roomId}/${user.uuid}`);

		wsClient.onopen = () => console.log("Game DualQuiz connected");
		wsClient.onmessage = handleWebSocketMessage;
		wsClient.onerror = () => setError(true);
		wsClient.onclose = () => console.log("Game DualQuiz closed");

		setWs(wsClient);

		return () => {
			wsClient.close();
		};
	}, [user?.uuid, handleWebSocketMessage]);

	useEffect(() => {
		if (currentQuestion) {
			setTimer(10);
			isTimeElapsed.current = false;

			if (timerRef.current) {
				clearInterval(timerRef.current);
			}

			timerRef.current = setInterval(() => {
				setTimer(prevTimer => {
					if (prevTimer === 1) {
						clearInterval(timerRef.current!);
						setIsDisabled(true);
						setAnswerValidated(true);
						isTimeElapsed.current = true;
						handleAnswer(currentQuestion.good_answer);
					}
					return prevTimer - 1;
				});
			}, 1000);
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [currentQuestion]);

	const handleDualQuiz = (data: any) => {
		switch (data.status) {
			case DualQuizStatus.GameStarting:
				setInfos("");
				console.log("Game is starting =", data);
				setGameStarting(data);
				break;
			case DualQuizStatus.GamePending:
				console.log("Game is pending =", data);
				break;
			case DualQuizStatus.GameFinished:
				console.log("Game is finished =", data);
				setInfos(Content.FINISH_QUIZ);
				handleGameFinished(data);
				break;
			case DualQuizStatus.GameRoundStarting:
				console.log("Round is starting =", data);
				break;
			case DualQuizStatus.GameRoundFinished:
				console.log("Round is finished =", data);
				if (!lastQuestion.current && !isTimeElapsed.current) {
					setInfos(Content.NEXT_QUESTION);
				}
				break;
			default:
				console.error("Unknown status:", data);
		}
	};

	const setGameStarting = (data: any) => {
		setSelectedOption(null);
		setIsDisabled(false);
		setAnswerValidated(false);
		userHasAnswered.current = false;

		data.quiz_data = JSON.parse(data.quiz_data);
		setDualQuizData(data);
		setCurrentQuestion(data.quiz_data.questions[data.current_question]);
		setTotalQuestions(data.quiz_data.questions.length);

		if (data.current_question === data.quiz_data.questions.length - 1) {
			lastQuestion.current = true;
		}
	};

	const handleGameFinished = (data: any) => {
		setTimeout(() => {
			navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [
						{
							name: "GameDualQuizScore",
							params: {
								isDraw: data.is_draw,
								isWinner: data.winner.UserUuid === user?.uuid,
								myScore: data.winner.UserUuid === user?.uuid ? data.winner.Score : data.loser.Score,
								scorePlayer: data.winner.UserUuid === user?.uuid ? data.loser.Score : data.winner.Score,
								nbQuestions: data.quiz_total_questions,
							},
						},
					],
				}),
			);
		}, 1000);
	};

	const handleDualQuizAnswer = (data: any) => {
		console.log("Answer data:", data);

		if (isTimeElapsed.current) {
			setInfos(Content.ELAPSED_TIME);
			return;
		}

		if (data.client_uuid === user?.uuid && !userHasAnswered.current) {
			setInfos(`${Content.WAITING_ANSWER_PLAYER} ${nameOpponent}...`);
			userHasAnswered.current = true;
		} else {
			setInfos(`${nameOpponent} ${Content.ANSWER_PLAYER}`);
		}
	};

	const handleAnswer = (selectedOption: string) => {
		setSelectedOption(selectedOption);
		setIsDisabled(true);
		setAnswerValidated(true);

		if (timerRef.current) {
			clearInterval(timerRef.current);
		}

		const choice = dualQuizData?.quiz_data.questions[dualQuizData?.current_question].answers.findIndex(
			answer => answer === selectedOption,
		);

		if (ws && ws.readyState === WebSocketClient.OPEN && choice !== -1) {
			const message = {
				type: "Answer",
				choice,
				timestamp: new Date().getTime(),
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
								{infos && (
									<View className="items-center justify-center mx-4 mb-6">
										<Elie />
										<Text className="text-base ml-3">{infos}</Text>
									</View>
								)}
								<GameAnswerComponent
									currentQuestion={currentQuestion}
									onPress={handleAnswer}
									selectedOption={selectedOption}
									isDisabled={isDisabled}
									answerValidated={answerValidated}
									correctAnswer={currentQuestion.good_answer}
								/>
							</View>
							<Text className="text-center my-4">Temps restant: {timer} secondes</Text>
						</View>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

export default GameDualQuiz;
