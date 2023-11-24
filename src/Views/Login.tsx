import { SafeAreaView, Text, View } from "react-native";
import React, { useState } from "react";
import { Color, Content } from "../Base/constant";
import ButtonComponent from "../Base/Button";
import SvgConnexion from "../Svg/SvgConnexion";
import TextInputComponent from "../Base/TextInput";
import SvgGoogle from "../Svg/SvgGoogle";
import SvgFacebook from "../Svg/SvgFacebook";

const Home = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<SafeAreaView style={{ backgroundColor: Color.WHITE }} className={"h-full justify-around"}>
			<View className={"h-3/5"}>
				<View className={"w-full items-center justify-center"}>
					<SvgConnexion />
					<Text className={"font-bold text-xl"}>{Content.ELIE_LOGIN}</Text>
				</View>
				<View className={"w-full items-center"}>
					<TextInputComponent
						onChangeText={setEmail}
						label={Content.LABEL_EMAIL}
						textInput={email}
						placeholder={Content.PLACEHOLDER_EMAIL}
						icon={"envelope"}
					/>
					<TextInputComponent
						onChangeText={setPassword}
						label={Content.LABEL_PASSWORD}
						textInput={password}
						placeholder={Content.PLACEHOLDER_PASSWORD}
						icon={"lock"}
					/>
					<Text className={"underline mt-1"}>{Content.PASSWORD_FORGET}</Text>
				</View>
			</View>
			<View>
				<View className={"w-full items-center"}>
					<ButtonComponent content={Content.LOGIN} onPress={() => {}} />
					<View className={"w-11/12 flex-row justify-center mt-3"}>
						<Text>{Content.NO_ACCOUNT}</Text>
						<Text className={"underline"} style={{ color: Color.PRIMARY }}>
							{Content.NO_ACCOUNT_SIGN_UP}
						</Text>
					</View>
				</View>
				<View className={"w-full items-center"}>
					<View className={"flex-row items-center w-8/12 my-7"}>
						<View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
						<View>
							<Text style={{ width: 50, textAlign: "center" }}>OU</Text>
						</View>
						<View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
					</View>
					<View className={"flex-row w-1/2 justify-around"}>
						<ButtonComponent
							onPress={() => {}}
							content={<SvgFacebook />}
							width={"w-16"}
							shadowColor={Color.GREY}
							bg={Color.WHITE}
							borderColor={Color.GREY}
							borderWidth={1}
						/>
						<ButtonComponent
							onPress={() => {}}
							content={<SvgGoogle />}
							width={"w-16"}
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

export default Home;
