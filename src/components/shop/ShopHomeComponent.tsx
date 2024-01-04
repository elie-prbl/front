import React from "react";
import { Text, View } from "react-native";
import { Color, Content, FontSize } from "../../base/constant";
import EliePirate from "../../svg/EliePirate";
import PowerUp from "../../svg/PowerUp";

const ShopHomeComponent = () => {
	return (
		<View className="flex-row h-full flex-1 my-1 justify-center">
			<View
				style={{ borderWidth: 1, borderColor: Color.GREY }}
				className="rounded-lg flex-1 mr-2 items-center justify-center relative">
				<EliePirate />
				<Text className={FontSize.TEXT_LG}>{Content.SHOP_PERSONALISATION}</Text>
			</View>
			<View
				style={{ borderWidth: 1, borderColor: Color.GREY }}
				className="rounded-lg flex-1 ml-2 items-center justify-center">
				<PowerUp />
				<Text className={FontSize.TEXT_LG}>{Content.SHOP_POWER_UP}</Text>
			</View>
		</View>
	);
};

export default ShopHomeComponent;
