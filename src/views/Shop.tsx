import React, { useEffect, useState } from "react";
import Layout from "../base/Layout";
import BoxComponent from "../base/Box";
import { Content } from "../base/constant";
import ShopItemDetails from "../base/ShopItemDetails";
import { ScrollView } from "react-native";
import { getShopItems, ShopItem, TypeName } from "../store/features/Shop/ShopThunk";
import Elie from "../svg/Elie";
import ElieGold from "../svg/ElieGold";
import ElieCyber from "../svg/ElieCyber";
import EliePirate from "../svg/EliePirate";

const Shop = () => {
	const [avatarItems, setAvatarItems] = useState<ShopItem[]>([]);
	const [themeItems, setThemeItems] = useState<ShopItem[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const avatars = await getShopItems(TypeName.AVATAR);
				setAvatarItems(avatars);

				const themes = await getShopItems(TypeName.THEME);
				setThemeItems(themes);
			} catch (e) {
				console.log(`error ${e}`);
			}
		})();
	}, []);

	const buildElie = (name: string) => {
		switch (name) {
			case Content.ELIE_GOLD:
				return <ElieGold />;
			case Content.ELIE_CYBER:
				return <ElieCyber />;
			case Content.ELIE_PIRATE:
				return <EliePirate />;
			default:
				return <Elie />;
		}
	};

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<BoxComponent title={Content.SHOP_AVATAR}>
					{avatarItems.map(avatar => (
						<ShopItemDetails
							key={avatar.id}
							name={avatar.name}
							description={avatar.description}
							elie={buildElie(avatar.name)}
							gem={avatar.currency}
						/>
					))}
				</BoxComponent>
				<BoxComponent title={Content.SHOP_THEME}>
					{themeItems.map(theme => (
						<ShopItemDetails key={theme.id} name={theme.name} description={theme.description} gem={theme.currency} />
					))}
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default Shop;
