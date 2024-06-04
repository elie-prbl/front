import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { Pressable } from "react-native";
import Toast, { ToastOptions } from "react-native-root-toast";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Layout from "../base/Layout";
import { getPlaces } from "../store/features/Map/MapPOI";
import { useDebounce } from "../hooks/useDebounce";
import { Color } from "../base/constant";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface Place {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}

const TOAST_OPTIONS: ToastOptions = {
	containerStyle: {
		padding: 15,
		borderBottomColor: Color.PRIMARY,
		borderBottomWidth: 5,
	},
	backgroundColor: Color.WHITE,
	textColor: Color.PRIMARY,
	textStyle: { fontWeight: "bold" },
	opacity: 1,
	shadowColor: "transparent",
	animation: true,
};

const Map = () => {
	const position = useSelector((state: RootState) => state.position.position);
	const mapRef = useRef<MapView>(null);
	const [initialRegion, setInitialRegion] = useState<Region>();
	const [places, setPlaces] = useState<Place[]>([]);
	const tabBarHeight = useBottomTabBarHeight();

	const showToast = (message: string) => {
		return Toast.show(message, {
			...TOAST_OPTIONS,
			position: Toast.positions.BOTTOM - tabBarHeight,
		});
	};

	const fetchPlaces = async (region: Region) => {
		try {
			if (region) {
				const toast = showToast("Chargement des lieux...");
				const places = await getPlaces(region);
				setPlaces(places);
				Toast.hide(toast);
			}
		} catch (error) {
			showToast("Erreur lors de la récupération des lieux");
			console.error("Error fetching places :", error);
		}
	};

	const debouncedFetchPlaces = useDebounce(fetchPlaces, 1000);

	const handleRegionChangeComplete = async (region: Region) => {
		await debouncedFetchPlaces(region);
	};

	const setTheCurrentPosition = async () => {
		if (position && mapRef.current) {
			const currentRegion = {
				latitude: position.latitude,
				longitude: position.longitude,
				latitudeDelta: 0.04,
				longitudeDelta: 0.04,
			};
			mapRef.current.animateToRegion(currentRegion);
			await fetchPlaces(currentRegion);
		}
	};

	useEffect(() => {
		(async () => {
			if (position) {
				const initialRegion = {
					latitude: position.latitude,
					longitude: position.longitude,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04,
				};
				setInitialRegion(initialRegion);
				await setTheCurrentPosition();
			}
		})();
	}, [position]);

	return (
		<Layout>
			<MapView
				ref={mapRef}
				className="w-full h-full"
				initialRegion={position ? initialRegion : undefined}
				showsUserLocation
				onRegionChangeComplete={handleRegionChangeComplete}>
				{places.map(place => (
					<Marker
						key={place.id}
						coordinate={{
							latitude: place.latitude,
							longitude: place.longitude,
						}}
						title={place.name}
					/>
				))}
			</MapView>
			<Pressable
				onPress={() => setTheCurrentPosition()}
				className="absolute bottom-5 right-5 bg-[#FFFFFF] p-3 rounded-full">
				<Feather name="crosshair" size={26} color="black" />
			</Pressable>
		</Layout>
	);
};

export default Map;
