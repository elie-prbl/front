import { Text, TouchableOpacity, View } from "react-native";
import { quizQuestionsState } from "../../store/features/QuizQuestions/QuizQuestionsSlices";
import React from "react";
import { Color } from "../../base/constant";

interface GameAnswerComponentProps {
	currentQuestion: quizQuestionsState;
	onPress: (params: string) => void;
	selectedOption: string | null;
	colorSelectedOption?: string;
	isDisabled: boolean;
}

const GameAnswerComponent = ({
	currentQuestion,
	onPress,
	selectedOption,
	colorSelectedOption,
	isDisabled,
}: GameAnswerComponentProps) => {
	return (
		<View className="flex-row flex-wrap">
			{currentQuestion.body.map((option, index) => (
				<View className="w-1/2 p-1" key={index}>
					<TouchableOpacity
						disabled={isDisabled}
						className="w-100 h-36 rounded-md justify-center px-4"
						onPress={() => onPress(option)}
						style={{ backgroundColor: selectedOption === option ? `${colorSelectedOption}` : "#CDCCCC" }}>
						<Text className="text-center text-xl text-[#FFFFFF]">{option}</Text>
					</TouchableOpacity>
				</View>
			))}
		</View>
	);
};

export default GameAnswerComponent;
