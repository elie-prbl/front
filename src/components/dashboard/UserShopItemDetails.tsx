import { TouchableOpacity, View } from "react-native";
import React from "react";
import { TypeName } from "../../store/features/Shop/ShopService";
import { buildElie } from "../../utils/buildElie";
import { UserShopItem } from "../../store/features/UserShop/UserShopService";
import { useTheme } from "../../context/ThemeContext";
import { themeMapping } from "../../base/Themes";
import TextComponent from "../../base/Text";
import { buildTheme } from "../../utils/buildTheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface UserShopItemDetailsProps {
	userShopItem: UserShopItem;
}

const UserShopItemDetails = ({ userShopItem }: UserShopItemDetailsProps) => {
	const { setTheme, themeVariables, theme } = useTheme();
	const themeName = themeMapping[userShopItem.shop_item.name] || "light";

	return (
		<View className="flex-row items-center mb-2">
			<View className="w-12 h-20 flex-row items-center">
				{(userShopItem.shop_item.type.name === TypeName.AVATAR && buildElie(userShopItem.shop_item.name)) ||
					(userShopItem.shop_item.type.name === TypeName.THEME && buildTheme(userShopItem.shop_item.name))}
			</View>
			<View className="flex-1 flex-col mx-2">
				<TextComponent content={userShopItem.shop_item.name} className="font-bold text-lg" />
				<TextComponent content={userShopItem.shop_item.description} />
			</View>
			<TouchableOpacity onPress={() => setTheme(themeName)} className="p-1 rounded">
				<MaterialCommunityIcons
					name={theme === themeName ? "checkbox-marked-outline" : "checkbox-blank-outline"}
					size={24}
					color={themeVariables.text}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default UserShopItemDetails;
