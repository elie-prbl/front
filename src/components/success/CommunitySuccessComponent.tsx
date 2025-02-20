import React from "react";
import { View } from "react-native";
import TextComponent from "../../base/Text";
import { CommunitySuccesses } from "../../store/features/UserSuccesses/UserSuccessesSlices";
import Feather from "@expo/vector-icons/Feather";
import { Color } from "../../base/constant";
import CommunityGame from "../../svg/CommunityGame";

export type communitySuccessProps = {
	userSuccess: CommunitySuccesses;
};

const CommunitySuccessComponent = ({ userSuccess }: communitySuccessProps) => {
	return (
		<View className="flex-row w-full my-3 items-center">
			<View className="justify-center mr-3">
				<CommunityGame />
			</View>
			<View className="flex-row flex-1 justify-between items-center">
				<View>
					<TextComponent className="font-semibold mb-1" content={userSuccess?.success.name} />
					<TextComponent content={`Jeu : ${userSuccess?.success.game.title}`} />
				</View>
				<Feather name="check-circle" size={24} color={userSuccess.is_validated ? Color.PRIMARY : Color.GREY} />
			</View>
		</View>
	);
};

export default CommunitySuccessComponent;
