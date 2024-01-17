import React, { ReactElement, useState } from "react";
import { Text, View } from "react-native";
import ProgressBar from "../../base/ProgressBar";
import { successState } from "../../store/features/Success/SuccessSlices";
import Gem from "../../svg/Gem";
import SuccessQuiz from "../../svg/SuccessQuiz";

export type successProps = {
	success: successState;
	img: ReactElement;
};

const SuccessComponent = ({ success, img }: successProps) => {
	const [currentStep, setCurrentStep] = useState<number>(0);

	return (
		<View className="flex-row h-24">
			<SuccessQuiz />
			<View className="h-full w-9/12">
				<Text className="mb-2">{success?.name}</Text>
				<View className="flex flex-row items-stretch justify-between rounded-lg">
					<ProgressBar currentStep={0} totalStep={success?.done_condition} width={200} />
					<Text>
						{currentStep} / {success?.done_condition}
					</Text>
				</View>
				<Text className="mt-2"> {success?.description} </Text>
				<View className="flex-row justify-between mt-2">
					<Text> + {success?.xp} xp </Text>
					<View className="flex-row items-start">
						<Text className="mt-0"> + {success?.rubis} </Text>
						<Gem />
					</View>
				</View>
			</View>
		</View>
	);
};

export default SuccessComponent;
