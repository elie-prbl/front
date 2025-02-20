import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Color, Content } from "../../base/constant";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BottomSheet from "@gorhom/bottom-sheet";
import { useTheme } from "../../context/ThemeContext";
import TextComponent from "../../base/Text";
import ButtonComponent from "../../base/Button";
import { getEvents } from "../../store/features/Events/EventThunk";
import { useAppDispatch } from "../../store/hooks";
import { eventI } from "../../store/features/Events/EventSlices";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import { PlaceI } from "../../store/features/Places/PlacesSlice";
import { getPlaces } from "../../store/features/Places/PlacesThunk";
import { LatLng } from "react-native-maps/lib/sharedTypes";

configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false,
});

const GuideFullMap = () => {
	const { themeVariables } = useTheme();
	const position = useSelector((state: RootState) => state.position.position);
	const { events, isLoadingEvents } = useSelector((state: RootState) => state.events);
	const { places, isLoadingPlaces } = useSelector((state: RootState) => state.places);
	const mapRef = useRef<MapView>(null);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [selectedPlaceOrEvent, setSelectedPlaceOrEvent] = useState<PlaceI | eventI | null>(null);
	const [currentRegion, setCurrentRegion] = useState<LatLng | null>(position);
	const dispatch = useAppDispatch();
	const [filteredEvents, setFilteredEvents] = useState<eventI[] | null>(null);

	const filterEventsByDistance = (events: eventI[], position: LatLng, maxDistance: number) => {
		const toRad = (value: number) => (value * Math.PI) / 180;

		return events.filter(event => {
			const eventLat = event.latitude;
			const eventLon = event.longitude;

			const distance =
				Math.acos(
					Math.sin(toRad(position.latitude)) * Math.sin(toRad(eventLat)) +
						Math.cos(toRad(position.latitude)) *
							Math.cos(toRad(eventLat)) *
							Math.cos(toRad(eventLon - position.longitude)),
				) * 6371;

			return distance <= maxDistance;
		});
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
		if (currentRegion) {
			dispatch(getPlaces(currentRegion));
			dispatch(getEvents({ latitude: currentRegion.latitude, longitude: currentRegion.longitude }));
		}
	}, []);

	useEffect(() => {
		if (currentRegion && events) {
			const newFilteredEvents = filterEventsByDistance(events, currentRegion, 5);
			setFilteredEvents(newFilteredEvents);
		}
	}, [events]);

	const handleRegionChangeComplete = async (position: LatLng) => {
		setCurrentRegion(position);
	};

	const handleFetchPlacesAndEvents = async () => {
		if (currentRegion && events) {
			dispatch(getPlaces(currentRegion));
			const newFilteredEvents = filterEventsByDistance(events, currentRegion, 5);
			setFilteredEvents(newFilteredEvents);
		}
	};

	const handleMarkerPress = (placeOrEvent: PlaceI | eventI) => {
		setSelectedPlaceOrEvent(placeOrEvent);
		bottomSheetRef.current?.snapToIndex(0);
	};

	const handleCloseBottomSheet = () => {
		setSelectedPlaceOrEvent(null);
		bottomSheetRef.current?.close();
	};

	const renderCustomMarker = (placeOrEvent: PlaceI | eventI) => {
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
			<MapView
				ref={mapRef}
				key={(places?.length ?? 0) + (events?.length ?? 0)}
				className="w-full h-full"
				initialRegion={
					currentRegion
						? {
								latitude: currentRegion.latitude,
								longitude: currentRegion.longitude,
								latitudeDelta: 0.04,
								longitudeDelta: 0.04,
							}
						: undefined
				}
				showsUserLocation
				showsCompass={false}
				onRegionChangeComplete={handleRegionChangeComplete}>
				{Array.isArray(places) &&
					places?.map(place => (
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
				{Array.isArray(filteredEvents) &&
					filteredEvents?.map(event => (
						<Marker
							key={event.id}
							coordinate={{
								latitude: event.latitude,
								longitude: event.longitude,
							}}
							onPress={() => handleMarkerPress(event)}>
							{renderCustomMarker(event)}
						</Marker>
					))}
			</MapView>
			<Pressable onPress={() => setTheCurrentPosition()} className="absolute top-2 right-2 bg-white p-3 rounded-full">
				<Feather name="crosshair" size={26} color="black" />
			</Pressable>
			{position?.longitude !== currentRegion?.longitude && position?.latitude !== currentRegion?.latitude && (
				<View className="absolute bottom-10 w-full mx-4 content-center">
					<ButtonComponent
						onPress={() => handleFetchPlacesAndEvents()}
						content={
							isLoadingPlaces || isLoadingEvents ? (
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
							{!("road" in selectedPlaceOrEvent) ? (
								<>
									<TextComponent
										content={`${selectedPlaceOrEvent.name} - ${selectedPlaceOrEvent.description}`}
										style={{ color: themeVariables.text }}
									/>
									<TextComponent
										content={`Nombre de participants : 0 / ${selectedPlaceOrEvent.number_of_participants}`}
										style={{ color: themeVariables.text, marginTop: 10 }}
									/>
								</>
							) : (
								<TextComponent
									content={`${selectedPlaceOrEvent.road} - ${selectedPlaceOrEvent.town}`}
									style={{ color: themeVariables.text }}
								/>
							)}
						</View>
					)}
				</View>
			</BottomSheet>
		</>
	);
};

export default GuideFullMap;
