import React from "react";
import { View } from "react-native";
import ElieCyber from "../../svg/ElieCyber";
import EliePirate from "../../svg/EliePirate";
import { Content } from "../../base/constant";
import CustomizationDetailComponent from "../../base/PersonnalisationDetail";

const CustomizeDashboardComponent = () => {
	return (
		<View>
			<CustomizationDetailComponent
				elie={<EliePirate />}
				name={Content.ELIE_PIRATE}
				description={Content.ELIE_PIRATE}
			/>
			<CustomizationDetailComponent elie={<ElieCyber />} name={Content.ELIE_CYBER} description={Content.ELIE_CYBER} />
		</View>
	);
};

export default CustomizeDashboardComponent;
