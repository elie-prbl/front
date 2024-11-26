import React from "react";
import { View } from "react-native";
import ElieCyber from "../../svg/ElieCyber";
import EliePirate from "../../svg/EliePirate";
import { Content } from "../../base/constant";
import ShopItemDetails from "../../base/ShopItemDetails";

const ShopItemsDashboardComponent = () => {
	return (
		<View>
			<ShopItemDetails elie={<EliePirate />} name={Content.ELIE_PIRATE} description={Content.ELIE_PIRATE} />
			<ShopItemDetails elie={<ElieCyber />} name={Content.ELIE_CYBER} description={Content.ELIE_CYBER} />
		</View>
	);
};

export default ShopItemsDashboardComponent;
