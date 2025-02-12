import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { getUserShopItems, UserShopItem } from "../../store/features/UserShop/UserShopService";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { TypeName } from "../../store/features/Shop/ShopService";
import BoxComponent from "../../base/Box";
import { Color, Content } from "../../base/constant";
import UserShopItemDetails from "./UserShopItemDetails";
import TextComponent from "../../base/Text";
import { buildTheme } from "../../utils/buildTheme";
import { useTheme } from "../../context/ThemeContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { buildElie } from "../../utils/buildElie";
import { useAvatar } from "../../context/AvatarContext";

const ShopItemsDashboardComponent = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const { user } = useAppSelector((state: RootState) => state.user);
	const [avatarItems, setAvatarItems] = useState<UserShopItem[]>([]);
	const [themeItems, setThemeItems] = useState<UserShopItem[]>([]);
	const { setTheme, themeVariables, theme } = useTheme();
	const { avatar, setAvatar } = useAvatar();

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
				<>
					<View className="flex-row items-center mb-2">
						<View className="w-12 h-20 flex-row items-center">{buildElie("")}</View>
						<View className="flex-1 flex-col mx-2">
							<TextComponent content={Content.AVATAR_DEFAULT} className="font-bold text-lg" />
							<TextComponent content={Content.AVATAR_DEFAULT_DESCRIPTION} />
						</View>
						<TouchableOpacity onPress={() => setAvatar("elie")} className="p-1 rounded">
							<MaterialCommunityIcons
								name={avatar === "elie" ? "checkbox-marked-outline" : "checkbox-blank-outline"}
								size={24}
								color={themeVariables.text}
							/>
						</TouchableOpacity>
					</View>
					{avatarItems.length > 0 ? (
						avatarItems.map(avatar => <UserShopItemDetails key={avatar.id} userShopItem={avatar} />)
					) : (
						<TextComponent content={Content.NO_AVATAR} />
					)}
				</>
			</BoxComponent>
			<BoxComponent title={Content.SHOP_THEME}>
				<>
					<View className="flex-row items-center mb-2">
						<View className="w-12 h-20 flex-row items-center">{buildTheme("Green")}</View>
						<View className="flex-1 flex-col mx-2">
							<TextComponent content={Content.THEME_DEFAULT} className="font-bold text-lg" />
							<TextComponent content={Content.THEME_DEFAULT_DESCRIPTION} />
						</View>
						<TouchableOpacity onPress={() => setTheme("light")} className="p-1 rounded">
							<MaterialCommunityIcons
								name={theme === "light" ? "checkbox-marked-outline" : "checkbox-blank-outline"}
								size={24}
								color={themeVariables.text}
							/>
						</TouchableOpacity>
					</View>
					{themeItems.length > 0 ? (
						themeItems.map(theme => <UserShopItemDetails key={theme.id} userShopItem={theme} />)
					) : (
						<TextComponent content={Content.NO_THEME} />
					)}
				</>
			</BoxComponent>
		</View>
	);
};

export default ShopItemsDashboardComponent;
