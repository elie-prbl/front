import React from "react";
import { Text, View } from "react-native";
import { Color } from "../../base/constant";
import Crown from "../../svg/Crown";
import Flash from "../../svg/Flash";
import Target from "../../svg/Target";
import Goal from "../../svg/Goal";
const StatDashboardComponent = () => {
	return (
		<View className="flex-row flex-wrap justify-around">
			<View className={`flex-row border-2 border-${Color.GOLD} flex-1 ml-2 rounded-lg p-4 m-1 w-1`}>
				<Crown />
				<View className={`p-4 m-1 flex-row items-center justify-between`}>
					<Text className={`text-${Color.GOLD} font-semibold`}>17</Text>
					<Text className={`text-${Color.GOLD} font-semibold`}>Quizz réussi</Text>
				</View>
			</View>

			<View className={`flex-row border-2 border-${Color.GOLD} flex-1 ml-2 rounded-lg p-4 m-1`}>
				<Flash />
				<View className={`p-4 m-1 flex-row items-center justify-between`}>
					<Text className={`text-${Color.GOLD} font-semibold`}>17</Text>
					<Text className={`text-${Color.GOLD} font-semibold`}>Quizz réussi</Text>
				</View>
			</View>

			<View className={`flex-row border-2 border-${Color.RED_LIGHT} flex-1 ml-2 rounded-lg p-4 m-1`}>
				<Target />
				<View className={`p-4 m-1 flex-row items-center justify-between`}>
					<Text className={`text-${Color.RED_LIGHT} font-semibold`}>17</Text>
					<Text className={`text-${Color.RED_LIGHT} font-semibold`}>Quizz réussi</Text>
				</View>
			</View>

			<View className={`flex-row border-2 border-${Color.GOLD} rounded-lg p-4 m-1`}>
				<Goal />
				<View className={`p-4 m-1 flex-row items-center justify-between`}>
					<Text className={`text-${Color.GOLD} font-semibold`}>17</Text>
					<Text className={`text-${Color.GOLD} font-semibold`}>Quizz réussi</Text>
				</View>
			</View>
		</View>
	);
};

export default StatDashboardComponent;
