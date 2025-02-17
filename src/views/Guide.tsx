import React, { useEffect, useState } from "react";
import Layout from "../base/Layout";
import GuideCompactMap from "../components/guide/GuideCompactMap";
import { Color, Content } from "../base/constant";
import BoxComponent from "../base/Box";
import GuideTabs, { Tab } from "../components/guide/GuideTabs";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ActivityIndicator, ScrollView } from "react-native";
import GuideItemDetails from "../components/guide/GuideItemDetails";
import TextComponent from "../base/Text";
import EventCard from "../components/map/EventCard";
import { getEvents } from "../store/features/Events/EventThunk";
import { useAppDispatch } from "../store/hooks";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../navigation/AppNavigator";
import { getPlaces } from "../store/features/Places/PlacesThunk";

const Guide = () => {
	const navigation = useNavigation<MyNavigationProp>();
	const [activeTab, setActiveTab] = useState<Tab>(Tab.EVENTS);
	const position = useSelector((state: RootState) => state.position.position);
	const { events, isLoadingEvents } = useSelector((state: RootState) => state.events);
	const { places, isLoadingPlaces } = useSelector((state: RootState) => state.places);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (position) {
			dispatch(getEvents({ latitude: position.latitude, longitude: position.longitude }));
			dispatch(getPlaces(position));
		}
	}, [dispatch, position]);

	const handleDisplayEvents = () => {
		setActiveTab(Tab.EVENTS);
	};

	const handleDisplayPoi = () => {
		setActiveTab(Tab.POI);
	};

	return (
		<Layout>
			<BoxComponent title={Content.MAP} height="h-48" onPress={() => navigation.navigate("GuideFullMap")}>
				<GuideCompactMap />
			</BoxComponent>
			<GuideTabs
				activeTab={activeTab}
				onPressEvent={() => handleDisplayEvents()}
				onPressPoi={() => handleDisplayPoi()}
			/>
			{(isLoadingPlaces || isLoadingEvents) && (
				<ActivityIndicator size="large" color={Color.PRIMARY} className="mt-10" />
			)}
			{activeTab === Tab.POI &&
				!isLoadingEvents &&
				!isLoadingPlaces &&
				(!places?.length ? (
					<TextComponent content={Content.NO_POI} className="text-center mt-10" />
				) : (
					<ScrollView showsVerticalScrollIndicator={false}>
						{places?.map(place => <GuideItemDetails key={place.id} place={place} />)}
					</ScrollView>
				))}
			{activeTab === Tab.EVENTS &&
				!isLoadingEvents &&
				!isLoadingPlaces &&
				events &&
				(!events.length ? (
					<TextComponent content={Content.NO_EVENT} className="text-center mt-10" />
				) : (
					<ScrollView showsVerticalScrollIndicator={false}>
						{events.map(event => (
							<EventCard key={event.id} event={event} />
						))}
					</ScrollView>
				))}
		</Layout>
	);
};

export default Guide;
