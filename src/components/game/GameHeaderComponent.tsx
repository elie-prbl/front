import { Text, View } from "react-native";
import Gem from "../../svg/Gem";
import { Color, FontSize } from "../../base/constant";
import Life from "../../svg/Life";
import ModuleGame from "../../base/ModuleGame";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { quizModulesState } from "../../store/features/QuizModules/QuizModulesSlices";

interface GameHeaderComponentProps {
	onPress: () => void;
	module: quizModulesState;
}

const GameHeaderComponent = ({ onPress, module }: GameHeaderComponentProps) => {
	return (
		<View className="my-2 justify-center">
			<View className="flex-row justify-between w-full">
				<View className="flex-row items-center">
					<Gem />
					<Text className={`${FontSize.TEXT_XL} ml-1 font-bold`} style={{ color: Color.PRIMARY }}>
						1250
					</Text>
				</View>
				<View className="flex-row items-center">
					<Life />
					<Text className={`${FontSize.TEXT_XL} ml-1 font-bold`} style={{ color: Color.RED_LIGHT }}>
						5
					</Text>
				</View>
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
