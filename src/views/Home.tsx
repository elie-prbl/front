import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import BoxComponent from "../base/Box";
import { Color, Content } from "../base/constant";
import QuestComponent from "../components/quest/QuestComponent";
import ShopHomeComponent from "../components/shop/ShopHomeComponent";
import GameHomeComponent from "../components/game/GameHomeComponent";
import { useAppDispatch } from "../store/hooks";
import { setPosition } from "../store/features/Position/PositionSlices";
import { getTheCurrentPosition } from "../utils";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../navigation/AppNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Layout from "../base/Layout";
import Circle1 from "../svg/Circle1";
import { getDailyQuests } from "../store/features/Quests/QuestsThunk";

export enum ContentHome {
	MAP = "Map",
}

const Home = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<MyNavigationProp>();
	const position = useSelector((state: RootState) => state.position.position);
	const { quests, isLoading, error } = useSelector((state: RootState) => state.quests);
	const user = useSelector((state: RootState) => state.user.user);

	useEffect(() => {
		getTheCurrentPosition().then(location => {
			if (location) {
				const { latitude, longitude } = location.coords;
				dispatch(setPosition({ latitude, longitude }));
			}
		});
	}, []);

	useEffect(() => {
		dispatch(getDailyQuests());
	}, [dispatch]);

	const handleNavigateToGame = () => {
		navigation.navigate("TabNav", {
			screen: "Game",
		});
	};

	const questsMapping = quests.map((q, index) => {
		console.log("home", q.progress);
		return <QuestComponent key={index} quest={q} img={<Circle1 />} />;
	});

	if (isLoading)
		return (
			<Layout>
				<ActivityIndicator size="large" color={Color.PRIMARY} className="justify-center h-full" />
			</Layout>
		);

	if (error)
		return (
			<Layout>
				<View className="h-full justify-center">
					<Text className="text-center font-bold">Erreur lors du chargement.</Text>
					<Text className="text-center font-bold">Revenez plus tard.</Text>
				</View>
			</Layout>
		);

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<BoxComponent title={Content.DAILY_QUEST} onPress={handleNavigateToGame}>
					{questsMapping}
				</BoxComponent>
				<BoxComponent title={Content.SHOP} itemRight={`${user?.currency_amount} rubis`} height="h-1/5">
					<ShopHomeComponent />
				</BoxComponent>
				<BoxComponent title={Content.GAME}>
					<GameHomeComponent nextQuiz="" />
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
					<Text />
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default Home;
