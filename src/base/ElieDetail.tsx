import { Text, View } from "react-native";
import React, { ReactElement } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "./constant";

interface ElieDetailComponentProps {
	title: string;
	detail: string;
	elie: ReactElement;
}

const ElieDetailComponent = ({ elie, title, detail }: ElieDetailComponentProps) => {
	return (
		<View className="flex-row items-center w-full gap-5 mb-4">
			<View className="w-16 h-20 flex-row items-center">{elie}</View>
			<View className="flex-col w-52">
				<Text className="font-bold text-xl">{title}</Text>
				<Text>{detail}</Text>
			</View>
			<Ionicons name="add-outline" size={30} color={Color.SECONDARY} />
		</View>
	);
};

export default ElieDetailComponent;
