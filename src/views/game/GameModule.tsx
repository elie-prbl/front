import React from "react";
import Layout from "../../base/Layout";
import { useAppSelector } from "../../store/hooks";
import ModuleGame from "../../base/ModuleGame";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, FlatList } from "react-native";
import { quizModulesState } from "../../store/features/QuizModules/QuizModulesSlices";

const GameModule = () => {
	const modules: quizModulesState[] | null = useAppSelector(state => state.quizModules.modules);

	const renderItem = ({ item }: { item: quizModulesState }) => (
		<View className="items-center mx-4 my-2">
			<ModuleGame
				onPress={() => {}}
				title={item.name}
				description={item.description}
				icon={<MaterialCommunityIcons name="notebook-multiple" size={24} color="white" />}
			/>
		</View>
	);

	return (
		<Layout>
			<FlatList data={modules} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
		</Layout>
	);
};

export default GameModule;
