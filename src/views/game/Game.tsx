import React, { useState } from "react";
import Layout from "../../base/Layout";
import { FlatList, Text, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { quizState } from "../../store/features/Quiz/QuizSlices";
import CircleComponent from "../../base/Circle";
import Game1 from "../../svg/Game1";
import { Color, Content, FontSize } from "../../base/constant";
import ButtonComponent from "../../base/Button";
import { ListItem } from "@rneui/themed";

const Game = () => {
	const quiz: quizState[] = useAppSelector(state => state.quiz.quiz);
	const [selectedItem, setSelectedItem] = useState<quizState | null>(null);
	const [expandedItem, setExpandedItem] = useState<number | null>(null);

	const renderItem = ({ item }: { item: quizState }) => (
		<ListItem.Accordion
			content={
				<View className="items-center">
					<ListItem.Content>
						<CircleComponent
							img={<Game1 />}
							isDisabled={false}
							isDone={false}
							classNamePressable="w-28 h-28"
							classNameView="w-24 h-24"
							onPress={() => {
								setSelectedItem(item);
								setExpandedItem(prev => (prev === item.qid ? null : item.qid));
							}}
						/>
					</ListItem.Content>
				</View>
			}
			noIcon
			containerStyle={{ backgroundColor: "transparent", justifyContent: "center" }}
			isExpanded={expandedItem === item.qid}>
			<View className="mx-8 items-center">
				<View className="w-full p-4 rounded-lg" style={{ backgroundColor: Color.PRIMARY }}>
					<Text className={`mb-3 font-bold ${FontSize.TEXT_LG}`} style={{ color: Color.WHITE }}>
						{selectedItem?.title}
					</Text>
					<ButtonComponent
						onPress={() => {}}
						content={Content.START}
						width="w-full"
						bg={Color.WHITE}
						textColor={Color.PRIMARY}
						shadowColor={Color.WHITE_OPACITY}
					/>
				</View>
			</View>
		</ListItem.Accordion>
	);

	return (
		<Layout>
			<FlatList data={quiz} renderItem={renderItem} keyExtractor={item => item.qid.toString()} />
		</Layout>
	);
};

export default Game;
