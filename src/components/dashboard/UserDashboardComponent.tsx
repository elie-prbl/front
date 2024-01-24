import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const UserDashboardComponent = () => {
	const user = useSelector((state: RootState) => state.user.user);
	return (
		<View>
			<View className="flex-row justify-end items-center">
				<Ionicons name="person-circle-outline" size={40} />
			</View>
			<View className="flex-col justify-center">
				<View className="flex-row justify-start gap-5 items-center">
					<Ionicons name="mail" size={20} />
					<Text>{user?.email}</Text>
				</View>
				<View className="flex-row justify-between items-center">
					<View className="flex-row gap-5 items-center">
						<Ionicons name="time" size={20} />
						<Text>Inscrit depuis le 10 novembre 2023</Text>
					</View>
					<Ionicons name="create-outline" size={20} />
				</View>
			</View>
		</View>
	);
};

export default UserDashboardComponent;
