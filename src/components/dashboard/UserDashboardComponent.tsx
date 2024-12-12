import React from "react";
import { Text, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTheme } from "../../context/ThemeContext";
import TextComponent from "../../base/Text";

const UserDashboardComponent = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const { themeVariables } = useTheme();
	return (
		<View>
			<View className="flex-col justify-center">
				<View className="flex-row items-center">
					<FontAwesome name="user" size={20} color={themeVariables.text} style={{ width: 20, textAlign: "center" }} />
					<TextComponent content={`${user?.username} `} className="ml-2 w-5/6" />
				</View>
				<View className="flex-row items-center">
					<Ionicons name="mail" size={20} style={{ color: themeVariables.text, width: 20, textAlign: "center" }} />
					<TextComponent content={`${user?.email} `} className="ml-2 w-5/6" />
				</View>
			</View>
		</View>
	);
};

export default UserDashboardComponent;
