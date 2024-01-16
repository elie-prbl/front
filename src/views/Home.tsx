import React from "react";
import { ScrollView, Text } from "react-native";
import BoxComponent from "../base/Box";
import { Content } from "../base/constant";
import QuestComponent from "../components/quest/QuestComponent";
import ShopHomeComponent from "../components/shop/ShopHomeComponent";
import GameHomeComponent from "../components/game/GameHomeComponent";
import Layout from "../base/Layout";

const Home = () => {
	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false} className="mt-1.5">
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
		</Layout>
	);
};

export default Home;
