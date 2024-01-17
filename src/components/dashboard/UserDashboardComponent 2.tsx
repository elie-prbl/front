import React from "react";
import { Text, View } from "react-native";
import CircleComponent from "../../base/Circle";
import Game1 from "../../svg/Game1";
import { Ionicons } from "@expo/vector-icons";

interface UserDashboardComponentProps {
	user: string;
}

const UserDashboardComponent = ({ user }: UserDashboardComponentProps) => {
	return (
		<View>
			<View className="flex-row justify-between items-center">
				<Text>27 ans</Text>
				<Ionicons name={"person-circle-outline"} size={40} />
			</View>
			<View className="flex-col justify-center">
				<View className="flex-row justify-start gap-5 items-center">
					<Ionicons name={"mail"} size={20} />
					<Text>litiere.rob@gmail.com</Text>
				</View>
				<View className="flex-row justify-between items-center">
					<View className="flex-row gap-5 items-center">
						<Ionicons name={"time"} size={20} />
						<Text>Rejoint depuis Novembre 2023</Text>
					</View>
					<Ionicons name={"create-outline"} size={20} />
				</View>
			</View>
		</View>
	);
};

export default UserDashboardComponent;
