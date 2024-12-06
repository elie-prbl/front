import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Color } from "../../base/constant";
import { TypeName } from "../../store/features/Shop/ShopService";
import { buildElie } from "../../utils/buildElie";
import { UserShopItem } from "../../store/features/UserShop/UserShopService";


interface UserShopItemDetailsProps {
	userShopItem: UserShopItem;
}


const UserShopItemDetails = ({ userShopItem }: UserShopItemDetailsProps) => {
	return (
		<View className="flex-row items-center mb-2">
			<View className="w-12 h-20 flex-row items-center">
				{userShopItem.shop_item.type.name === TypeName.AVATAR && buildElie(userShopItem.shop_item.name)}
			</View>
			<View className="flex-1 flex-col mx-2">
				<Text className="font-bold text-lg">{userShopItem.shop_item.name}</Text>
				<Text>{userShopItem.shop_item.description}</Text>
			</View>
			{/*TODO : Ici il faudra utiliser le context pour le timing de l'application*/}
			<TouchableOpacity onPress={() => {}} className="p-1 rounded" style={{ backgroundColor: Color.GREEN_OPACITY }}>
				{/*TODO : Changer le text par une icône ou autre */}
				<Text>Use</Text>
			</TouchableOpacity>
		</View>
	);
};

export default UserShopItemDetails;
