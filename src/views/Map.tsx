
import React, { useEffect, useState } from "react";
import MapView, { Region } from "react-native-maps";
import { Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Layout from "../base/Layout";

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
		<Layout>
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
		</Layout>
	);
};

export default Map;
