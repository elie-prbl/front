import { SafeAreaView, View } from "react-native";
import ModuleGame from "../../base/ModuleGame";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { topic } from "../../store/features/QuizModules/QuizModulesSlices";
import LifeComponent from "../../base/Life";
import GemComponent from "../../base/Gem";
import { useAppSelector } from "../../store/hooks";
import { Color } from "../../base/constant";

interface GameHeaderComponentProps {
	onPress: () => void;
	topic: topic;
}

const GameHeaderComponent = ({ onPress, topic }: GameHeaderComponentProps) => {
	const lives = useAppSelector(state => state.lives.value);

	return (
		<SafeAreaView style={{ backgroundColor: Color.WHITE }}>
			<View className="my-2 mx-4 justify-center">
				<View className="flex-row justify-between w-full">
					<GemComponent nb={1250} />
					<LifeComponent nb={lives} />
				</View>
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
