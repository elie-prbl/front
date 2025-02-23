import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { MyNavigationProp, NavigationGameScoreProps } from "../../navigation/AppNavigator";
import GameQuizHeaderComponent from "../../components/game/GameQuizHeaderComponent";
import { Color, Content, FontSize } from "../../base/constant";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import GameAnswerComponent from "../../components/game/GameAnswerComponent";
import ButtonComponent from "../../base/Button";
import {
	incrementCurrentQuestionIndexState,
	restartCurrentQuestionIndexState,
} from "../../store/features/QuizQuestions/CurrentQuestionIndexSlices";
import { decrementLife } from "../../store/features/Lives/LivesSlices";
import { CommonActions, useNavigation } from "@react-navigation/core";
import { quizState } from "../../store/features/Quiz/QuizSlices";
import { restartCurrentQuiz } from "../../store/features/Quiz/CurrentQuizSlice";
import Planet from "../../svg/Planet";
import { submitUserQuiz } from "../../store/features/UserQuiz/UserQuizThunk";
import { RootState } from "../../store/store";
import { useTheme } from "../../context/ThemeContext";
import TextComponent from "../../base/Text";

const GameQuiz = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<NavigationGameScoreProps>();
	const navigationToGame = useNavigation<MyNavigationProp>();

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
	const { themeVariables } = useTheme();

	const lives = useAppSelector(state => state.lives.value);
	const [score, setScore] = useState(0);

	const { user } = useAppSelector((state: RootState) => state.user);

	const handleAnswer = (selectedOption: string) => {
		setSelectedOption(selectedOption);
	};

	useEffect(() => {
		if (currentIndexQuestionDisplay === currentQuiz!.questions.length && user?.uuid) {
			dispatch(restartCurrentQuestionIndexState());

			if (score === currentQuiz!.questions.length) {
				const quizData = {
					user_uuid: user.uuid,
					quiz_id: qid.toString(),
				};

				dispatch(submitUserQuiz(quizData));
			}

			navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [
						{
							name: "GameQuizScore",
							params: {
								score,
								nbQuestions: currentQuiz!.questions.length,
							},
						},
					],
				}),
			);
		}
	}, [currentIndexQuestionDisplay]);

	useEffect(() => {
		if (lives === 0) {
			Alert.alert(Content.LOST_LIVES);
			dispatch(restartCurrentQuestionIndexState());
			dispatch(restartCurrentQuiz());
			navigationToGame.navigate("TabNav", {
				screen: "Game",
			});
		}
	}, [lives]);

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
		setTitleButton(Content.CONTINUE);
		if (selectedOption !== currentQuestion.good_answer) {
			setColorBgButton(Color.RED_BRIGHT_LIGHT);
			setColorShadowButton(Color.RED_BRIGHT_DARK);
			dispatch(decrementLife());
		} else {
			setScore(prevScore => prevScore + 1);
		}
	};

	return (
		<SafeAreaView style={{ backgroundColor: themeVariables.background }}>
			<View className="h-full">
				<GameQuizHeaderComponent currentStep={currentQuestionIndex + 1} totalStep={currentQuiz!.questions.length} />
				<View className="flex-1 justify-between">
					<View className=" mx-2 px-1">
						<TextComponent content={currentQuestion.question} className={`${FontSize.TEXT_XL} font-bold`} />
						<View className="w-24 h-[1] my-2" style={{ backgroundColor: themeVariables.background }} />
					</View>
					<View className="flex-1">
						<Planet />
					</View>
					<View>
						<GameAnswerComponent
							currentQuestion={currentQuestion}
							onPress={handleAnswer}
							selectedOption={selectedOption}
							isDisabled={isDisabled}
							answerValidated={titleButton === Content.CONTINUE}
							correctAnswer={currentQuestion.good_answer}
						/>
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
