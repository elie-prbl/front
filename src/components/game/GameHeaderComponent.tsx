import { SafeAreaView, View } from "react-native";
import ModuleGame from "../../base/ModuleGame";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { topic } from "../../store/features/QuizModules/QuizModulesSlices";
import { Color } from "../../base/constant";
import GameHeaderGemLifeComponent from "./GameHeaderGemLifeComponent";

interface GameHeaderComponentProps {
	onPress: () => void;
	topic: topic;
}

const GameHeaderComponent = ({ onPress, topic }: GameHeaderComponentProps) => {
	return (
		<SafeAreaView style={{ backgroundColor: Color.WHITE }}>
			<View className="my-2 mx-4 justify-center">
				<GameHeaderGemLifeComponent />
				<View className="items-center my-3">
					<ModuleGame
						onPress={onPress}
						title={topic.name}
						description={topic.description}
						icon={<MaterialCommunityIcons name="notebook-multiple" size={24} color="white" />}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default GameHeaderComponent;
