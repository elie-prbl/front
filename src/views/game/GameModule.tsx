import React from "react";
import Layout from "../../base/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ModuleGame from "../../base/ModuleGame";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, FlatList } from "react-native";
import { quizModulesState, topic } from "../../store/features/QuizModules/QuizModulesSlices";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../../navigation/AppNavigator";
import { updateCurrentQuizModule } from "../../store/features/QuizModules/CurrentQuizModuleSlice";
import { Color } from "../../base/constant";

const GameModule = () => {
	const navigation = useNavigation<MyNavigationProp>();
	const modules: quizModulesState | null = useAppSelector(state => state.quizModules.modules);
	const dispatch = useAppDispatch();
	const colors = [Color.PURPLE_LIGHT, Color.CYAN_LIGHT, Color.PINK_LIGHT, Color.BLUE_BRIGHT_LIGHT];
	const shadowColors = [Color.PURPLE_DARK, Color.CYAN_DARK, Color.PINK_DARK, Color.BLUE_BRIGHT_DARK];

	const handleModuleSelection = (moduleId: number) => {
		dispatch(updateCurrentQuizModule(moduleId));
		navigation.navigate("GameEcoQuiz");
	};

	const renderItem = ({ item }: { item: topic }) => (
		<View className="items-center mx-4 my-2">
			<ModuleGame
				onPress={() => handleModuleSelection(item.id)}
				title={item.name}
				description={item.description}
				icon={<MaterialCommunityIcons name="notebook-multiple" size={24} color="white" />}
				bg={colors[item.id % colors.length]}
				shadowColor={shadowColors[item.id % shadowColors.length]}
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
