import React from "react";
import { View } from "react-native";
import BoxStat from "../../base/BoxStat";
import { Color, Content } from "../../base/constant";
import Crown from "../../svg/Crown";
import Flash from "../../svg/Flash";
import Target from "../../svg/Target";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Gem from "../../svg/Gem";

const StatDashboardComponent = () => {
	const user = useSelector((state: RootState) => state.user.user);
	return (
		<View>
			<View className="flex-row justify-between mb-4">
				<BoxStat color={Color.GOLD} result={0} resultType={Content.QUIZZ} icon={<Crown />} />
				<BoxStat color={Color.PURPLE_DARK} result={user?.xp} resultType={Content.XP} icon={<Flash />} />
			</View>
			<View className="flex-row justify-between">
				<BoxStat
					color={Color.PRIMARY}
					result={user?.currency_amount}
					resultType={Content.GEMS}
					icon={<Gem width={40} height={50} />}
				/>
				<BoxStat color={Color.RED} result={user?.Level.level_number} resultType={Content.LEVEL} icon={<Target />} />
			</View>
		</View>
	);
};

export default StatDashboardComponent;
