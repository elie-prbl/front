import { Text, View } from "react-native";
import React, { ReactElement } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "./constant";
import Gem from "./Gem";

interface CustomizationDetailComponentProps {
	title: string;
	detail: string;
	elie: ReactElement;
	gem?: number;
}

const CustomizationDetailComponent = ({ elie, title, detail, gem }: CustomizationDetailComponentProps) => {
	return (
		<View className="flex-row items-center w-full justify-around mb-4">
			<View className="w-16 h-20 flex-row items-center">{elie}</View>
			<View className="flex-col w-52">
				<Text className="font-bold text-xl">{title}</Text>
				<Text>{detail}</Text>
			</View>
			{gem ? (
				<View>
					<Gem nb={gem} />
				</View>
			) : (
				<Ionicons name="add-outline" size={30} color={Color.SECONDARY} />
			)}
		</View>
	);
};

export default CustomizationDetailComponent;
