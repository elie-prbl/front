import React from "react";
import { View } from "react-native";
import ProgressBar from "../../base/ProgressBar";
import LifeComponent from "../../base/Life";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../../navigation/AppNavigator";
import { Color } from "../../base/constant";
import { useAppSelector } from "../../store/hooks";
import { backgrounds } from "../../base/Backgrounds";
import { useTheme } from "../../context/ThemeContext";

export type GameQuizHeaderComponentProps = {
	currentStep: number;
	totalStep: number;
};

const GameQuizHeaderComponent = ({ currentStep, totalStep }: GameQuizHeaderComponentProps) => {
	const navigation = useNavigation<MyNavigationProp>();
	const { themeVariables } = useTheme();

	const lives = useAppSelector(state => state.lives.value);

	return (
		<View
			className="flex-row items-center justify-between m-4 bg-500-sky"
			style={{ backgroundColor: themeVariables.background }}>
			<AntDesign name="close" size={30} color={Color.GREY} onPress={() => navigation.goBack()} />
			<ProgressBar currentStep={currentStep} totalStep={totalStep} width={240} />
			<LifeComponent nb={lives} />
		</View>
	);
};

export default GameQuizHeaderComponent;
