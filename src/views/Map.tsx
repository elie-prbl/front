import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Layout from "../base/Layout";
import { getPlaces } from "../store/features/Map/MapPOI";
import { useDebounce } from "../hooks/useDebounce";

interface Place {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}

const Map = () => {
	const position = useSelector((state: RootState) => state.position.position);
	const mapRef = useRef<MapView>(null);
	const [currentRegion, setCurrentRegion] = useState<Region>();
	const [isLoading, setLoading] = useState<boolean>(false);
	const [places, setPlaces] = useState<Place[]>([]);

	const fetchPlaces = async () => {
		try {
			if (currentRegion) {
				setLoading(true);
				const places = await getPlaces(currentRegion);
				setPlaces(places);
				setLoading(false);
			}
		} catch (error) {
			console.error("Error fetching places :", error);
		}
	};

	const debouncedFetchPlaces = useDebounce(fetchPlaces, 500);

	const handleRegionChangeComplete = async (region: Region) => {
		setCurrentRegion(region);
		await debouncedFetchPlaces();
	};

	const setTheCurrentPosition = async () => {
		if (position && mapRef.current) {
			const newRegion = {
				latitude: position.latitude,
				longitude: position.longitude,
				latitudeDelta: 0.04,
				longitudeDelta: 0.04,
			};
			mapRef.current.animateToRegion(newRegion);
			setCurrentRegion(newRegion);
			await fetchPlaces();
		}
	};

	useEffect(() => {
		(async () => {
			if (position) {
				await setTheCurrentPosition();
			}
		})();
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
