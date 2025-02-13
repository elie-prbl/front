import React, { useEffect, useState } from "react";
import Layout from "../base/Layout";
import { ActivityIndicator, ScrollView, View } from "react-native";
import BoxComponent from "../base/Box";
import { Color, Content } from "../base/constant";
import QuestComponent from "../components/quest/QuestComponent";
import Circle1 from "../svg/Circle1";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SuccessComponent from "../components/success/SuccessComponent";
import ModuleGame from "../base/ModuleGame";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../navigation/AppNavigator";
import { useAppSelector } from "../store/hooks";
import { UserSuccess } from "../store/features/UserSuccesses/UserSuccessesSlices";
import { Divider } from "@rneui/themed";

export enum ContentQuest {
	SHOP = "Shop",
}

const Quest = () => {
	const { userQuests, isLoadingUserQuest } = useSelector((state: RootState) => state.userQuests);
	const navigation = useNavigation<MyNavigationProp>();
	const { userSuccesses, isLoadingUserSuccesses, isRetrievedUserSuccess } = useAppSelector(
		(state: RootState) => state.userSuccesses,
	);
	const [firstOfEachShortName, setFirstOfEachShortName] = useState<UserSuccess[]>([]);

	useEffect(() => {
		if (userSuccesses) {
			const filtered = userSuccesses
				.filter(s => !s.is_completed)
				.sort((a, b) => a.success.short_name.localeCompare(b.success.short_name))
				.reduce<UserSuccess[]>((acc, current) => {
					const exists = acc.find(item => item.success.short_name === current.success.short_name);
					if (!exists) {
						acc.push(current);
					}
					return acc;
				}, []);
			setFirstOfEachShortName(filtered);
		}
	}, [isRetrievedUserSuccess]);

	if (isLoadingUserQuest || isLoadingUserSuccesses) {
		return (
			<Layout>
				<ActivityIndicator size="large" color={Color.PRIMARY} className="justify-center h-full" />
			</Layout>
		);
	}

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<ModuleGame
					onPress={() => navigation.navigate(ContentQuest.SHOP)}
					title={Content.SPEND_SHOP}
					bg={Color.CYAN_LIGHT}
					shadowColor={Color.CYAN_DARK}
					borderColor={Color.CYAN_DARK}
					width="w-[95%] self-center mt-2"
					description={Content.GO_SHOP}
					icon={<Entypo name="shop" size={24} color="white" />}
				/>
				<BoxComponent title={Content.DAILY_QUEST}>
					{Array.isArray(userQuests) &&
						userQuests.map(userQuest => <QuestComponent key={userQuest.id} userQuest={userQuest} img={<Circle1 />} />)}
				</BoxComponent>
				<BoxComponent title={Content.SUCCESS}>
					{firstOfEachShortName?.map((success, index) => {
						return (
							<View key={index}>
								<SuccessComponent userSuccess={success} />
								{index !== firstOfEachShortName?.length - 1 && <Divider />}
							</View>
						);
					})}
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default Quest;
