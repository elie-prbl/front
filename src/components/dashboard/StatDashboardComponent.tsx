import React, { useEffect } from "react";
import { View } from "react-native";
import BoxStat from "../../base/BoxStat";
import { Color, Content } from "../../base/constant";
import Crown from "../../svg/Crown";
import Flash from "../../svg/Flash";
import Target from "../../svg/Target";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Gem from "../../svg/Gem";
import { getUserQuiz } from "../../store/features/UserQuiz/UserQuizThunk";
import { useAppDispatch } from "../../store/hooks";
import { useTheme } from "../../context/ThemeContext";

const StatDashboardComponent = () => {
	const dispatch = useAppDispatch();
	const user = useSelector((state: RootState) => state.user.user);
	const { userQuiz } = useSelector((state: RootState) => state.userQuiz);
	const { themeVariables } = useTheme();

	useEffect(() => {
		if (user?.uuid) {
			dispatch(getUserQuiz({ user_uuid: user.uuid, quiz_id: "1" }));
		}
	}, [dispatch, user?.uuid]);

	return (
		<View>
			<View className="flex-row justify-between mb-4">
				<BoxStat
					color={Color.GOLD}
					result={!userQuiz?.quizIds ? 0 : userQuiz?.quizIds.length}
					resultType={Content.QUIZZ}
					icon={<Crown />}
				/>
				<BoxStat color={Color.PURPLE_DARK} result={user?.xp} resultType={Content.XP} icon={<Flash />} />
			</View>
			<View className="flex-row justify-between">
				<BoxStat
					color={Color.PRIMARY}
					result={user?.currency_amount}
					resultType={Content.GEMS}
					icon={<Gem width={40} height={50} />}
				/>
				<BoxStat color={Color.RED} result={user?.level.level_number} resultType={Content.LEVEL} icon={<Target />} />
			</View>
		</View>
	);
};

export default StatDashboardComponent;
