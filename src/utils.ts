import * as Location from "expo-location";
import { Dimensions, PixelRatio } from "react-native";
export const getTheCurrentPosition = async () => {
	const { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== "granted") {
		console.log("Permission to access location was denied");
		return;
	}
	return await Location.getCurrentPositionAsync({});
};

const { width, height } = Dimensions.get("window");

// TO USE FOR FONT
export const widthPercentageToDP = (widthPercent: any) => {
	const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
	return PixelRatio.getFontScale() >= 1
		? PixelRatio.roundToNearestPixel((width * elemWidth) / 100)
		: Math.round(((width * elemWidth) / 100) * Math.round(PixelRatio.getFontScale()));
};

// TO USE FOR COMPONENT

export const heightPercentageToDP = (heightPercent: any) => {
	const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
	return PixelRatio.getFontScale() >= 1
		? PixelRatio.roundToNearestPixel((height * elemHeight) / 100)
		: Math.round(((height * elemHeight) / 100) * Math.round(PixelRatio.getFontScale()));
};
