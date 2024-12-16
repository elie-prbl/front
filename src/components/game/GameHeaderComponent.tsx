import { SafeAreaView, View } from "react-native";
import ModuleGame from "../../base/ModuleGame";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { topic } from "../../store/features/QuizModules/QuizModulesSlices";
import GameHeaderGemLifeComponent from "./GameHeaderGemLifeComponent";
import { useTheme } from "../../context/ThemeContext";

interface GameHeaderComponentProps {
	onPress: () => void;
	topic: topic;
}

const GameHeaderComponent = ({ onPress, topic }: GameHeaderComponentProps) => {
	const { themeVariables } = useTheme();
	return (
		<SafeAreaView style={{ backgroundColor: themeVariables.background }}>
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
