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
import { useAvatar } from "../../context/AvatarContext";
import { avatarMapping } from "../../base/Avatar";

interface UserShopItemDetailsProps {
	userShopItem: UserShopItem;
}

const UserShopItemDetails = ({ userShopItem }: UserShopItemDetailsProps) => {
	const { setTheme, themeVariables, theme } = useTheme();
	const themeName = themeMapping[userShopItem.shop_item.name] || "light";
	const { avatar, setAvatar } = useAvatar();
	const avatarName = avatarMapping[userShopItem.shop_item.name] || "elie";

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
			{userShopItem.shop_item.type.name === TypeName.AVATAR && (
				<TouchableOpacity onPress={() => setAvatar(avatarName)} className="p-1 rounded">
					<MaterialCommunityIcons
						name={avatar === avatarName ? "checkbox-marked-outline" : "checkbox-blank-outline"}
						size={24}
						color={themeVariables.text}
					/>
				</TouchableOpacity>
			)}
			{userShopItem.shop_item.type.name === TypeName.THEME && (
				<TouchableOpacity onPress={() => setTheme(themeName)} className="p-1 rounded">
					<MaterialCommunityIcons
						name={theme === themeName ? "checkbox-marked-outline" : "checkbox-blank-outline"}
						size={24}
						color={themeVariables.text}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default UserShopItemDetails;
