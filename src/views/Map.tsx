import React, { useEffect, useState } from "react";
import MapView, { Region } from "react-native-maps";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Map = () => {
	const position = useSelector((state: RootState) => state.position.position);
	const [currentRegion, setCurrentRegion] = useState<Region | undefined>(undefined);
	const setTheCurrentPosition = () => {
		if (position) {
			setCurrentRegion({
				latitude: position.latitude,
				longitude: position.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			});
		}
	};

	useEffect(() => {
		setTheCurrentPosition();
	}, [position]);

	return (
		<View className="flex-1">
			<MapView
				className="w-full h-full"
				region={currentRegion}
				showsUserLocation
				onRegionChange={region => setCurrentRegion(region)}
			/>
			<Pressable
				onPress={() => setTheCurrentPosition()}
				className="absolute bottom-5 right-5 bg-[#FFFFFF] p-3 rounded-full">
				<Feather name="crosshair" size={26} color="black" />
			</Pressable>
			{!currentRegion && (
				<View className="absolute flex-1 justify-center items-center">
					<ActivityIndicator size="large" />
				</View>
			)}
		</View>
	);
};

export default Map;
