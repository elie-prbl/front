import * as Location from "expo-location";
export const getTheCurrentPosition = async () => {
	const { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== "granted") {
		console.log("Permission to access location was denied");
		return;
	}
	return await Location.getCurrentPositionAsync({});
};
