import React from "react";
import Layout from "../base/Layout";
import { ScrollView, View } from "react-native";
import BoxComponent from "../base/Box";
import { Content } from "../base/constant";
import QuestComponent from "../components/quest/QuestComponent";
import Circle1 from "../svg/Circle1";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Difficulty } from "../store/features/Quests/QuestsSlices";
import SuccessComponent from "../components/success/successComponent";

const Quest = () => {
	const quests = useSelector((state: RootState) => state.quests.quests);
	const success = useSelector((state: RootState) => state.success.success);

	return (
		<Layout>
			<ScrollView>
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
