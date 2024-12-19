import { ActivityIndicator, Alert, Modal, Text, View } from "react-native";
import { Color, Content } from "../../base/constant";
import { purchaseShopItem, ShopItem, TypeName } from "../../store/features/Shop/ShopService";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { buildElie } from "../../utils/buildElie";
import ButtonComponent from "../../base/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import Layout from "../../base/Layout";
import TextComponent from "../../base/Text";
import { useTheme } from "../../context/ThemeContext";
import { buildTheme } from "../../utils/buildTheme";

interface ModalPurchaseItemProps {
	activeModalPurchase: boolean;
	shopItem: ShopItem;
	onClose: () => void;
}

const ModalPurchaseItem = ({ activeModalPurchase, shopItem, onClose }: ModalPurchaseItemProps) => {
	const { user } = useAppSelector((state: RootState) => state.user);
	const { isLoading, error } = useAppSelector((state: RootState) => state.shop);
	const dispatch = useAppDispatch();
	const { themeVariables } = useTheme();

	const handlePurchaseItem = (item: ShopItem) => {
		dispatch(purchaseShopItem({ user_uuid: user!.uuid, shop_item_id: item.id }));
		Alert.alert("Votre achat a bien été effectué !");
		onClose();
	};

	if (isLoading) {
		return (
			<Layout>
				<ActivityIndicator size="large" color={Color.PRIMARY} className="justify-center h-full" />
			</Layout>
		);
	}

	return (
		<Modal visible={activeModalPurchase} transparent animationType="fade">
			<View className="flex-1 items-center justify-center" style={{ backgroundColor: Color.WHITE_OPACITY }}>
				<View
					className="rounded-xl w-10/12 p-4 justify-evenly"
					style={{
						backgroundColor: themeVariables.background,
						shadowColor: Color.GREY,
						shadowOffset: { width: 0, height: 4 },
						shadowOpacity: 0.9,
						shadowRadius: 15,
					}}>
					<View className="items-end">
						<Ionicons name="close-circle-outline" size={24} color={themeVariables.primary} onPress={onClose} />
					</View>
					<View className="w-full h-36 justify-center items-center">
						{(shopItem.type.name === TypeName.AVATAR && buildElie(shopItem.name)) ||
							(shopItem.type.name === TypeName.THEME && buildTheme(shopItem.name))}
					</View>
					<TextComponent content={shopItem.name} className="text-lg font-bold" />
					{shopItem.type.name === TypeName.AVATAR ? (
						<TextComponent content={shopItem.description} className="my-3" />
					) : (
						<TextComponent content={shopItem.description} className="my-3" />
					)}
					{error && (
						<Text className="text-center font-bold mb-3" style={{ color: Color.RED }}>
							{error}
						</Text>
					)}
					<ButtonComponent
						onPress={() => handlePurchaseItem(shopItem)}
						content={isLoading ? <ActivityIndicator size="small" color={Color.WHITE} /> : Content.VALIDATE}
						width="w-full"
					/>
				</View>
			</View>
		</Modal>
	);
};

export default ModalPurchaseItem;
