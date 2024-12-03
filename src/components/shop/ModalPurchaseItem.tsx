import { ActivityIndicator, Alert, Modal, Text, View } from "react-native";
import { Color, Content } from "../../base/constant";
import { purchaseShopItem, ShopItem, TypeName } from "../../store/features/Shop/ShopService";
import React, { useEffect, useState } from "react";
import { ApiError } from "../../utils/ApiError";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { buildElie } from "../../utils/buildElie";
import ButtonComponent from "../../base/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ModalPurchaseItemProps {
	activeModalPurchase: boolean;
	shopItem: ShopItem;
	onClose: () => void;
}

const ModalPurchaseItem = ({ activeModalPurchase, shopItem, onClose }: ModalPurchaseItemProps) => {
	const [message, setMessage] = useState("");
	const [isLoading, setLoading] = useState(false);
	const { user } = useAppSelector((state: RootState) => state.user);

	useEffect(() => {
		if (activeModalPurchase) {
			setMessage("");
		}
	}, [activeModalPurchase]);

	const handlePurchaseItem = (item: ShopItem) => {
		(async () => {
			try {
				setLoading(true);

				if (user) {
					await purchaseShopItem(user.uuid, item.id);
					Alert.alert("Votre achat a bien été effectué !");
					onClose();
				}
			} catch (e: any) {
				if (e instanceof ApiError) {
					if (e.statusCode === 400) {
						setMessage(e.message);
					} else if (e.statusCode === 404) {
						setMessage(e.message);
					} else {
						setMessage(e.message);
					}
				} else {
					setMessage(e.message);
				}
			} finally {
				setLoading(false);
			}
		})();
	};

	return (
		activeModalPurchase && (
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
		)
	);
};

export default ModalPurchaseItem;
