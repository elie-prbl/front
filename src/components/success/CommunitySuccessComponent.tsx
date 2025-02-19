import React from "react";
import { View } from "react-native";
import TextComponent from "../../base/Text";
import { CommunitySuccesses } from "../../store/features/UserSuccesses/UserSuccessesSlices";
import Feather from "@expo/vector-icons/Feather";
import { Color } from "../../base/constant";

export type communitySuccessProps = {
	userSuccess: CommunitySuccesses;
};

const CommunitySuccessComponent = ({ userSuccess }: communitySuccessProps) => {
	return (
		<View className="flex-row w-full my-3 justify-between items-center">
			<View className="mr-3">
				<TextComponent className="font-semibold" content={userSuccess?.success.name} />
				<TextComponent className="font-semibold" content={`Jeu : ${userSuccess?.success.game.title}`} />
			</View>
			<Feather name="check-circle" size={24} color={userSuccess.is_validated ? Color.PRIMARY : Color.GREY} />
		</View>
	);
};

export default CommunitySuccessComponent;
