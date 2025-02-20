import { SafeAreaView, View } from "react-native";
import React, { useState } from "react";
import { Color, Content } from "../../base/constant";
import ButtonComponent from "../../base/Button";
import TextInputComponent from "../../base/TextInput";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../../navigation/AppNavigator";
import { loginUser } from "../../store/features/User/UserThunk";
import SvgConnexion from "../../svg/SvgConnexion";
import SvgFacebook from "../../svg/SvgFacebook";
import SvgGoogle from "../../svg/SvgGoogle";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useTheme } from "../../context/ThemeContext";
import TextComponent from "../../base/Text";

const Login = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigation = useNavigation<MyNavigationProp>();
	const [email, setEmail] = useState<string>("test2@mail.com");
	const [password, setPassword] = useState<string>("rob");
	const [error, setError] = useState<string>("");
	const { themeVariables } = useTheme();

	const handleNavigateToSignUp = () => {
		navigation.navigate("SignUp1");
	};

	const handleNavigateHome = async () => {
		if (!email) {
			return;
		}

		try {
			await dispatch(loginUser({ email })).unwrap();
			navigation.navigate("TabNav", { screen: "Home" });
		} catch (error) {
			console.log("error", error);
			setError("Mot de passe ou email incorrect.");
		}
	};

	return (
		<SafeAreaView style={{ backgroundColor: themeVariables.background }} className="h-full justify-around">
			<View className="h-3/5">
				<View className="w-full items-center justify-center">
					<SvgConnexion />
					<TextComponent content={Content.ELIE} className="font-bold text-3xl" />
				</View>
				<View className="w-full items-center">
					<TextInputComponent
						onChangeText={setEmail}
						label={Content.LABEL_EMAIL}
						textInput={email.toLowerCase()}
						placeholder={Content.PLACEHOLDER_EMAIL}
					/>
					<TextInputComponent
						onChangeText={setPassword}
						label={Content.LABEL_PASSWORD}
						textInput={password}
						placeholder={Content.PLACEHOLDER_PASSWORD}
					/>
					<TextComponent content={Content.PASSWORD_FORGET} className="underline mt-1" />
				</View>
			</View>
			{error && <TextComponent content={error} isError className="text-center font-bold" />}
			<View>
				<View className="w-full items-center">
					<ButtonComponent content={Content.LOGIN} onPress={handleNavigateHome} />
					<View className="w-11/12 flex-row justify-center mt-3">
						<TextComponent content={Content.NO_ACCOUNT} />
						<TextComponent content={Content.SIGN_UP} className="underline" onPress={handleNavigateToSignUp} />
					</View>
				</View>
				<View className="w-full items-center">
					<View className="flex-row items-center w-8/12 my-7">
						<View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
						<View>
							<TextComponent content="OU" className="text-center w-12" />
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
