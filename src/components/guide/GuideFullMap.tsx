import MapView, { Marker, Region } from "react-native-maps";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Color, Content } from "../../base/constant";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getPlaces } from "../../store/features/Map/MapPOI";
import BottomSheet from "@gorhom/bottom-sheet";
import { useTheme } from "../../context/ThemeContext";
import TextComponent from "../../base/Text";
import ButtonComponent from "../../base/Button";
import { getEvents } from "../../store/features/Events/EventThunk";
import { useAppDispatch } from "../../store/hooks";
import { addLatitudeAndLongitude, eventI } from "../../store/features/Events/EventSlices";
import { getCoordinatesFromAddress } from "../../utils";

interface Place {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	road: string;
	town: string;
}

const GuideFullMap = () => {
	const { themeVariables } = useTheme();
	const position = useSelector((state: RootState) => state.position.position);
	const events = useSelector((state: RootState) => state.events.events);
	const mapRef = useRef<MapView>(null);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [initialRegion, setInitialRegion] = useState<Region>();
	const [region, setRegion] = useState<Region>();
	const [places, setPlaces] = useState<Place[]>([]);
	const [selectedPlaceOrEvent, setselectedPlaceOrEvent] = useState<Place | eventI | null>(null);
	const [isLoading, setLoading] = useState(false);
	const [isHiddenSearchButton, setHiddenSearchButton] = useState(true);
	const dispatch = useAppDispatch();

	const fetchPlaces = async (region: Region) => {
		setLoading(true);
		setHiddenSearchButton(false);

		try {
			if (region) {
				const places = await getPlaces(region);
				setPlaces(places);
				setRegion(region);
			}
		} catch (error) {
			console.error("Error fetching places :", error);
		} finally {
			setLoading(false);
			setHiddenSearchButton(true);
		}
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
		if (position) {
			const initialRegion = {
				latitude: position.latitude,
				longitude: position.longitude,
				latitudeDelta: 0.04,
				longitudeDelta: 0.04,
			};
			setInitialRegion(initialRegion);
			setTheCurrentPosition();
		}
	}, [position]);

	useEffect(() => {
		if (initialRegion && position) {
			(async () => {
				await fetchPlaces(initialRegion);
			})();
			dispatch(getEvents({ latitude: position.latitude, longitude: position.longitude }));
		}
	}, [initialRegion]);

	const attributeCoordinates = async (event: eventI) => {
		const coordinates = await getCoordinatesFromAddress(event.address + " " + event.city + " " + event.zip_code);
		if (event.id) {
			dispatch(
				addLatitudeAndLongitude({
					id: event.id,
					latitude: coordinates.lat,
					longitude: coordinates.lng,
				}),
			);
		}
	};
	useEffect(() => {
		if (events) {
			for (const event of events) {
				attributeCoordinates(event);
			}
		}
	}, [events?.length, dispatch]);

	const handleRegionChangeComplete = async (region: Region) => {
		setHiddenSearchButton(false);
		setRegion(region);
	};

	const handleFetchPlaces = async (region: Region) => {
		await fetchPlaces(region);
	};

	const handleMarkerPress = (placeOrEvent: Place | eventI) => {
		setselectedPlaceOrEvent(placeOrEvent);
		bottomSheetRef.current?.snapToIndex(0);
	};

	const handleCloseBottomSheet = () => {
		setselectedPlaceOrEvent(null);
		bottomSheetRef.current?.close();
	};

	const renderCustomMarker = (placeOrEvent: Place | eventI) => {
		const isSelected = selectedPlaceOrEvent?.id === placeOrEvent.id;

		return (
			<View className="items-center">
				<FontAwesome6 name="map-pin" size={isSelected ? 30 : 20} color={Color.RED_BRIGHT_LIGHT} />
				{isSelected && (
					<View className="p-1" style={{ width: 100 }}>
						<TextComponent content={placeOrEvent.name} className="text-center font-bold flex-wrap" />
					</View>
				)}
			</View>
		);
	};

	return (
		<>
			{isHiddenSearchButton && isLoading && (
				<ActivityIndicator size="large" color={themeVariables.primary} className="absolute top-50 right-50" />
			)}
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
				{events?.map(event => {
					if (!event.latitude || !event.longitude) {
						return null;
					}
					return (
						<Marker
							key={event.id}
							coordinate={{
								latitude: event.latitude,
								longitude: event.longitude,
							}}
							onPress={() => handleMarkerPress(event)}>
							{renderCustomMarker(event)}
						</Marker>
					);
				})}
			</MapView>
			<Pressable
				onPress={() => setTheCurrentPosition()}
				className="absolute top-2 right-2 bg-[#FFFFFF] p-3 rounded-full">
				<Feather name="crosshair" size={26} color="black" />
			</Pressable>

			{!isHiddenSearchButton && region && (
				<View className="absolute bottom-10 w-full mx-4 content-center">
					<ButtonComponent
						onPress={() => handleFetchPlaces(region)}
						content={
							isLoading ? (
								<ActivityIndicator size="small" color={Color.WHITE} className="justify-center" />
							) : (
								Content.SEARCH_PLACES
							)
						}
					/>
				</View>
			)}

			<BottomSheet ref={bottomSheetRef} index={-1} snapPoints={["20%"]}>
				<View className="p-4">
					<Pressable onPress={handleCloseBottomSheet} className="absolute top-2 right-2 p-2 rounded-full z-10">
						<Feather name="x-circle" size={24} color={Color.GREY} />
					</Pressable>
					{selectedPlaceOrEvent && (
						<View>
							<TextComponent content={selectedPlaceOrEvent.name} className="font-bold text-xl mb-1" />
							<TextComponent
								content={`${"road" in selectedPlaceOrEvent ? selectedPlaceOrEvent.road : ""} - ${"town" in selectedPlaceOrEvent ? selectedPlaceOrEvent.town : ""}`}
								style={{ color: themeVariables.text }}
							/>
						</View>
					)}
				</View>
			</BottomSheet>
		</>
	);
};

export default GuideFullMap;
