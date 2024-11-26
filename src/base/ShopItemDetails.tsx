import { Text, View } from "react-native";
import React, { ReactElement } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "./constant";
import Gem from "./Gem";

interface CustomizationDetailComponentProps {
	name: string;
	description: string;
	elie?: ReactElement;
	gem?: number;
}

const ShopItemDetails = ({ elie, name, description, gem }: CustomizationDetailComponentProps) => {
	return (
		<View className="flex-row items-center mb-2">
			<View className="w-16 h-20 flex-row items-center">{elie}</View>
			<View className="flex-1 flex-col mx-2">
				<Text className="font-bold text-lg">{name}</Text>
				<Text>{description}</Text>
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

export default ShopItemDetails;
