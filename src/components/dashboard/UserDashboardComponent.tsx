import React from "react";
import { Text, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const UserDashboardComponent = () => {
	const user = useSelector((state: RootState) => state.user.user);
	return (
		<View>
			<View className="flex-col justify-center">
				<View className="flex-row items-center">
					<FontAwesome name="user" size={20} color="black" style={{ width: 20, textAlign: "center" }} />
					<Text className="ml-2 w-5/6">{user?.username}</Text>
				</View>
				<View className="flex-row items-center">
					<Ionicons name="mail" size={20} style={{ width: 20, textAlign: "center" }} />
					<Text className="ml-2 w-5/6">{user?.email} </Text>
				</View>
			</View>
		</View>
	);
};

export default UserDashboardComponent;
