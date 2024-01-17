import React from "react";
import { Text, View } from "react-native";
import CircleComponent from "../../base/Circle";
import Game1 from "../../svg/Game1";
import { Ionicons } from "@expo/vector-icons";
import ElieCyborg from "../../svg/ElieCyborg";
import EliePirate from "../../svg/EliePirate";
import { Color } from "../../base/constant";
import { flex } from "nativewind/dist/postcss/to-react-native/properties/flex";

interface CustomizeDashboardComponentProps {
	elie: string;
}

const CustomizeDashboardComponent = ({ elie }: CustomizeDashboardComponentProps) => {
	return (
		<View className={`flex-col h-40`} style={{ width: 220 }}>
			<View className="flex-row items-center gap-5">
				<View className={`w-16`}>
					<EliePirate />
				</View>
				<View className="flex-col w-52">
					<Text className="font-bold text-xl">Elie Pirate</Text>
					<Text>Personnaliser votre Ellie pour partir à la découverte de nouveaux quizz !!</Text>
				</View>
				<Ionicons name="add-outline" size={30} color={Color.SECONDARY} />
			</View>

			<View className="flex-row items-center gap-5">
				<View className={`w-16`}>
					<ElieCyborg />
				</View>
				<View className="fllex-col w-52">
					<Text className="font-bold text-xl">Elie Cyborg</Text>
					<Text>Ellie deviens un cyber compagnon près à vous accompagner dans tout vos quizz</Text>
				</View>
				<Ionicons name="add-outline" size={30} color={Color.SECONDARY} />
			</View>
		</View>
	);
};

export default CustomizeDashboardComponent;
