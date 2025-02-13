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

export const getCoordinatesFromAddress = async (address: string) => {
	const apiKey = "AIzaSyBKCmoKblT105-hFLHdghpCRgCliPkNqqk";
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data.status === "OK" && data.results.length > 0) {
			return data.results[0].geometry.location;
		} else {
			console.error("No results found for the address" + address);
			return null;
		}
	} catch (error) {
		console.error("Error fetching coordinates:", error);
		return null;
	}
};
