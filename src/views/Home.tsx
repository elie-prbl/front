import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import BoxComponent from "../base/Box";
import { Content } from "../base/constant";
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
import { Difficulty } from "../store/features/Quests/QuestsSlices";

export enum ContentHome {
	MAP = "Map",
}

const Home = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<MyNavigationProp>();
	const position = useSelector((state: RootState) => state.position.position);
	const quests = useSelector((state: RootState) => state.quests.quests);
	const user = useSelector((state: RootState) => state.user.user);

	useEffect(() => {
		getTheCurrentPosition().then(location => {
			if (location) {
				const { latitude, longitude } = location.coords;
				dispatch(setPosition({ latitude, longitude }));
			}
		});
	}, []);

	const handleNavigateToGame = () => {
		navigation.navigate("TabNav", {
			screen: "Game",
		});
	};

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<BoxComponent title={Content.DAILY_QUEST} onPress={handleNavigateToGame}>
					<QuestComponent quest={quests.filter(q => q.difficulty === Difficulty.BEGINNER)[0]} img={<Circle1 />} />
					<QuestComponent quest={quests.filter(q => q.difficulty === Difficulty.INTERMEDIATE)[0]} img={<Circle1 />} />
					<QuestComponent quest={quests.filter(q => q.difficulty === Difficulty.ADVANCED)[0]} img={<Circle1 />} />
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
