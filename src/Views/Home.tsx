import { Pressable, Text, View } from "react-native";
import React from "react";

const Home = () => {
	return (
		<View className="flex-1 items-center justify-center">
			<Text>je suis le home</Text>
			<Pressable>
				<Text>je suis un bouton</Text>
			</Pressable>
		</View>
	);
};

export default Home;
