import { SafeAreaView, Text, View } from "react-native";
import React, { useState } from "react";
import { Color, Content } from "../Base/constant";
import ButtonComponent from "../Base/Button";
import TextInputComponent from "../Base/TextInput";
import SvgSignUp1 from "../Svg/SvgSignUp1";

const SignUp1 = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<SafeAreaView style={{ backgroundColor: Color.WHITE }} className="h-full justify-around">
			<View className="w-full items-center justify-center h-2/5">
				<SvgSignUp1 />
				<Text className="font-bold text-xl">{Content.ELIE_SIGNUP_1}</Text>
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
					onChangeText={setPassword}
					label={Content.LABEL_AGE}
					textInput={password}
					placeholder={Content.PLACEHOLDER_AGE}
				/>
			</View>
			<View className="w-full items-center">
				<ButtonComponent content={Content.CONTINUE} onPress={() => {}} />
			</View>
		</SafeAreaView>
	);
};

export default SignUp1;
