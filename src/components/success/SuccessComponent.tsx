import React from "react";
import { View } from "react-native";
import ProgressBar from "../../base/ProgressBar";
import Gem from "../../svg/Gem";
import { TagName } from "../../store/features/UserQuests/UserQuestsSlices";
import TextComponent from "../../base/Text";
import { UserSuccess } from "../../store/features/UserSuccesses/UserSuccessesSlices";
import { Content } from "../../base/constant";
import Sage from "../../svg/Sage";
import Scholar from "../../svg/Scholar";
import Wildfire from "../../svg/Wildfire";

export type successProps = {
	userSuccess: UserSuccess;
};

const SuccessComponent = ({ userSuccess }: successProps) => {
	const SwitchImg = (name: TagName) => {
		switch (name) {
			case TagName.Connection:
				return <Sage />;
			case TagName.Avatar:
				return <Sage />;
			case TagName.Level:
				return <Scholar />;
			case TagName.PlayGames:
				return <Wildfire />;
			case TagName.WinGames:
				return <Scholar />;
			case TagName.Theme:
				return <Sage />;
			default:
				console.log(`error to load success image`);
				return <Sage />;
		}
	};

	return (
		<View className="flex-row w-full my-3">
			<View className="justify-center mr-3">{SwitchImg(userSuccess?.success.tag.name)}</View>
			<View className="flex-col flex-1 justify-center">
				<TextComponent className="font-semibold" content={userSuccess?.success.name} />
				<View className="flex-row justify-between mt-2 w-full">
					<ProgressBar
						currentStep={userSuccess?.progression}
						totalStep={userSuccess?.success.done_condition}
						width={215}
					/>
					<TextComponent content={`${userSuccess?.progression}/${userSuccess?.success?.done_condition}`} />
				</View>
				<TextComponent className="mt-3" content={Content.AWARDS} />
				<View className="flex-row justify-between">
					<TextComponent className="mt-1 font-semibold" content={`${userSuccess?.success.xp} XP`} />
					<View className="flex-row items-center">
						<TextComponent content={`${userSuccess?.success.currency_reward}`} className="mt-1 mr-1 font-semibold" />
						<Gem />
					</View>
				</View>
			</View>
		</View>
	);
};

export default SuccessComponent;
