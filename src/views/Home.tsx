import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import BoxComponent from "../base/Box";
import { Color, Content } from "../base/constant";
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
import GemComponent from "../base/Gem";
import { getUser } from "../store/features/User/UserThunk";
import { getUserQuests } from "../store/features/UserQuests/UserQuestsThunk";
import { getUserQuiz } from "../store/features/UserQuiz/UserQuizThunk";

export enum ContentHome {
	MAP = "Map",
	GAME = "Game",
	SHOP = "Shop",
}

const Home = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<MyNavigationProp>();
	const position = useSelector((state: RootState) => state.position.position);
	const { userQuests, isLoadingUserQuest } = useSelector((state: RootState) => state.userQuests);
	const [nextQuiz, setNextQuiz] = React.useState<string>("");
	const { user, isLoading } = useAppSelector((state: RootState) => state.user);

	useEffect(() => {
		getTheCurrentPosition().then(location => {
			if (location) {
				const { latitude, longitude } = location.coords;
				dispatch(setPosition({ latitude, longitude }));
			}
		});
	}, []);

	useEffect(() => {
		const fetchCompletedQuizzes = async () => {
			try {
				const response = await dispatch(getUserQuiz(user!.uuid)).unwrap();
				setNextQuiz(response.nextQuiz.title ? response.nextQuiz.title : "");
			} catch (error) {
				console.error("Error fetching user quizzes:", error);
			}
		};

		if (user!.uuid) {
			fetchCompletedQuizzes();
		}
	}, [dispatch, user!.uuid]);

	useEffect(() => {
		fetchData();
	}, [dispatch]);

	const fetchData = async () => {
		try {
			if (user?.uuid) {
				await dispatch(getUser(user.uuid));
				await dispatch(getUserQuests(user.id));
			}
		} catch (error) {
			console.error("Error get user:", error);
		}
	};

	if (isLoading) {
		return (
			<Layout>
				<ActivityIndicator />
			</Layout>
		);
	}

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<BoxComponent title={Content.DAILY_QUEST} onPress={() => navigation.navigate(ContentHome.GAME)}>
					{isLoadingUserQuest ? (
						<ActivityIndicator size="large" color={Color.PRIMARY} className="justify-center" />
					) : (
						userQuests.map(userQuest => <QuestComponent key={userQuest.id} userQuest={userQuest} img={<Circle1 />} />)
					)}
				</BoxComponent>
				<BoxComponent
					title={Content.SHOP}
					itemRight={<GemComponent nb={user?.currency_amount} />}
					height="h-40"
					onPress={() => navigation.navigate(ContentHome.SHOP)}>
					<ShopHomeComponent />
				</BoxComponent>
				<BoxComponent title={Content.GAME} onPress={() => navigation.navigate(ContentHome.GAME)}>
					<GameHomeComponent nextQuiz={nextQuiz} />
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
