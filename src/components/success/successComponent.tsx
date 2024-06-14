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
			case "level":
				return <SuccessQuiz />;
			case "login":
				return <SuccessConnection />;
			case "quiz_complete":
				return <SuccessQuizWin />;
			case "avatar":
				return <SuccessConnection />;
			default:
				console.log(`error to load success image`);
		}
	};

	return (
		<View className="flex-row w-full my-2 h-28">
			{SwitchImg(success?.success.tags)}
			<View className="flex-col flex-1">
				<Text className="font-semibold">{success?.success.name}</Text>
				<View className="flex-row justify-between mt-2 w-full">
					<ProgressBar currentStep={success?.progression} totalStep={success?.success.done_condition} width={200} />
					<Text>
						{success?.progression} / {success?.success.done_condition}
					</Text>
				</View>
				<Text className="mt-3">Récompenses :</Text>
				<View className="flex-row justify-between">
					<Text className="mt-1">+ {success?.success.xp} xp</Text>
					<View className="flex-row items-center">
						<Text className="mt-1 mr-1">+ {success?.success.currency_reward}</Text>
						<Gem />
					</View>
				</View>
			</View>
		</View>
	);
};

export default SuccessComponent;
