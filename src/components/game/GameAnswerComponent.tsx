import { Pressable, Text, View } from "react-native";
import { quizQuestionsState } from "../../store/features/QuizQuestions/QuizQuestionsSlices";
import React from "react";
import { Color, FontSize } from "../../base/constant";

interface GameAnswerComponentProps {
	currentQuestion: quizQuestionsState;
	onPress: (params: string) => void;
	selectedOption: string | null;
	isDisabled: boolean;
}

const GameAnswerComponent = ({ currentQuestion, onPress, selectedOption, isDisabled }: GameAnswerComponentProps) => {
	return (
		<View className="flex-row flex-wrap mx-2">
			{currentQuestion.answers.map((option, index) => (
				<View className="w-1/2 p-1" key={index}>
					<Pressable disabled={isDisabled} onPress={() => onPress(option)}>
						<View
							className="rounded-lg"
							style={{
								backgroundColor: selectedOption === option ? Color.BLUE_DARK : Color.GREY,
								borderColor: selectedOption === option ? Color.BLUE_DARK : Color.GREY,
								borderWidth: 1,
								height: 135,
							}}>
							<View
								className="rounded-lg justify-center"
								style={{
									zIndex: 1,
									backgroundColor: selectedOption === option ? Color.BLUE_LIGHT : Color.WHITE,
									height: 130,
								}}>
								<Text className={`text-center p-3 ${FontSize.TEXT_LG}`}>{option}</Text>
							</View>
						</View>
					</Pressable>
				</View>
			))}
		</View>
	);
};

export default GameAnswerComponent;
