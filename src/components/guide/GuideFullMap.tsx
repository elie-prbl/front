import MapView, { Marker, Region } from "react-native-maps";
import { Pressable, Text, View } from "react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Color, Content } from "../../base/constant";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Toast, { ToastOptions } from "react-native-root-toast";
import { getPlaces } from "../../store/features/Map/MapPOI";
import { useDebounce } from "../../hooks/useDebounce";

interface Place {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	road: string;
	town: string;
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

const GuideFullMap = () => {
	const position = useSelector((state: RootState) => state.position.position);
	const mapRef = useRef<MapView>(null);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [initialRegion, setInitialRegion] = useState<Region>();
	const [places, setPlaces] = useState<Place[]>([]);
	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
	const tabBarHeight = useBottomTabBarHeight();

	const showToast = (message: string) => {
		return Toast.show(message, {
			...TOAST_OPTIONS,
			position: selectedPlace ? Toast.positions.BOTTOM - tabBarHeight * 2.5 : Toast.positions.BOTTOM - tabBarHeight,
		});
	};

	const fetchPlaces = async (region: Region) => {
		try {
			if (region) {
				const toast = showToast(Content.LOAD_POI);
				const places = await getPlaces(region);
				setPlaces(places);
				Toast.hide(toast);
			}
		} catch (error) {
			showToast(Content.LOAD_POI_ERROR);
			console.error("Error fetching places :", error);
		}
	};

	const debouncedFetchPlaces = useDebounce(fetchPlaces, 1000);

	const handleRegionChangeComplete = async (region: Region) => {
		await debouncedFetchPlaces(region);
	};

	const setTheCurrentPosition = () => {
		if (position && mapRef.current) {
			const currentRegion = {
				latitude: position.latitude,
				longitude: position.longitude,
				latitudeDelta: 0.04,
				longitudeDelta: 0.04,
			};
			mapRef.current.animateToRegion(currentRegion);
			handleCloseBottomSheet();
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
				setTheCurrentPosition();
				await handleRegionChangeComplete(initialRegion);
			}
		})();
	}, [position]);

	const handleMarkerPress = (place: Place) => {
		setSelectedPlace(place);
		bottomSheetRef.current?.snapToIndex(0);
	};

	const handleCloseBottomSheet = () => {
		setSelectedPlace(null);
		bottomSheetRef.current?.close();
	};

	const renderCustomMarker = (place: Place) => {
		const isSelected = selectedPlace?.id === place.id;

		return (
			<View className="items-center">
				<FontAwesome6 name="map-pin" size={isSelected ? 30 : 20} color={Color.RED_BRIGHT_LIGHT} />
				{isSelected && (
					<View className="p-1" style={{ width: 100 }}>
						<Text className="text-center font-bold flex-wrap">{place.name}</Text>
					</View>
				)}
			</View>
		);
	};

	return (
		<>
			<MapView
				ref={mapRef}
				className="w-full h-full"
				initialRegion={position ? initialRegion : undefined}
				showsUserLocation
				showsCompass={false}
				onRegionChangeComplete={handleRegionChangeComplete}>
				{places.map(place => (
					<Marker
						key={place.id}
						coordinate={{
							latitude: place.latitude,
							longitude: place.longitude,
						}}
						onPress={() => handleMarkerPress(place)}>
						{renderCustomMarker(place)}
					</Marker>
				))}
			</MapView>
			<Pressable
				onPress={() => setTheCurrentPosition()}
				className="absolute top-2 right-2 bg-[#FFFFFF] p-3 rounded-full">
				<Feather name="crosshair" size={26} color="black" />
			</Pressable>
			<BottomSheet ref={bottomSheetRef} index={-1} snapPoints={["20%"]}>
				<View className="p-4">
					<Pressable onPress={handleCloseBottomSheet} className="absolute top-2 right-2 p-2 rounded-full z-10">
						<Feather name="x-circle" size={24} color={Color.GREY} />
					</Pressable>
					{selectedPlace && (
						<View>
							<Text className="font-bold text-xl mb-1">{selectedPlace.name}</Text>
							<Text>
								{selectedPlace.road} - {selectedPlace.town}
							</Text>
						</View>
					)}
				</View>
			</BottomSheet>
		</>
	);
};

export default GuideFullMap;
