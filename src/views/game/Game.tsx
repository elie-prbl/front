import React from "react";
import Layout from "../../base/Layout";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../../navigation/AppNavigator";
import BoxComponent from "../../base/Box";
import { Color, Content } from "../../base/constant";
import ModuleGame from "../../base/ModuleGame";
import Circle1 from "../../svg/Circle1";
import { View } from "react-native";
import Circle2 from "../../svg/Circle2";

const Game = () => {
	const navigation = useNavigation<MyNavigationProp>();

	return (
		<Layout>
			<BoxComponent title={Content.ELIE_GAMES}>
				<ModuleGame
					onPress={() => navigation.navigate("GameEcoQuiz")}
					title={Content.ECO_QUIZ}
					description={Content.ECO_QUIZ_DESCRIPTION}
					image={<Circle1 />}
					bg={Color.CYAN_LIGHT}
					borderColor={Color.CYAN_DARK}
					shadowColor={Color.CYAN_DARK}
				/>
				<View className="my-1" />
				<ModuleGame
					onPress={() => navigation.navigate("GameMatchMaking")}
					title={Content.DUAL_QUIZ}
					description={Content.DUAL_QUIZ_DESCRIPTION}
					image={<Circle2 />}
					bg={Color.PURPLE_LIGHT}
					borderColor={Color.PURPLE_DARK}
					shadowColor={Color.PURPLE_DARK}
				/>
			</BoxComponent>
			<BoxComponent title={Content.COMMUNITY_GAMES}>
				<ModuleGame
					onPress={() => navigation.navigate("UnityGame")}
					title={Content.COMMUNITY_GAME_1}
					description={Content.COMMUNITY_GAME_1_DESCRIPTION}
					bg={Color.BLUE_BRIGHT_LIGHT}
					borderColor={Color.BLUE_BRIGHT_DARK}
					shadowColor={Color.BLUE_BRIGHT_DARK}
				/>
			</BoxComponent>
		</Layout>
	);
};

export default Game;
