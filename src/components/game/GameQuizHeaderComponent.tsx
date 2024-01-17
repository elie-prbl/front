import React from "react";
import { View } from "react-native";
import ProgressBar from "../../base/ProgressBar";
import LifeComponent from "../../base/Life";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../../navigation/AppNavigator";
import { Color } from "../../base/constant";

const GameQuizHeaderComponent = () => {
	const navigation = useNavigation<MyNavigationProp>();

	return (
		<View className="flex-row items-center justify-between m-3">
			<AntDesign name="close" size={30} color={Color.GREY} onPress={() => navigation.goBack()} />
			<ProgressBar currentStep={1} totalStep={4} width={240} />
			<LifeComponent nb={5} />
		</View>
	);
};

export default GameQuizHeaderComponent;
