import React from "react";
import Layout from "../base/Layout";
import { ScrollView, View } from "react-native";
import BoxComponent from "../base/Box";
import { Color, Content } from "../base/constant";
import QuestComponent from "../components/quest/QuestComponent";
import Circle1 from "../svg/Circle1";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Difficulty } from "../store/features/Quests/QuestsSlices";
import SuccessComponent from "../components/success/successComponent";
import ModuleGame from "../base/ModuleGame";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../navigation/AppNavigator";

export enum ContentQuest {
	SHOP = "Shop",
}

const Quest = () => {
	const quests = useSelector((state: RootState) => state.quests.quests);
	const success = useSelector((state: RootState) => state.success.success);
	const navigation = useNavigation<MyNavigationProp>();

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<ModuleGame
					onPress={() => navigation.navigate(ContentQuest.SHOP)}
					title={Content.SHOP_TITLE}
					bg={Color.CYAN_LIGHT}
					shadowColor={Color.CYAN_DARK}
					borderColor={Color.CYAN_DARK}
					width="w-[95%] self-center mt-2"
					description={Content.SHOP_DESCRIPTION}
					icon={<Entypo name="shop" size={24} color="white" />}
				/>
				<BoxComponent title={Content.DAILY_QUEST}>
					<QuestComponent quest={quests.filter(q => q.difficulty === Difficulty.BEGINNER)[0]} img={<Circle1 />} />
					<QuestComponent quest={quests.filter(q => q.difficulty === Difficulty.INTERMEDIATE)[0]} img={<Circle1 />} />
					<QuestComponent quest={quests.filter(q => q.difficulty === Difficulty.ADVANCED)[0]} img={<Circle1 />} />
				</BoxComponent>
				<BoxComponent title={Content.SUCCESS}>
					{success.map((s, index) => {
						return (
							<View key={index}>
								<SuccessComponent success={s} />
							</View>
						);
					})}
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default Quest;
