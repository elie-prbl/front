import { ActivityIndicator, Alert, Modal, Text, View } from "react-native";
import { Color, Content } from "../../base/constant";
import { purchaseShopItem, ShopItem, TypeName } from "../../store/features/Shop/ShopService";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { buildElie } from "../../utils/buildElie";
import ButtonComponent from "../../base/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import Layout from "../../base/Layout";

interface ModalPurchaseItemProps {
	activeModalPurchase: boolean;
	shopItem: ShopItem;
	onClose: () => void;
}

const ModalPurchaseItem = ({ activeModalPurchase, shopItem, onClose }: ModalPurchaseItemProps) => {
	const { user } = useAppSelector((state: RootState) => state.user);
	const { shop, isLoading, error } = useAppSelector((state: RootState) => state.shop);
	const dispatch = useAppDispatch();

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
						backgroundColor: Color.WHITE,
						shadowColor: Color.GREY,
						shadowOffset: { width: 0, height: 4 },
						shadowOpacity: 0.9,
						shadowRadius: 15,
					}}>
					<View className="items-end">
						<Ionicons name="close-circle-outline" size={24} color={Color.BLACK} onPress={onClose} />
					</View>
					<View className="w-full h-36 justify-center">
						{shopItem.type.name === TypeName.AVATAR && buildElie(shopItem.name)}
					</View>
					<Text className="text-lg font-bold">{shopItem.name}</Text>
					{shopItem.type.name === TypeName.AVATAR ? (
						<Text className="my-3">{shopItem.description}</Text>
					) : (
						<Text className="my-3">{shopItem.description}</Text>
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
