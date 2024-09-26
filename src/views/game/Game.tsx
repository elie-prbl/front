import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../base/Layout";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { quizState } from "../../store/features/Quiz/QuizSlices";
import CircleComponent from "../../base/Circle";
import Game1 from "../../svg/Game1";
import { Color, Content, FontSize } from "../../base/constant";
import ButtonComponent from "../../base/Button";
import { ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../../navigation/AppNavigator";
import GameHeaderComponent from "../../components/game/GameHeaderComponent";
import { getQuizModules } from "../../store/features/QuizModules/QuizModulesThunk";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getQuiz } from "../../store/features/Quiz/QuizThunk";
import { topic } from "../../store/features/QuizModules/QuizModulesSlices";
import { updateCurrentQuiz } from "../../store/features/Quiz/CurrentQuizSlice";
import { getUserQuiz } from "../../store/features/UserQuiz/UserQuizThunk";
import { restartLives } from "../../store/features/Lives/LivesSlices";

const Game = () => {
	const navigation = useNavigation<MyNavigationProp>();
	const dispatch = useDispatch<AppDispatch>();
	const selectedModuleId = useAppSelector(state => state.currentQuizModule.value);
	const { modules, isLoading, error } = useAppSelector(state => state.quizModules);
	const [selectedModule, setSelectedModule] = useState<topic | undefined>();

	const { quiz, isLoadingQuiz, errorQuiz } = useAppSelector(state => state.quiz);
	const [selectedItem, setSelectedItem] = useState<quizState | null>(null);
	const [expandedItem, setExpandedItem] = useState<number | null>(null);
	const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
	const [nextQuiz, setNextQuiz] = useState<number>(1);
	const { user } = useAppSelector((state: RootState) => state.user);
	const lives = useAppSelector(state => state.lives.value);

	const handleGoingToGame = useCallback((qid: number) => {
		dispatch(updateCurrentQuiz(qid));
		navigation.navigate("GameQuiz");
	}, []);

	const handleGameModule = () => {
		navigation.navigate("GameModule");
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(getQuizModules());
			} catch (error) {
				console.error("Error fetching quiz modules:", error);
			}
		};

		fetchData();
	}, [dispatch]);

	useEffect(() => {
		try {
			if (modules) {
				setSelectedModule(modules.topics.find(module => module.id === selectedModuleId) ?? modules.topics[0]);
			}
		} catch (error) {
			console.error("Error fetching quiz :", error);
		}
	}, [dispatch, modules, selectedModuleId]);

	useEffect(() => {
		try {
			if (modules && selectedModule) {
				dispatch(getQuiz({ id: modules.quiz_id, topic_id: selectedModule!.id }));
			}
		} catch (error) {
			console.error("Error fetching quiz :", error);
		}
	}, [dispatch, selectedModule]);

	useEffect(() => {
		const fetchCompletedQuizzes = async () => {
			try {
				if (user?.uuid) {
					const response = await dispatch(getUserQuiz(user.uuid)).unwrap();
					setCompletedQuizzes(response.quizIds ? response.quizIds : []);
					setNextQuiz(response.nextQuiz.id ? response.nextQuiz.id : []);
				}
			} catch (error) {
				console.error("Error fetching user quizzes:", error);
			}
		};

		if (user!.uuid) {
			fetchCompletedQuizzes();
		}
	}, [dispatch, user!.uuid]);

	useEffect(() => {
		if (lives === 0) {
			dispatch(restartLives());
		}
	}, [lives]);

	const renderItem = ({ item }: { item: quizState }) => (
		<ListItem.Accordion
			content={
				<View className="items-center">
					<ListItem.Content>
						<CircleComponent
							img={<Game1 />}
							isDisabled={!completedQuizzes.includes(item.id.toString()) && item.id !== nextQuiz}
							isDone={completedQuizzes.includes(item.id.toString())}
							isNext={item.id === nextQuiz}
							classNamePressable="w-28 h-28"
							classNameView="w-24 h-24"
							onPress={() => {
								setSelectedItem(item);
								setExpandedItem(prev => (prev === item.id ? null : item.id));
							}}
						/>
					</ListItem.Content>
				</View>
			}
			noIcon
			containerStyle={{ backgroundColor: "transparent", justifyContent: "center" }}
			isExpanded={expandedItem === item.id}>
			<View className="mx-8 items-center">
				<View className="w-full p-4 rounded-lg" style={{ backgroundColor: Color.PRIMARY }}>
					<Text className={`mb-3 font-bold ${FontSize.TEXT_LG}`} style={{ color: Color.WHITE }}>
						{selectedItem?.title}
					</Text>
					<ButtonComponent
						onPress={() => handleGoingToGame(item.id)}
						content={Content.START}
						width="w-full"
						bg={Color.WHITE}
						textColor={Color.PRIMARY}
						shadowColor={Color.WHITE_OPACITY}
					/>
				</View>
			</View>
		</ListItem.Accordion>
	);

	if (isLoading || isLoadingQuiz)
		return (
			<Layout>
				<ActivityIndicator size="large" color={Color.PRIMARY} className="justify-center h-full" />
			</Layout>
		);

	if (error || errorQuiz)
		return (
			<Layout>
				<View className="h-full justify-center">
					<Text className="text-center font-bold">Erreur lors du chargement.</Text>
					<Text className="text-center font-bold">Revenez plus tard.</Text>
				</View>
			</Layout>
		);

	return (
		<>
			{selectedModule && <GameHeaderComponent onPress={handleGameModule} topic={selectedModule} />}
			<Layout>
				<FlatList data={quiz} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
				<View className="items-center mb-2">
					<ButtonComponent onPress={() => navigation.navigate("GameMatchMaking")} content="Dual quiz" />
				</View>
			</Layout>
		</>
	);
};

export default Game;
