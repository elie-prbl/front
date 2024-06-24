import { Pressable, Text, View } from "react-native";
import { quizQuestionsState } from "../../store/features/QuizQuestions/QuizQuestionsSlices";
import React from "react";
import { Color, FontSize } from "../../base/constant";
import { Questions } from "../../views/game/GameDualQuiz";

interface GameAnswerComponentProps {
	currentQuestion: quizQuestionsState | Questions;
	onPress: (params: string) => void;
	selectedOption: string | null;
	isDisabled: boolean;
	answerValidated: boolean;
	correctAnswer: string | null;
}

const GameAnswerComponent = ({
	currentQuestion,
	onPress,
	selectedOption,
	isDisabled,
	answerValidated,
	correctAnswer,
}: GameAnswerComponentProps) => {
	const getOptionStyles = (option: string) => {
		let backgroundColor = Color.GREY;
		let borderColor = Color.GREY;
		let innerBackgroundColor = Color.WHITE;
		let colorText = Color.BLACK;

		if (answerValidated) {
			if (option === correctAnswer) {
				backgroundColor = Color.SECONDARY;
				borderColor = Color.SECONDARY;
				innerBackgroundColor = Color.PRIMARY;
				colorText = Color.WHITE;
			} else if (option === selectedOption) {
				backgroundColor = Color.RED_BRIGHT_DARK;
				borderColor = Color.RED_BRIGHT_DARK;
				innerBackgroundColor = Color.RED_BRIGHT_LIGHT;
				colorText = Color.WHITE;
			}
		} else if (option === selectedOption) {
			backgroundColor = Color.BLUE_PALE_DARK;
			borderColor = Color.BLUE_PALE_DARK;
			innerBackgroundColor = Color.BLUE_PALE_LIGHT;
		}

		return { backgroundColor, borderColor, innerBackgroundColor, colorText };
	};

	return (
		<View className="flex-row flex-wrap mx-2">
			{currentQuestion.answers.map((option, index) => {
				const { backgroundColor, borderColor, innerBackgroundColor, colorText } = getOptionStyles(option);
				return (
					<View className="w-1/2 p-1" key={index}>
						<Pressable disabled={isDisabled} onPress={() => onPress(option)}>
							<View
								className="rounded-lg"
								style={{
									backgroundColor,
									borderColor,
									borderWidth: 1,
									height: 135,
								}}>
								<View
									className="rounded-lg justify-center"
									style={{
										zIndex: 1,
										backgroundColor: innerBackgroundColor,
										height: 130,
									}}>
									<Text className={`text-center p-3 ${FontSize.TEXT_LG}`} style={{ color: colorText }}>
										{option}
									</Text>
								</View>
							</View>
						</Pressable>
					</View>
				);
			})}
		</View>
	);
};

export default GameAnswerComponent;
