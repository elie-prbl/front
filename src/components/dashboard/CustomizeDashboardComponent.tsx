import React from "react";
import { View } from "react-native";
import ElieCyborg from "../../svg/ElieCyborg";
import EliePirate from "../../svg/EliePirate";
import ElieDetail from "../../base/ElieDetail";
import { Content } from "../../base/constant";

interface CustomizeDashboardComponentProps {
	title?: string;
	detail?: string;
	elie: string;
}

const CustomizeDashboardComponent = ({ elie }: CustomizeDashboardComponentProps) => {
	return (
		<View>
			<ElieDetail elie={<EliePirate />} title={Content.ELIE_PIRATE} detail={Content.ELIE_PIRATE_DESCRIPTION} />
			<ElieDetail elie={<ElieCyborg />} title={Content.ELIE_CYBORG} detail={Content.ELIE_CYBORG_DESCRIPTION} />
		</View>
	);
};

export default CustomizeDashboardComponent;
