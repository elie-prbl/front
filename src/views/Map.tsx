import React from "react";
import MapView from "react-native-maps";
import { View } from "react-native";

const Map = () => {
	return (
		<View className="flex-1">
			<MapView className="w-full h-full" />
		</View>
	);
};

export default Map;
