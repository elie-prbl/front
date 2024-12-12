import React from "react";
import { View } from "react-native";
import { Color, Content, FontSize } from "../../base/constant";
import EliePirate from "../../svg/EliePirate";
import PowerUp from "../../svg/PowerUp";
import TextComponent from "../../base/Text";

const ShopHomeComponent = () => {
	return (
		<View className="flex-row h-full flex-1 my-1 justify-center">
			<View
				style={{ borderWidth: 1, borderColor: Color.GREY }}
				className="rounded-lg flex-1 mr-2 items-center justify-center relative">
				<EliePirate />
				<TextComponent content={Content.SHOP_AVATAR} className={FontSize.TEXT_LG} />
			</View>
			<View
				style={{ borderWidth: 1, borderColor: Color.GREY }}
				className="rounded-lg flex-1 ml-2 items-center justify-center">
				<PowerUp />
				<TextComponent content={Content.SHOP_THEME} className={FontSize.TEXT_LG} />
			</View>
		</View>
	);
};

export default ShopHomeComponent;
