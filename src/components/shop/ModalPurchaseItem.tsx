import { ActivityIndicator, Alert, Modal, Text, View } from "react-native";
import { Color, Content } from "../../base/constant";
import { purchaseShopItem, ShopItem, TypeName } from "../../store/features/Shop/ShopService";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { buildElie } from "../../utils/buildElie";
import ButtonComponent from "../../base/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
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
	const { isLoading } = useAppSelector((state: RootState) => state.shop);
	const [message, setMessage] = useState<string>("");
	const dispatch = useAppDispatch();
	const { themeVariables } = useTheme();

	useEffect(() => {
		if (activeModalPurchase) {
			setMessage("");
		}
	}, [activeModalPurchase]);

	const handlePurchaseItem = (item: ShopItem) => {
		(async () => {
			try {
				if (user) {
					const resultAction = await dispatch(purchaseShopItem({ user_uuid: user!.uuid, shop_item_id: item.id }));

					if (purchaseShopItem.fulfilled.match(resultAction)) {
						Alert.alert("Votre achat a bien été effectué !");
						onClose();
					} else if (purchaseShopItem.rejected.match(resultAction)) {
						const error = (resultAction.payload as string) || "Une erreur est survenue";
						setMessage(error);
					}
				}
			} catch (e: any) {
				setMessage(e.message || "Une erreur inattendue est survenue");
			}
		})();
	};

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
					{message && (
						<Text className="text-center font-bold mb-3" style={{ color: Color.RED }}>
							{message}
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
