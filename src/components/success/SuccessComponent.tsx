import React from "react";
import { View } from "react-native";
import ProgressBar from "../../base/ProgressBar";
import { userSuccessState } from "../../store/features/UserSuccesses/UserSuccessesSlices";
import Gem from "../../svg/Gem";
import SuccessQuiz from "../../svg/SuccessQuiz";
import SuccessQuizWin from "../../svg/SuccessQuizWin";
import SuccessConnection from "../../svg/SuccessConnection";
import { TagName } from "../../store/features/UserQuests/UserQuestsSlices";
import TextComponent from "../../base/Text";

export type successProps = {
	userSuccess: userSuccessState;
};

const SuccessComponent = ({ userSuccess }: successProps) => {
	const SwitchImg = (name: TagName) => {
		switch (name) {
			case TagName.Connection:
				return <SuccessConnection />;
			case TagName.Avatar:
				return <SuccessConnection />;
			case TagName.Level:
				return <SuccessQuizWin />;
			case TagName.PlayGames:
				return <SuccessQuiz />;
			case TagName.WinGames:
				return <SuccessQuizWin />;
			default:
				console.log(`error to load success image`);
		}
	};

	return (
		<View className="flex-row w-full my-2 h-28">
			{SwitchImg(userSuccess?.success.tag.name)}
			<View className="flex-col flex-1">
				<TextComponent className="font-semibold" content={userSuccess?.success.name} />
				<View className="flex-row justify-between mt-2 w-full">
					<ProgressBar
						currentStep={userSuccess?.progression}
						totalStep={userSuccess?.success.done_condition}
						width={200}
					/>
					<TextComponent content={userSuccess?.success.done_condition} />
				</View>
				<TextComponent className="mt-3" content="Récompenses :" />
				<View className="flex-row justify-between">
					<TextComponent className="mt-1" content={`+ ${userSuccess?.success.xp}xp`} />
					<View className="flex-row items-center">
						<TextComponent content={`+ ${userSuccess?.success.currency_reward}`} className="mt-1 mr-1" />
						<Gem />
					</View>
				</View>
			</View>
		</View>
	);
};

export default SuccessComponent;
