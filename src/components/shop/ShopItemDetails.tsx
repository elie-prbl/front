import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Color } from "../../base/constant";
import Gem from "../../base/Gem";
import { ShopItem, TypeName } from "../../store/features/Shop/ShopService";
import ModalPurchaseItem from "./ModalPurchaseItem";
import { buildElie } from "../../utils/buildElie";
import TextComponent from "../../base/Text";
import { buildTheme } from "../../utils/buildTheme";
import { UserShopItem } from "../../store/features/UserShop/UserShopService";

interface ShopItemDetailsProps {
	shopItem: ShopItem;
	userShopItem: UserShopItem[] | null;
}

const ShopItemDetails = ({ shopItem, userShopItem }: ShopItemDetailsProps) => {
	const [activeModalPurchase, setActiveModalPurchase] = useState(false);

	return (
		<View className="flex-row items-center mb-2">
			<View className="w-12 h-20 flex-row items-center">
				{(shopItem.type.name === TypeName.AVATAR && buildElie(shopItem.name)) ||
					(shopItem.type.name === TypeName.THEME && buildTheme(shopItem.name))}
			</View>
			<View className="flex-1 flex-col mx-2">
				<TextComponent content={shopItem.name} className="font-bold text-lg" />
				<TextComponent content={shopItem.description} />
			</View>
			<TouchableOpacity
				disabled={!!userShopItem?.find(item => item.shop_item_id === shopItem.id)}
				onPress={() => setActiveModalPurchase(true)}
				className="p-1 rounded"
				style={{
					backgroundColor: userShopItem?.find(item => item.shop_item_id === shopItem.id)
						? Color.GREY_LIGHT
						: Color.GREEN_OPACITY,
					opacity: userShopItem?.find(item => item.shop_item_id === shopItem.id) ? 0.5 : 1,
				}}>
				<Gem nb={shopItem.currency} fontSize="text-lg" widthGem={22} heightGem={24} />
			</TouchableOpacity>

			<ModalPurchaseItem
				activeModalPurchase={activeModalPurchase}
				shopItem={shopItem}
				onClose={() => setActiveModalPurchase(false)}
			/>
		</View>
	);
};

export default ShopItemDetails;
