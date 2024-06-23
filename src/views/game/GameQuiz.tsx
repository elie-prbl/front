import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { NavigationGameScoreProps } from "../../navigation/AppNavigator";
import GameQuizHeaderComponent from "../../components/game/GameQuizHeaderComponent";
import { Color, Content, FontSize } from "../../base/constant";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import GameAnswerComponent from "../../components/game/GameAnswerComponent";
import GameSnackBarComponent from "../../components/game/GameSnackBarComponent";
import ButtonComponent from "../../base/Button";
import {
	incrementCurrentQuestionIndexState,
	restartCurrentQuestionIndexState,
} from "../../store/features/QuizQuestions/CurrentQuestionIndexSlices";
import { decrementLife } from "../../store/features/Lives/LivesSlices";
import { CommonActions, useNavigation } from "@react-navigation/core";
import { quizState } from "../../store/features/Quiz/QuizSlices";
import { restartCurrentQuizModule } from "../../store/features/QuizModules/CurrentQuizModuleSlice";
import { restartCurrentQuiz } from "../../store/features/Quiz/CurrentQuizSlice";
import { submitUserQuiz } from "../../store/features/UserQuiz/UserQuizThunk";

const GameQuiz = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<NavigationGameScoreProps>();

	const qid = useAppSelector(state => state.currentQuiz.value);
	const quizzes: quizState[] | null = useAppSelector(state => state.quiz.quiz);
	const currentQuiz: quizState | null = quizzes?.find(q => q.id === qid) ?? null;
	const currentQuestionIndex: number = useAppSelector(state => state.currentQuestionIndex.value);
	const currentQuestion = currentQuiz!.questions[currentQuestionIndex];
	const [currentIndexQuestionDisplay, setCurrentIndexQuestionDisplay] = useState(0);

	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isDisabled, setIsDisabled] = useState(false);

	const [titleButton, setTitleButton] = useState(Content.VALIDATE);
	const [colorBgButton, setColorBgButton] = useState(Color.PRIMARY);
	const [colorShadowButton, setColorShadowButton] = useState(Color.SECONDARY);

	const lives = useAppSelector(state => state.lives.value);
	const [score, setScore] = useState(0);

	const handleAnswer = (selectedOption: string) => {
		setSelectedOption(selectedOption);
	};

	useEffect(() => {
		if (currentIndexQuestionDisplay === currentQuiz!.questions.length) {
			const quizData = {
				// user_uuid: uid,
				user_uuid: "c0bf4924-e82b-4bcb-8a06-31443d3a7f4h",
				quiz_id: String(qid),
			};

			dispatch(submitUserQuiz(quizData)).then(() => {
				dispatch(restartCurrentQuestionIndexState());
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [
							{
								name: "GameScore",
								params: {
									score,
									nbQuestions: currentQuiz!.questions.length,
								},
							},
						],
					}),
				);
			});
		}
		if (lives === 0) {
			Alert.alert("Tu as perdu toutes tes vies, reviens demain !");
			dispatch(restartCurrentQuestionIndexState());
			dispatch(restartCurrentQuizModule());
			dispatch(restartCurrentQuiz());
			navigation.navigate("TabNav", {
				screen: "Game",
			});
		}
	}, [currentIndexQuestionDisplay, lives]);

	const handleNextQuestion = () => {
		setTitleButton(Content.VALIDATE);
		setColorBgButton(Color.PRIMARY);
		setColorShadowButton(Color.SECONDARY);
		setIsDisabled(false);

		// Isn't the last question
		if (currentQuestionIndex < currentQuiz!.questions.length - 1) {
			dispatch(incrementCurrentQuestionIndexState());
		}

		setCurrentIndexQuestionDisplay(prevCurrentIndexQuestionDisplay => prevCurrentIndexQuestionDisplay + 1);
		setSelectedOption(null);
	};

	const handleCheckAnswer = () => {
		setIsDisabled(true);
		if (selectedOption !== currentQuestion.good_answer) {
			setTitleButton(Content.AGREED);
			setColorBgButton(Color.RED_BRIGHT_LIGHT);
			setColorShadowButton(Color.RED_BRIGHT_DARK);
			dispatch(decrementLife());
		} else {
			setTitleButton(Content.CONTINUE);
			setScore(prevScore => prevScore + 1);
		}
	};

	return (
		<SafeAreaView className={`bg-[${Color.WHITE}]`}>
			<View className="h-full">
				<GameQuizHeaderComponent currentStep={currentQuestionIndex + 1} totalStep={currentQuiz!.questions.length} />
				<View className="flex-1 justify-between">
					<View className=" mx-2 px-1">
						<Text className={`${FontSize.TEXT_XL} font-bold`}>{currentQuestion.question}</Text>
						<View className="w-24 h-[1] my-2" style={{ backgroundColor: Color.PRIMARY }} />
					</View>
					<View>
						<GameAnswerComponent
							currentQuestion={currentQuestion}
							onPress={handleAnswer}
							selectedOption={selectedOption}
							isDisabled={isDisabled}
						/>
						{titleButton === Content.CONTINUE && (
							<GameSnackBarComponent
								bg={Color.GREEN_OPACITY}
								height={160}
								title={Content.SUPER}
								icon="check-circle"
								colorIcon={Color.PRIMARY}
								colorContent={Color.PRIMARY}
							/>
						)}
						{titleButton === Content.AGREED && (
							<GameSnackBarComponent
								bg={Color.RED_OPACITY}
								height={220}
								title={Content.INCORRECT}
								icon="times-circle"
								colorIcon={Color.RED}
								colorContent={Color.RED}
								correctAnswer={currentQuestion.good_answer}
							/>
						)}
						<View className="mx-3 mt-4" style={{ zIndex: 2 }}>
							<ButtonComponent
								onPress={titleButton === Content.VALIDATE ? handleCheckAnswer : handleNextQuestion}
								content={titleButton}
								disabled={!selectedOption}
								bg={colorBgButton}
								shadowColor={colorShadowButton}
								width="w-full"
							/>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default GameQuiz;
