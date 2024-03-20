import React from "react";
import Layout from "../base/Layout";
import BoxComponent from "../base/Box";
import { Content } from "../base/constant";
import CustomizationDetailComponent from "../base/PersonnalisationDetail";
import PowerUp from "../svg/PowerUp";
import EliePirate from "../svg/EliePirate";
import ElieCyborg from "../svg/ElieCyborg";
import { ScrollView } from "react-native";
import ElieGold from "../svg/ElieGold";
import Boost from "../svg/Boost";

const Shop = () => {
	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<BoxComponent title={Content.SHOP_POWER_UP}>
					<CustomizationDetailComponent
						title={Content.SHOP_POWER_UP_LIFE_TITLE}
						detail={Content.SHOP_POWER_UP_LIFE_DESCRIPTION}
						elie={<PowerUp />}
						gem={50}
					/>
					<CustomizationDetailComponent
						title={Content.SHOP_POWER_UP_BOOST_TITLE}
						detail={Content.SHOP_POWER_UP_BOOST_DESCRIPTION}
						elie={<Boost />}
						gem={100}
					/>
				</BoxComponent>
				<BoxComponent title={Content.SHOP_PERSONALISATION}>
					<CustomizationDetailComponent
						title={Content.ELIE_PIRATE}
						detail={Content.ELIE_PIRATE_DESCRIPTION}
						elie={<EliePirate />}
						gem={50}
					/>
					<CustomizationDetailComponent
						title={Content.ELIE_CYBORG}
						detail={Content.ELIE_CYBORG_DESCRIPTION}
						elie={<ElieCyborg />}
						gem={100}
					/>
					<CustomizationDetailComponent
						title={Content.ELIE_GOLD}
						detail={Content.ELIE_GOLD_DESCRIPTION}
						elie={<ElieGold />}
						gem={150}
					/>
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default Shop;
