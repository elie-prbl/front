import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import BoxComponent from "../base/Box";
import { Content } from "../base/constant";
import QuestComponent from "../components/quest/QuestComponent";
import ShopHomeComponent from "../components/shop/ShopHomeComponent";
import GameHomeComponent from "../components/game/GameHomeComponent";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setPosition } from "../store/features/Position/PositionSlices";
import { getTheCurrentPosition } from "../utils";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../navigation/AppNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Layout from "../base/Layout";
import Circle1 from "../svg/Circle1";
import { Difficulty } from "../store/features/Quests/QuestsSlices";
import GemComponent from "../base/Gem";
import { getUser } from "../store/features/User/UserThunk";
import { getQuizModules } from "../store/features/QuizModules/QuizModulesThunk";
import { getUserQuiz } from "../store/features/UserQuiz/UserQuizThunk";

export enum ContentHome {
	MAP = "Map",
	GAME = "Game",
	SHOP = "Shop",
}

interface quiz {
	id: number;
	questions: [];
	title: string;
	topic: string;
}

const Home = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<MyNavigationProp>();
	const position = useSelector((state: RootState) => state.position.position);
	const quests = useSelector((state: RootState) => state.quests.quests);
	const { user, isLoading, error } = useAppSelector((state: RootState) => state.user);
	const [nextQuizzes, setNextQuizzes] = React.useState<string[]>([]);
	const userId = "6";

	useEffect(() => {
		const fetchCompletedQuizzes = async () => {
			try {
				const response = await dispatch(getUserQuiz(userId)).unwrap();
				setNextQuizzes(response.nextQuiz.title ? response.nextQuiz.title : []);
			} catch (error) {
				console.error("Error fetching user quizzes:", error);
			}
		};

		if (userId) {
			fetchCompletedQuizzes();
		}
	}, [dispatch, userId]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (user?.uuid) {
					await dispatch(getUser(user.uuid));
				}
			} catch (error) {
				console.error("Error get user:", error);
			}
		};

		fetchData();
	}, [dispatch]);

	useEffect(() => {}, []);

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<BoxComponent title={Content.DAILY_QUEST} onPress={() => navigation.navigate(ContentHome.GAME)}>
					<QuestComponent quest={quests.filter(q => q.difficulty === Difficulty.BEGINNER)[0]} img={<Circle1 />} />
					<QuestComponent quest={quests.filter(q => q.difficulty === Difficulty.INTERMEDIATE)[0]} img={<Circle1 />} />
					<QuestComponent quest={quests.filter(q => q.difficulty === Difficulty.ADVANCED)[0]} img={<Circle1 />} />
				</BoxComponent>
				<BoxComponent
					title={Content.SHOP}
					itemRight={<GemComponent nb={user?.currency_amount} />}
					height="h-40"
					onPress={() => navigation.navigate(ContentHome.SHOP)}>
					<ShopHomeComponent />
				</BoxComponent>
				<BoxComponent title={Content.GAME} onPress={() => navigation.navigate(ContentHome.GAME)}>
					<GameHomeComponent nextQuiz={nextQuizzes} />
				</BoxComponent>
				<BoxComponent title={Content.MAP} height="h-48" onPress={() => navigation.navigate(ContentHome.MAP)}>
					<MapView
						className="w-full"
						style={{ borderRadius: 8, height: "75%" }}
						region={{
							latitude: position?.latitude ?? 0,
							longitude: position?.longitude ?? 0,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
						showsUserLocation
					/>
				</BoxComponent>
				<BoxComponent title={Content.EVENT} height="h-24">
					<Text>Fonctionnalité à découvrir prochainement !</Text>
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default Home;
