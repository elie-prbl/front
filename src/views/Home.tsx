import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import BoxComponent from "../base/Box";
import { Content } from "../base/constant";
import QuestComponent from "../components/quest/QuestComponent";
import ShopHomeComponent from "../components/shop/ShopHomeComponent";
import GameHomeComponent from "../components/game/GameHomeComponent";
import Background from "../svg/Background";

const Home = () => {
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
					<BoxComponent title={Content.MAP} height="h-24">
						<Text />
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
