import React, { useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Layout from "../base/Layout";

const Map = () => {
	const position = useSelector((state: RootState) => state.position.position);
	const mapRef = useRef<MapView>(null);

	const setTheCurrentPosition = () => {
		if (position && mapRef.current) {
			mapRef.current.animateToRegion({
				latitude: position.latitude,
				longitude: position.longitude,
				latitudeDelta: 0.06,
				longitudeDelta: 0.04,
			});
		}
	};

	useEffect(() => {
		setTheCurrentPosition();
	}, [position]);

	return (
		<Layout>
			<MapView
				ref={mapRef}
				className="w-full h-full"
				initialRegion={
					position
						? {
								latitude: position.latitude,
								longitude: position.longitude,
								latitudeDelta: 0.06,
								longitudeDelta: 0.04,
						  }
						: undefined
				}
				showsUserLocation
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
