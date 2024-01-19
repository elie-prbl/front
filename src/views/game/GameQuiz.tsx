import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { MyNavigationProp, NavigationGameScoreProps, RouteGameQuizProps } from "../../navigation/AppNavigator";
import GameQuizHeaderComponent from "../../components/game/GameQuizHeaderComponent";
import { Color, Content, FontSize } from "../../base/constant";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { quizQuestionsState } from "../../store/features/QuizQuestions/QuizQuestionsSlices";
import GameAnswerComponent from "../../components/game/GameAnswerComponent";
import GameSnackBarComponent from "../../components/game/GameSnackBarComponent";
import ButtonComponent from "../../base/Button";
import {
	incrementCurrentQuestionIndexState,
	restartCurrentQuestionIndexState,
} from "../../store/features/QuizQuestions/CurrentQuestionIndexSlices";
import { decrementLife } from "../../store/features/Lives/LivesSlices";
import { CommonActions, useNavigation } from "@react-navigation/core";

const GameQuiz = ({ route }: RouteGameQuizProps) => {
	const { qid } = route.params;
	const dispatch = useAppDispatch();
	const navigationHome = useNavigation<MyNavigationProp>();
	const navigationScore = useNavigation<NavigationGameScoreProps>();

	const questions: quizQuestionsState[] = useAppSelector(state => state.quizQuestions.questions);
	const currentQuestionIndex: number = useAppSelector(state => state.currentQuestionIndex.value);
	const currentQuestion = questions[currentQuestionIndex];
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
		if (currentIndexQuestionDisplay === questions.length) {
			dispatch(restartCurrentQuestionIndexState());
			navigationScore.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [
						{
							name: "GameScore",
							params: {
								qid,
								score,
								nbQuestion: questions.length,
							},
						},
					],
				}),
			);
		}
		if (lives === 0) {
			Alert.alert("Tu as perdu toutes tes vies, reviens demain !");
			dispatch(restartCurrentQuestionIndexState());
			navigationHome.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [
						{
							name: "Game",
						},
					],
				}),
			);
		}
	}, [currentIndexQuestionDisplay, lives]);

	const handleNextQuestion = () => {
		setTitleButton(Content.VALIDATE);
		setColorBgButton(Color.PRIMARY);
		setColorShadowButton(Color.SECONDARY);
		setIsDisabled(false);

		// Isn't the last question
		if (currentQuestionIndex < questions.length - 1) {
			dispatch(incrementCurrentQuestionIndexState());
		}

		setCurrentIndexQuestionDisplay(prevCurrentIndexQuestionDisplay => prevCurrentIndexQuestionDisplay + 1);
		setSelectedOption(null);
	};

	const handleCheckAnswer = () => {
		setIsDisabled(true);
		if (selectedOption !== currentQuestion.correctAnswer) {
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
				<GameQuizHeaderComponent currentStep={currentQuestionIndex + 1} totalStep={questions.length} />
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
								correctAnswer={currentQuestion.correctAnswer}
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
