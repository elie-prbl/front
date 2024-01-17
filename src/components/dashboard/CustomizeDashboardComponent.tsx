import React from "react";
import { Text, View } from "react-native";
import CircleComponent from "../../base/Circle";
import Game1 from "../../svg/Game1";
import { Ionicons } from "@expo/vector-icons";
import ElieCyborg from "../../svg/ElieCyborg";
import EliePirate from "../../svg/EliePirate";
import { Color } from "../../base/constant";
import { flex } from "nativewind/dist/postcss/to-react-native/properties/flex";
import ElieDetail from "../../base/ElieDetail";

interface CustomizeDashboardComponentProps {
	title: string;
	detail: string;
	elie: string;
}

const CustomizeDashboardComponent = ({ elie }: CustomizeDashboardComponentProps) => {
	return (
		<View>
			<ElieDetail
				elie={<EliePirate />}
				title={"Elie Pirate"}
				detail={"Personnaliser votre Ellie pour partir à la découverte de \n" + "nouveaux quizz !!"}
			/>
			<ElieDetail
				elie={<ElieCyborg />}
				title={"Elie Cyborg"}
				detail={"Ellie deviens un cyber compagnon près à vous accompagner dans tout vos quizz"}
			/>
		</View>
	);
};

export default CustomizeDashboardComponent;
