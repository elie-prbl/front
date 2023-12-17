import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import Background from "../svg/Background";
import BoxComponent from "../base/Box";
import { Content } from "../base/constant";

const Home = () => {
	return (
		<>
			<Background />
			<SafeAreaView className="h-full">
				<ScrollView>
					<BoxComponent title={Content.DAILY_QUEST} height="h-24">
						<Text />
					</BoxComponent>
					<BoxComponent title={Content.SHOP} itemRight="1224 pts" height="h-24">
						<Text />
					</BoxComponent>
					<BoxComponent title={Content.GAME} height="h-24">
						<Text />
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
