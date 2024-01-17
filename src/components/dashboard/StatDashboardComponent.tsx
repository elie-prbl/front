import React from "react";
import { Text, View } from "react-native";
import BoxStat from "../../base/BoxStat";
import { Color } from "../../base/constant";

const StatDashboardComponent = () => {
	return (
		<View>
			<View className="flex-row justify-between mb-4">
				<BoxStat color={Color.GOLD} result="17" resultType="Quizzs réussi" />
				<BoxStat color={Color.RED_LIGHT} result="1538" resultType="Total xp" />
			</View>
			<View className="flex-row justify-between">
				<BoxStat color={Color.CYAN_DARK} result="22" resultType="km parcouru" />
				<BoxStat color={Color.PRIMARY} result="78%" resultType="Précisions" />
			</View>
		</View>
	);
};

export default StatDashboardComponent;
