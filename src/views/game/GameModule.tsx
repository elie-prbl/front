import React from "react";
import Layout from "../../base/Layout";
import { useAppSelector } from "../../store/hooks";
import ModuleGame from "../../base/ModuleGame";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, FlatList } from "react-native";
import { quizModulesState, topic } from "../../store/features/QuizModules/QuizModulesSlices";
import { useNavigation } from "@react-navigation/core";
import { NavigationGameProps } from "../../navigation/AppNavigator";

const GameModule = () => {
	const navigation = useNavigation<NavigationGameProps>();
	const modules: quizModulesState | null = useAppSelector(state => state.quizModules.modules);

	const handleModuleSelection = (moduleId: number) => {
		navigation.navigate("Game", { selectedModuleId: moduleId });
	};

	const renderItem = ({ item }: { item: topic }) => (
		<View className="items-center mx-4 my-2">
			<ModuleGame
				onPress={() => handleModuleSelection(item.id)}
				title={item.name}
				description={item.description}
				icon={<MaterialCommunityIcons name="notebook-multiple" size={24} color="white" />}
			/>
		</View>
	);

	return (
		<Layout>
			{modules && <FlatList data={modules.topics} renderItem={renderItem} keyExtractor={item => item.id.toString()} />}
		</Layout>
	);
};

export default GameModule;
