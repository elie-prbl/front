import { SafeAreaView, Text, View } from "react-native";
import React, { useState } from "react";
import { Color, Content } from "../base/constant";
import ButtonComponent from "../base/Button";
import SvgConnexion from "../svg/SvgConnexion";
import TextInputComponent from "../base/TextInput";
import SvgGoogle from "../svg/SvgGoogle";
import SvgFacebook from "../svg/SvgFacebook";
import { useNavigation } from "@react-navigation/core";
import { NavigationSignUp1Props } from "../navigation/AppNavigator";

const Login = () => {
	const navigation = useNavigation<NavigationSignUp1Props>();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleNavigateToSignUp = () => {
		navigation.navigate("SignUp1");
	};

	return (
		<SafeAreaView style={{ backgroundColor: Color.WHITE }} className="h-full justify-around">
			<View className="h-3/5">
				<View className="w-full items-center justify-center">
					<SvgConnexion />
					<Text className="font-bold text-xl">{Content.ELIE_LOGIN}</Text>
				</View>
				<View className="w-full items-center">
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
					<Text className="underline mt-1">{Content.PASSWORD_FORGET}</Text>
				</View>
			</View>
			<View>
				<View className="w-full items-center">
					<ButtonComponent content={Content.LOGIN} onPress={() => {}} />
					<View className="w-11/12 flex-row justify-center mt-3">
						<Text>{Content.NO_ACCOUNT}</Text>
						<Text className="underline" style={{ color: Color.PRIMARY }} onPress={handleNavigateToSignUp}>
							{Content.NO_ACCOUNT_SIGN_UP}
						</Text>
					</View>
				</View>
				<View className="w-full items-center">
					<View className="flex-row items-center w-8/12 my-7">
						<View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
						<View>
							<Text style={{ width: 50, textAlign: "center" }}>OU</Text>
						</View>
						<View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
					</View>
					<View className="flex-row w-1/2 justify-around">
						<ButtonComponent
							onPress={() => {}}
							content={<SvgFacebook />}
							width="w-16"
							shadowColor={Color.GREY}
							bg={Color.WHITE}
							borderColor={Color.GREY}
							borderWidth={1}
						/>
						<ButtonComponent
							onPress={() => {}}
							content={<SvgGoogle />}
							width="w-16"
							shadowColor={Color.GREY}
							bg={Color.WHITE}
							borderColor={Color.GREY}
							borderWidth={1}
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Login;
