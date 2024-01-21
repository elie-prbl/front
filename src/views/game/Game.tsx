import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../base/Layout";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { quizState } from "../../store/features/Quiz/QuizSlices";
import CircleComponent from "../../base/Circle";
import Game1 from "../../svg/Game1";
import { Color, Content, FontSize } from "../../base/constant";
import ButtonComponent from "../../base/Button";
import { ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp, NavigationGameQuizProps } from "../../navigation/AppNavigator";
import GameHeaderComponent from "../../components/game/GameHeaderComponent";
import { getQuizModules } from "../../store/features/QuizModules/QuizModulesThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

const Game = () => {
	const navigationGameQuiz = useNavigation<NavigationGameQuizProps>();
	const navigationGameModule = useNavigation<MyNavigationProp>();
	const dispatch = useDispatch<AppDispatch>();

	const { modules, isLoading } = useAppSelector(state => state.quizModules);

	const quiz: quizState[] = useAppSelector(state => state.quiz.quiz);
	const [selectedItem, setSelectedItem] = useState<quizState | null>(null);
	const [expandedItem, setExpandedItem] = useState<number | null>(null);

	const handleGoingToGame = useCallback((qid: number) => {
		navigationGameQuiz.navigate("GameQuiz", { qid });
	}, []);

	const handleGameModule = () => {
		navigationGameModule.navigate("GameModule");
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

	const renderItem = ({ item }: { item: quizState }) => (
		<ListItem.Accordion
			content={
				<View className="items-center">
					<ListItem.Content>
						<CircleComponent
							img={<Game1 />}
							isDisabled={false}
							isDone={false}
							classNamePressable="w-28 h-28"
							classNameView="w-24 h-24"
							onPress={() => {
								setSelectedItem(item);
								setExpandedItem(prev => (prev === item.qid ? null : item.qid));
							}}
						/>
					</ListItem.Content>
				</View>
			}
			noIcon
			containerStyle={{ backgroundColor: "transparent", justifyContent: "center" }}
			isExpanded={expandedItem === item.qid}>
			<View className="mx-8 items-center">
				<View className="w-full p-4 rounded-lg" style={{ backgroundColor: Color.PRIMARY }}>
					<Text className={`mb-3 font-bold ${FontSize.TEXT_LG}`} style={{ color: Color.WHITE }}>
						{selectedItem?.title}
					</Text>
					<ButtonComponent
						onPress={() => handleGoingToGame(item.qid)}
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

	return (
		<>
			{isLoading ? (
				<Layout>
					<ActivityIndicator size="large" color={Color.PRIMARY} className="justify-center h-full" />
				</Layout>
			) : (
				<>
					<GameHeaderComponent onPress={handleGameModule} module={modules![0]} />
					<Layout>
						<FlatList data={quiz} renderItem={renderItem} keyExtractor={item => item.qid.toString()} />
					</Layout>
				</>
			)}
		</>
	);
};

export default Game;
