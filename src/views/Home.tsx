import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import BoxComponent from "../base/Box";
import { Content } from "../base/constant";
import QuestComponent from "../components/quest/QuestComponent";
import ShopHomeComponent from "../components/shop/ShopHomeComponent";
import GameHomeComponent from "../components/game/GameHomeComponent";
import Background from "../svg/Background";
import { useAppDispatch } from "../store/hooks";
import { setPosition } from "../store/features/Position/PositionSlices";
import { getTheCurrentPosition } from "../utils";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../navigation/AppNavigator";

export enum ContentHome {
	MAP = "Map",
}

const Home = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<MyNavigationProp>();

	useEffect(() => {
		getTheCurrentPosition().then(location => {
			if (location) {
				const { latitude, longitude } = location.coords;
				dispatch(setPosition({ latitude, longitude }));
			}
		});
	}, []);

	return (
		<>
			<Background />
			<SafeAreaView className="h-full">
				<ScrollView>
					<BoxComponent title={Content.DAILY_QUEST}>
						<QuestComponent />
					</BoxComponent>
					<BoxComponent title={Content.SHOP} itemRight="1224 pts" height="h-1/5">
						<ShopHomeComponent />
					</BoxComponent>
					<BoxComponent title={Content.GAME}>
						<GameHomeComponent nextQuiz="" />
					</BoxComponent>
					<BoxComponent title={Content.MAP} height="h-auto" onPress={() => navigation.navigate(ContentHome.MAP)}>
						<MapView className="w-full h-full" style={{ borderRadius: 8 }} />
					</BoxComponent>
					<BoxComponent title={Content.EVENT} height="h-24">
						<Text />
					</BoxComponent>
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default Home;
