import { View } from "react-native";
import ModuleGame from "../../base/ModuleGame";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { quizModulesState } from "../../store/features/QuizModules/QuizModulesSlices";
import LifeComponent from "../../base/Life";
import GemComponent from "../../base/Gem";

interface GameHeaderComponentProps {
	onPress: () => void;
	module: quizModulesState;
}

const GameHeaderComponent = ({ onPress, module }: GameHeaderComponentProps) => {
	return (
		<View className="my-2 justify-center">
			<View className="flex-row justify-between w-full">
				<GemComponent nb={1250} />
				<LifeComponent nb={5} />
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
