import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const UserDashboardComponent = () => {
	const user = useSelector((state: RootState) => state.user.user);
	return (
		<View>
			<View className="flex-col justify-center">
				<View className="flex-row items-center">
					<Ionicons name="mail" size={20} />
					<Text className="ml-2">{user?.email}</Text>
				</View>
			</View>
		</View>
	);
};

export default UserDashboardComponent;
