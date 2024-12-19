import React, { useEffect, useState } from "react";
import Layout from "../base/Layout";
import BoxComponent from "../base/Box";
import { Color, Content } from "../base/constant";
import ShopItemDetails from "../components/shop/ShopItemDetails";
import { ActivityIndicator, ScrollView } from "react-native";
import { getShopItems, ShopItem, TypeName } from "../store/features/Shop/ShopService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import GemComponent from "../base/Gem";
import { getUser } from "../store/features/User/UserThunk";
import { useTheme } from "../context/ThemeContext";
import { getUserShopItems, UserShopItem } from "../store/features/UserShop/UserShopService";
import TextComponent from "../base/Text";
import { getUserSuccesses } from "../store/features/UserSuccesses/UserSuccessesThunk";

const Shop = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [avatarItems, setAvatarItems] = useState<ShopItem[]>([]);
	const [themeItems, setThemeItems] = useState<ShopItem[]>([]);
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: RootState) => state.user);
	const { shop } = useAppSelector((state: RootState) => state.shop);
	const { themeVariables } = useTheme();
	const [userShopItems, setUserShopItems] = useState<UserShopItem[] | null>(null);

	useEffect(() => {
		dispatch(getUser(user!.uuid));
		dispatch(getUserSuccesses(user!.uuid));
		getUserShopItems(user!.uuid).then(r => setUserShopItems(r));
	}, [shop]);

	useEffect(() => {
		setAvatarItems([]);
		setThemeItems([]);

		(async () => {
			try {
				const avatars = await getShopItems(TypeName.AVATAR);
				setAvatarItems(avatars);

				const themes = await getShopItems(TypeName.THEME);
				const filteredThemes = themes.filter(theme => theme.name !== "Green");
				setThemeItems(filteredThemes);
			} catch (e) {
				console.log(`error ${e}`);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (isLoading) {
		return (
			<Layout>
				<ActivityIndicator size="large" color={Color.PRIMARY} className="justify-center h-full" />
			</Layout>
		);
	}

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				{user && (
					<BoxComponent title={Content.SHOP_GEM} itemRight={<GemComponent nb={user?.currency_amount} />}>
						<TextComponent content={Content.SHOP_GEM_DESCRIPTION} style={{ color: themeVariables.text }} />
					</BoxComponent>
				)}
				<BoxComponent title={Content.SHOP_AVATAR}>
					{avatarItems.map(avatar => (
						<ShopItemDetails key={avatar.id} shopItem={avatar} userShopItem={userShopItems} />
					))}
				</BoxComponent>
				<BoxComponent title={Content.SHOP_THEME}>
					{themeItems.map(theme => (
						<ShopItemDetails key={theme.id} shopItem={theme} userShopItem={userShopItems} />
					))}
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default Shop;
