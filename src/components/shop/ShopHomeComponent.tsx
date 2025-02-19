import React from "react";
import { View } from "react-native";
import { Color, Content, FontSize } from "../../base/constant";
import TextComponent from "../../base/Text";
import Elie from "../../svg/Elie";
import ThemeLight from "../../svg/ThemeLight";

const ShopHomeComponent = () => {
	return (
		<View className="flex-row h-full flex-1 my-1 justify-center">
			<View
				style={{ borderWidth: 1, borderColor: Color.GREY, borderBottomWidth: 4 }}
				className="rounded-lg flex-1 mr-2 items-center relative">
				<Elie />
				<TextComponent content={Content.SHOP_AVATAR} className={FontSize.TEXT_LG} />
			</View>
			<View
				style={{ borderWidth: 1, borderColor: Color.GREY, borderBottomWidth: 4 }}
				className="rounded-lg flex-1 ml-2 items-center justify-center relative">
				<ThemeLight />
				<TextComponent content={Content.SHOP_THEME} className={FontSize.TEXT_LG} />
			</View>
		</View>
	);
};

export default ShopHomeComponent;
