import GemComponent from "../../base/Gem";
import LifeComponent from "../../base/Life";
import { View } from "react-native";
import React from "react";
import { useAppSelector } from "../../store/hooks";

const GameHeaderGemLifeComponent = () => {
	const lives = useAppSelector(state => state.lives.value);
	const user = useAppSelector(state => state.user.user);

	return (
		<View className="flex-row justify-between w-full">
			<GemComponent nb={user?.currency_amount} />
			<LifeComponent nb={lives} />
		</View>
	);
};

export default GameHeaderGemLifeComponent;
