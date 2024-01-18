import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { RouteGameQuizProps } from "../../navigation/AppNavigator";
import GameQuizHeaderComponent from "../../components/game/GameQuizHeaderComponent";
import { Color, Content, FontSize } from "../../base/constant";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { quizQuestionsState } from "../../store/features/QuizQuestions/QuizQuestionsSlices";
import GameAnswerComponent from "../../components/game/GameAnswerComponent";
import GameSnackBarComponent from "../../components/game/GameSnackBarComponent";
import ButtonComponent from "../../base/Button";
import { incrementCurrentQuestionIndexState } from "../../store/features/QuizQuestions/CurrentQuestionIndexSlices";

const GameQuiz = ({ route }: RouteGameQuizProps) => {
	const { qid } = route.params;
	const dispatch = useAppDispatch();

	const questions: quizQuestionsState[] = useAppSelector(state => state.quizQuestions.questions);
	const currentQuestionIndex: number = useAppSelector(state => state.currentQuestionIndex.value);
	const currentQuestion = questions[currentQuestionIndex];

	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [colorSelectedOption, setColorSelectedOption] = useState(Color.PRIMARY);

	const [isDisabled, setIsDisabled] = useState(false);

	const [titleButton, setTitleButton] = useState(Content.VALIDATE);
	const [colorTitleButton, setColorTitleButton] = useState(Color.PRIMARY);

	const handleAnswer = (selectedOption: string) => {
		setSelectedOption(selectedOption);
	};

	const handleNextQuestion = () => {
		setColorSelectedOption(Color.PRIMARY);
		setTitleButton(Content.VALIDATE);
		setColorTitleButton(Color.RED_LIGHT);
		setIsDisabled(false);

		// Isn't the last question
		if (currentQuestionIndex < questions.length - 1) {
			dispatch(incrementCurrentQuestionIndexState());
		}

		setSelectedOption(null);
	};

	const handleCheckAnswer = () => {
		setIsDisabled(true);
		if (selectedOption !== currentQuestion.correctAnswer) {
			setColorSelectedOption(Color.RED_LIGHT);
			setTitleButton(Content.INCORRECT);
			setColorTitleButton(Color.PRIMARY);
			// dispatch(decrementLife());
		} else {
			setTitleButton(Content.CORRECT);
			// setScore(prevScore => prevScore + 1);
		}
	};

	return (
		<View className={`bg-[${Color.WHITE}] h-full`}>
			<View className="h-32">
				<SafeAreaView>
					<GameQuizHeaderComponent />
				</SafeAreaView>
			</View>
			<View className="">
				<View className="mx-1">
					<Text className={`${FontSize.TEXT_XL} font-bold`}>{currentQuestion.question}</Text>
					<View className="w-24 h-[1] my-2" style={{ backgroundColor: Color.PRIMARY }} />
				</View>
				<View className="flex-2">
					<GameAnswerComponent
						currentQuestion={currentQuestion}
						onPress={handleAnswer}
						selectedOption={selectedOption}
						colorSelectedOption={colorSelectedOption}
						isDisabled={isDisabled}
					/>
					{/*{titleButton === Content.CORRECT && (*/}
					{/*	<GameSnackBarComponent*/}
					{/*		bg="#CBFCCA"*/}
					{/*		height={160}*/}
					{/*		title="Super !"*/}
					{/*		icon="check-circle"*/}
					{/*		colorIcon={Color.PRIMARY}*/}
					{/*	/>*/}
					{/*)}*/}
					{/*{titleButton === Content.INCORRECT && (*/}
					{/*	<GameSnackBarComponent*/}
					{/*		bg="#FDCACA"*/}
					{/*		height={220}*/}
					{/*		title="Incorrect"*/}
					{/*		icon="times-circle"*/}
					{/*		colorIcon={Color.RED_LIGHT}*/}
					{/*		correctAnswer={currentQuestion.correctAnswer}*/}
					{/*	/>*/}
					{/*)}*/}
					<View className="mx-1">
						<ButtonComponent
							onPress={titleButton === Content.VALIDATE ? handleCheckAnswer : handleNextQuestion}
							content={titleButton}
							disabled={!selectedOption}
							bg={colorTitleButton}
							width="w-full"
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default GameQuiz;
