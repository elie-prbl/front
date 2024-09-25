import React, {useEffect, useState} from "react";
import { View } from "react-native";
import BoxStat from "../../base/BoxStat";
import { Color, Content } from "../../base/constant";
import Crown from "../../svg/Crown";
import Flash from "../../svg/Flash";
import Target from "../../svg/Target";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import Gem from "../../svg/Gem";
import {getUserQuiz} from "../../store/features/UserQuiz/UserQuizThunk";

const StatDashboardComponent = () => {
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.user.user);
	const [quizComleted, setQuizCompleted] = useState<number>(0);

	useEffect(() => {
		const fetchQuizCompleted = async () => {
			try {
				const response = await dispatch(getUserQuiz(user!.uuid)).unwrap();
				setQuizCompleted(response.quizIds.length);
			} catch (error) {
				console.error("Error fetching user quizzes:", error);
			}
		};
		if (user!.uuid) {
			fetchQuizCompleted();
		}
	}, [dispatch, user!.uuid]);

	return (
		<View>
			<View className="flex-row justify-between mb-4">
				<BoxStat color={Color.GOLD} result={quizComleted} resultType={Content.QUIZZ} icon={<Crown />} />
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
