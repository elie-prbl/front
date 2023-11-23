import { SafeAreaView, Text, View } from "react-native";
import React, { useState } from "react";
import { Color, Content } from "../Base/constant";
import ButtonComponent from "../Base/Button";
import SvgConnexion from "../Svg/SvgConnexion";
import TextInputComponent from "../Base/TextInput";

const Home = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<SafeAreaView style={{ backgroundColor: Color.WHITE }}>
			<View className={"h-full items-center justify-around"}>
				<SvgConnexion />
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
					<Text className={"underline"}>{Content.PASSWORD_FORGET}</Text>
				</View>
				<ButtonComponent text={Content.LOGIN} onPress={() => {}} />
			</View>
		</SafeAreaView>
	);
};

export default Home;
