import React, { useEffect } from "react";
import Layout from "../../base/Layout";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../../navigation/AppNavigator";
import BoxComponent from "../../base/Box";
import { Color, Content } from "../../base/constant";
import ModuleGame from "../../base/ModuleGame";
import Circle1 from "../../svg/Circle1";
import { ActivityIndicator, View } from "react-native";
import Circle2 from "../../svg/Circle2";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getCommunityGames } from "../../store/features/Games/GamesThunk";
import { useAppSelector } from "../../store/hooks";
import TextComponent from "../../base/Text";

const Game = () => {
	const navigation = useNavigation<MyNavigationProp>();
	const dispatch = useDispatch<AppDispatch>();
	const { games, isLoadingGames, errorGames } = useAppSelector(state => state.games);
	const colors = [Color.PURPLE_LIGHT, Color.CYAN_LIGHT, Color.PINK_LIGHT, Color.BLUE_BRIGHT_LIGHT];
	const shadowColors = [Color.PURPLE_DARK, Color.CYAN_DARK, Color.PINK_DARK, Color.BLUE_BRIGHT_DARK];

	useEffect(() => {
		dispatch(getCommunityGames());
	}, [dispatch]);

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
				{isLoadingGames && <ActivityIndicator size="large" color={Color.PRIMARY} className="mt-10" />}
				{errorGames && <TextComponent content={Content.ERROR} />}
				{games?.community_games.length ? (
					games.community_games.map(game => (
						<ModuleGame
							onPress={() => navigation.navigate("UnityGame")}
							title={game.title}
							description={game.description}
							bg={colors[game.id % colors.length]}
							borderColor={shadowColors[game.id % shadowColors.length]}
							shadowColor={shadowColors[game.id % shadowColors.length]}
						/>
					))
				) : (
					<TextComponent content={Content.NO_COMMUNITY_GAMES} />
				)}
			</BoxComponent>
		</Layout>
	);
};

export default Game;
