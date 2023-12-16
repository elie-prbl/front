import { SafeAreaView, Text, View } from "react-native";
import { Color, Content } from "../../Base/constant";
import React from "react";
import ButtonComponent from "../../Base/Button";
import SvgSignUp3 from "../../svg/SvgSignUp3";
import { useNavigation } from "@react-navigation/core";
import { NavigationLoginProps } from "../../Navigation/AppNavigator";

const SignUp3 = () => {
	const navigation = useNavigation<NavigationLoginProps>();

	const handleNavigateToSignUp = () => {
		navigation.navigate("Login");
	};

	return (
		<SafeAreaView style={{ backgroundColor: Color.WHITE }} className="h-full justify-between">
			<View className="w-full items-center justify-center h-4/5">
				<SvgSignUp3 />
				<Text className="font-bold text-xl">{Content.ELIE_SIGNUP_3}</Text>
			</View>
			<View className="w-full items-center">
				<ButtonComponent content={Content.SIGN_UP} onPress={handleNavigateToSignUp} />
			</View>
		</SafeAreaView>
	);
};

export default SignUp3;
