import React from "react";
import { View } from "react-native";
import ElieCyborg from "../../svg/ElieCyborg";
import EliePirate from "../../svg/EliePirate";
import ElieDetail from "../../base/ElieDetail";

interface CustomizeDashboardComponentProps {
	title?: string;
	detail?: string;
	elie: string;
}

const CustomizeDashboardComponent = ({ elie }: CustomizeDashboardComponentProps) => {
	return (
		<View>
			<ElieDetail
				elie={<EliePirate />}
				title="Elie Pirate"
				detail="Personnaliser votre Ellie pour partir à la découverte de nouveaux quizz !!"
			/>
			<ElieDetail
				elie={<ElieCyborg />}
				title="Elie Cyborg"
				detail="Ellie deviens un cyber compagnon près à vous accompagner dans tout vos quizz"
			/>
		</View>
	);
};

export default CustomizeDashboardComponent;
