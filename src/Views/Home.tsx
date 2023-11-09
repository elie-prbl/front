import { Pressable, Text, View } from "react-native";
import React from "react";
import { Color } from "../base/constant";

const Home = () => {
	return (
		<View className="flex-1 items-center justify-center">
			<Text style={{ color: Color.PRIMARY }}>je suis le home</Text>
			<Pressable>
				<Text>je suis un bouton</Text>
			</Pressable>
		</View>
	);
};

export default Home;
