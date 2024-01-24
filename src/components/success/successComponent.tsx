import React from "react";
import { Text, View } from "react-native";
import ProgressBar from "../../base/ProgressBar";
import { successState } from "../../store/features/Success/SuccessSlices";
import Gem from "../../svg/Gem";
import SuccessQuiz from "../../svg/SuccessQuiz";
import SuccessQuizWin from "../../svg/SuccessQuizWin";
import SuccessConnection from "../../svg/SuccessConnection";

export type successProps = {
	success: successState;
};

const SuccessComponent = ({ success }: successProps) => {
	const SwitchImg = (name: string) => {
		switch (name) {
			case "Gamer":
				return <SuccessQuiz />;
			case "Elien":
				return <SuccessConnection />;
			case "Winner":
				return <SuccessQuizWin />;
			default:
				console.log(`error to load success image`);
		}
	};

	return (
		<View className="flex-row h-28 my-3">
			{SwitchImg(success?.name)}
			<View className="h-full w-9/12">
				<Text className="mb-2 font-semibold">{success?.name}</Text>
				<View className="flex flex-row items-stretch justify-between rounded-lg">
					<ProgressBar currentStep={success?.progress} totalStep={success?.done_condition} width={200} />
					<Text>
						{success?.progress} / {success?.done_condition}
					</Text>
				</View>
				<Text className="mt-2"> {success?.description} </Text>
				<View className="flex-row justify-between mt-2">
					<Text className="mt-1"> + {success?.xp} xp </Text>
					<View className="flex-row items-start">
						<Text className="mt-1"> + {success?.rubis} </Text>
						<Gem />
					</View>
				</View>
			</View>
		</View>
	);
};

export default SuccessComponent;
