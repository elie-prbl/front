import React from "react";
import { View } from "react-native";
import BoxStat from "../../base/BoxStat";
import { Color, Content } from "../../base/constant";
import Crown from "../../svg/Crown";
import Flash from "../../svg/Flash";
import Goal from "../../svg/Goal";
import Target from "../../svg/Target";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StatDashboardComponent = () => {
	const user = useSelector((state: RootState) => state.user.user);
	return (
		<View>
			<View className="flex-row justify-between mb-4">
				<BoxStat color={Color.GOLD} result={0} resultType={Content.QUIZZ} icon={<Crown />} />
				<BoxStat color={Color.PURPLE_DARK} result={user?.xp} resultType={Content.XP} icon={<Flash />} />
			</View>
			<View className="flex-row justify-between">
				<BoxStat color={Color.RED} result={0} resultType={Content.DISTANCE} icon={<Goal />} />
				<BoxStat
					color={Color.PRIMARY}
					result={user?.currency_amount}
					resultType={Content.PRECISION}
					icon={<Target />}
				/>
			</View>
		</View>
	);
};

export default StatDashboardComponent;
