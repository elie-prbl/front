import { View } from "react-native";
import ModuleGame from "../../base/ModuleGame";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { quizModulesState } from "../../store/features/QuizModules/QuizModulesSlices";
import LifeComponent from "../../base/Life";
import GemComponent from "../../base/Gem";
import { useAppSelector } from "../../store/hooks";

interface GameHeaderComponentProps {
	onPress: () => void;
	module: quizModulesState;
}

const GameHeaderComponent = ({ onPress, module }: GameHeaderComponentProps) => {
	const lives = useAppSelector(state => state.lives.value);

	return (
		<View className="my-2 justify-center">
			<View className="flex-row justify-between w-full">
				<GemComponent nb={1250} />
				<LifeComponent nb={lives} />
			</View>
			<View className="items-center my-3">
				<ModuleGame
					onPress={onPress}
					title={module.name}
					description={module.description}
					icon={<MaterialCommunityIcons name="notebook-multiple" size={24} color="white" />}
				/>
			</View>
		</View>
	);
};

export default GameHeaderComponent;
