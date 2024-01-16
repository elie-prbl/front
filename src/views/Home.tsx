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
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export enum ContentHome {
	MAP = "Map",
}

const Home = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<MyNavigationProp>();
	const position = useSelector((state: RootState) => state.position.position);

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
			</SafeAreaView>
		</>
	);
};

export default Home;
