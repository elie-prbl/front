import React from "react";
import { Text, View } from "react-native";
import BoxStat from "../../base/BoxStat";
import { Color, Content } from "../../base/constant";
import Crown from "../../svg/Crown";
import Flash from "../../svg/Flash";
import Goal from "../../svg/Goal";
import Target from "../../svg/Target";
import Constants from "expo-constants/src/Constants";

const StatDashboardComponent = () => {
	return (
		<View>
			<View className="flex-row justify-between mb-4">
				<BoxStat color={Color.GOLD} result="17" resultType={Content.QUIZZ} icon={<Crown />} />
				<BoxStat color={Color.YELLOW} result="1538" resultType={Content.XP} icon={<Flash />} />
			</View>
			<View className="flex-row justify-between">
				<BoxStat color={Color.RED_LIGHT} result="22" resultType={Content.DISTANCE} icon={<Goal />} />
				<BoxStat color={Color.PRIMARY} result="78%" resultType={Content.PRECISION} icon={<Target />} />
			</View>
		</View>
	);
};

export default StatDashboardComponent;
