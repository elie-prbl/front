import React from "react";
import { View } from "react-native";
import ElieCyborg from "../../svg/ElieCyborg";
import EliePirate from "../../svg/EliePirate";
import { Content } from "../../base/constant";
import CustomizationDetailComponent from "../../base/PersonnalisationDetail";

const CustomizeDashboardComponent = () => {
	return (
		<View>
			<CustomizationDetailComponent
				elie={<EliePirate />}
				title={Content.ELIE_PIRATE}
				detail={Content.ELIE_PIRATE_DESCRIPTION}
			/>
			<CustomizationDetailComponent
				elie={<ElieCyborg />}
				title={Content.ELIE_CYBORG}
				detail={Content.ELIE_CYBORG_DESCRIPTION}
			/>
		</View>
	);
};

export default CustomizeDashboardComponent;
