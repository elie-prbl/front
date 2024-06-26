import React from "react";
import { Text, View } from "react-native";
import ProgressBar from "../../base/ProgressBar";
import { userSuccessState } from "../../store/features/UserSuccesses/UserSuccessesSlices";
import Gem from "../../svg/Gem";
import SuccessQuiz from "../../svg/SuccessQuiz";
import SuccessQuizWin from "../../svg/SuccessQuizWin";
import SuccessConnection from "../../svg/SuccessConnection";
import { TagName } from "../../store/features/UserQuests/UserQuestsSlices";

export type successProps = {
	userSuccess: userSuccessState;
};

const SuccessComponent = ({ userSuccess }: successProps) => {
	const SwitchImg = (name: TagName) => {
		switch (name) {
			case TagName.PlayQuizTag:
				return <SuccessQuiz />;
			case TagName.ConnectionTag:
				return <SuccessConnection />;
			case TagName.WonQuizTag:
				return <SuccessQuizWin />;
			case TagName.AvatarTag:
				return <SuccessConnection />;
			case TagName.LevelTag:
				return <SuccessQuizWin />;
			case TagName.PlayGameTag:
				return <SuccessQuiz />;
			case TagName.WonGameTag:
				return <SuccessQuizWin />;
			default:
				console.log(`error to load success image`);
		}
	};

	return (
		<View className="flex-row w-full my-2 h-28">
			{SwitchImg(userSuccess?.success.tag.name)}
			<View className="flex-col flex-1">
				<Text className="font-semibold">{userSuccess?.success.name}</Text>
				<View className="flex-row justify-between mt-2 w-full">
					<ProgressBar
						currentStep={userSuccess?.progression}
						totalStep={userSuccess?.success.done_condition}
						width={200}
					/>
					<Text>
						{userSuccess?.progression} / {userSuccess?.success.done_condition}
					</Text>
				</View>
				<Text className="mt-3">Récompenses :</Text>
				<View className="flex-row justify-between">
					<Text className="mt-1">+ {userSuccess?.success.xp} xp</Text>
					<View className="flex-row items-center">
						<Text className="mt-1 mr-1">+ {userSuccess?.success.currency_reward}</Text>
						<Gem />
					</View>
				</View>
			</View>
		</View>
	);
};

export default SuccessComponent;
