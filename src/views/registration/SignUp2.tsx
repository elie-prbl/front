import { SafeAreaView, Text, View } from "react-native";
import { Color, Content } from "../../base/constant";
import React, { useState } from "react";
import TextInputComponent from "../../base/TextInput";
import ButtonComponent from "../../base/Button";
import SvgSignUp2 from "../../svg/SvgSignUp2";
import { useNavigation } from "@react-navigation/core";
import { NavigationSignUp2Props } from "../../navigation/AppNavigator";

const SignUp2 = () => {
	const navigation = useNavigation<NavigationSignUp2Props>();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const handleNavigateToSignUp = () => {
		navigation.navigate("SignUp3");
	};

	return (
		<SafeAreaView style={{ backgroundColor: Color.WHITE }} className="h-full justify-between">
			<View className="w-full items-center justify-center h-2/5">
				<SvgSignUp2 />
				<Text className="font-bold text-xl">{Content.ELIE_SIGNUP_2}</Text>
			</View>
			<View className="w-full items-center h-2/5">
				<TextInputComponent
					onChangeText={setEmail}
					label={Content.LABEL_EMAIL}
					textInput={email}
					placeholder={Content.PLACEHOLDER_EMAIL}
				/>
				<TextInputComponent
					onChangeText={setPassword}
					label={Content.LABEL_PASSWORD}
					textInput={password}
					placeholder={Content.PLACEHOLDER_PASSWORD}
				/>
				<TextInputComponent
					onChangeText={setConfirmPassword}
					label={Content.LABEL_CONFIRM_PASSWORD}
					textInput={confirmPassword}
					placeholder={Content.PLACEHOLDER_PASSWORD}
				/>
			</View>
			<View className="w-full items-center">
				<ButtonComponent content={Content.CONTINUE} onPress={handleNavigateToSignUp} />
			</View>
		</SafeAreaView>
	);
};

export default SignUp2;
