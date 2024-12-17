import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getUserShopItems, UserShopItem } from "../../store/features/UserShop/UserShopService";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { TypeName } from "../../store/features/Shop/ShopService";
import BoxComponent from "../../base/Box";
import { Color, Content } from "../../base/constant";
import UserShopItemDetails from "./UserShopItemDetails";
import TextComponent from "../../base/Text";

const ShopItemsDashboardComponent = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const { user } = useAppSelector((state: RootState) => state.user);
	const [avatarItems, setAvatarItems] = useState<UserShopItem[]>([]);
	const [themeItems, setThemeItems] = useState<UserShopItem[]>([]);

	useEffect(() => {
		setAvatarItems([]);
		setThemeItems([]);

		(async () => {
			try {
				if (user) {
					const items: UserShopItem[] = await getUserShopItems(user.uuid);

					items.forEach(item => {
						switch (item.shop_item.type.name) {
							case TypeName.AVATAR:
								setAvatarItems(prevState => [...prevState, item]);
								break;
							case TypeName.THEME:
								setThemeItems(prevState => [...prevState, item]);
								break;
						}
					});
				}
			} catch (e) {
				console.log(`error ${e}`);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (isLoading) {
		return <ActivityIndicator size="large" color={Color.PRIMARY} className="justify-center h-full" />;
	}

	return (
		<View>
			<BoxComponent title={Content.SHOP_AVATAR}>
				{avatarItems.length > 0 ? (
					avatarItems.map(avatar => <UserShopItemDetails key={avatar.id} userShopItem={avatar} />)
				) : (
					<TextComponent content={Content.NO_AVATAR} />
				)}
			</BoxComponent>
			<BoxComponent title={Content.SHOP_THEME}>
				{themeItems.length > 0 ? (
					themeItems.map(theme => <UserShopItemDetails key={theme.id} userShopItem={theme} />)
				) : (
					<TextComponent content={Content.NO_THEME} />
				)}
			</BoxComponent>
		</View>
	);
};

export default ShopItemsDashboardComponent;
