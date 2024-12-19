import { SafeAreaView, View } from "react-native";
import React, { useState } from "react";
import { Content } from "../../base/constant";
import ButtonComponent from "../../base/Button";
import TextInputComponent from "../../base/TextInput";
import { useNavigation } from "@react-navigation/core";
import { NavigationSignUp2Props } from "../../navigation/AppNavigator";
import SvgSignUp1 from "../../svg/SvgSignUp1";
import TextComponent from "../../base/Text";
import { useTheme } from "../../context/ThemeContext";

const SignUp1 = () => {
	const navigation = useNavigation<NavigationSignUp2Props>();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const { themeVariables } = useTheme();

	const handleNavigateToSignUp = () => {
		navigation.navigate("SignUp2");
	};

	return (
		<SafeAreaView style={{ backgroundColor: themeVariables.background }} className="h-full justify-between">
			<View className="w-full items-center justify-center h-2/5">
				<SvgSignUp1 />
				<TextComponent content={Content.ELIE_SIGNUP_1} className="font-bold text-xl" />
			</View>
			<View className="w-full items-center h-2/5">
				<TextInputComponent
					onChangeText={setEmail}
					label={Content.LABEL_FIRSTNAME}
					textInput={email}
					placeholder={Content.PLACEHOLDER_FIRSTNAME}
				/>
				<TextInputComponent
					onChangeText={setPassword}
					label={Content.LABEL_LASTNAME}
					textInput={password}
					placeholder={Content.PLACEHOLDER_LASTNAME}
				/>
				<TextInputComponent
					onChangeText={setAge}
					label={Content.LABEL_AGE}
					textInput={age}
					placeholder={Content.PLACEHOLDER_AGE}
				/>
			</View>
			<View className="w-full items-center">
				<ButtonComponent content={Content.CONTINUE} onPress={handleNavigateToSignUp} />
			</View>
		</SafeAreaView>
	);
};

export default SignUp1;
