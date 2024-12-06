import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import BoxComponent from "../base/Box";
import { Color, Content } from "../base/constant";
import QuestComponent from "../components/quest/QuestComponent";
import ShopHomeComponent from "../components/shop/ShopHomeComponent";
import GameHomeComponent from "../components/game/GameHomeComponent";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../navigation/AppNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Layout from "../base/Layout";
import Circle1 from "../svg/Circle1";
import GemComponent from "../base/Gem";
import { getUser } from "../store/features/User/UserThunk";
import { getUserQuests } from "../store/features/UserQuests/UserQuestsThunk";
import { getUserQuiz } from "../store/features/UserQuiz/UserQuizThunk";
import { useTheme } from "../context/ThemeContext";
import GuideCompactMap from "../components/guide/GuideCompactMap";

export enum ContentHome {
	GUIDE = "Guide",
	GAME = "Game",
	SHOP = "Shop",
}

const Home = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<MyNavigationProp>();
	const position = useSelector((state: RootState) => state.position.position);
	const { userQuests, isLoadingUserQuest } = useSelector((state: RootState) => state.userQuests);
	const { user } = useAppSelector((state: RootState) => state.user);
	const { userQuiz } = useAppSelector((state: RootState) => state.userQuiz);
	const { themeVariables } = useTheme();

	useEffect(() => {
		(async () => {
			await fetchData();
		})();
	}, [dispatch]);

	const fetchData = async () => {
		try {
			if (user?.uuid) {
				await dispatch(getUser(user.uuid));
				await dispatch(getUserQuests(user.uuid));
				await dispatch(getUserQuiz({ user_uuid: user.uuid, quiz_id: "1" }));
			}
		} catch (error) {
			console.error("Error get user:", error);
		}
	};

	if (isLoadingUserQuest) {
		return (
			<Layout>
				<ActivityIndicator size="large" color={themeVariables.primary} className="justify-center h-full" />
			</Layout>
		);
	}

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<BoxComponent title={Content.DAILY_QUEST} onPress={() => navigation.navigate(ContentHome.GAME)}>
					{Array.isArray(userQuests) &&
						userQuests.map(userQuest => <QuestComponent key={userQuest.id} userQuest={userQuest} img={<Circle1 />} />)}
				</BoxComponent>
				<BoxComponent
					title={Content.SHOP}
					itemRight={<GemComponent nb={user?.currency_amount} />}
					height="h-40"
					onPress={() => navigation.navigate(ContentHome.SHOP)}>
					<ShopHomeComponent />
				</BoxComponent>
				<BoxComponent title={Content.GAME} onPress={() => navigation.navigate(ContentHome.GAME)}>
					<GameHomeComponent nextQuiz={userQuiz?.nextQuiz} />
				</BoxComponent>
				<BoxComponent title={Content.MAP} height="h-48" onPress={() => navigation.navigate(ContentHome.GUIDE)}>
					<GuideCompactMap />
				</BoxComponent>
				<BoxComponent title={Content.EVENT} height="h-24">
					<Text style={{ color: themeVariables.text }}>Fonctionnalité à découvrir prochainement !</Text>
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default Home;
