import React, { useState } from "react";
import Layout from "../base/Layout";
import GuideCompactMap from "../components/guide/GuideCompactMap";
import { Color, Content } from "../base/constant";
import BoxComponent from "../base/Box";
import GuideTabs, { Tab } from "../components/guide/GuideTabs";
import { getPlaces, Place } from "../store/features/Map/MapPOI";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ActivityIndicator, ScrollView } from "react-native";
import GuideItemDetails from "../components/guide/GuideItemDetails";
import TextComponent from "../base/Text";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../navigation/AppNavigator";

const Guide = () => {
	const navigation = useNavigation<MyNavigationProp>();
	const [activeTab, setActiveTab] = useState<Tab>(Tab.EVENTS);
	const position = useSelector((state: RootState) => state.position.position);
	const [places, setPlaces] = useState<Place[]>([]);
	const [isLoadingPOI, setLoadingPOI] = useState(false);

	// TODO : A voir si on charge les évènements et les POI à chaque fois qu'on click sur les boutons
	// TODO : Ou si on le fait une fois au début et dans ce cas utiliser un useEffect
	// TODO : Mais pour les POI si la position de l'utilisateur change il faut penser à récupérer les nouveaux POI

	const handleDisplayEvents = () => {
		setActiveTab(Tab.EVENTS);
		setLoadingPOI(false);
		// TODO : Récupérer les évènements
	};

	const handleDisplayPoi = () => {
		setActiveTab(Tab.POI);

		if (!position) return;

		(async () => {
			setLoadingPOI(true);
			try {
				const initialRegion = {
					latitude: position.latitude,
					longitude: position.longitude,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04,
				};
				const places = await getPlaces(initialRegion);
				setPlaces(places);
			} catch (error) {
				console.log(error);
			} finally {
				setLoadingPOI(false);
			}
		})();
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
			{activeTab === Tab.EVENTS && (
				<TextComponent content="Fonctionnalité à venir prochainement" className="text-center mt-10" />
			)}
			{isLoadingPOI ? (
				<ActivityIndicator size="large" color={Color.PRIMARY} className="mt-10" />
			) : (
				activeTab === Tab.POI &&
				(!places.length ? (
					<TextComponent content={Content.NO_POI} className="text-center mt-10" />
				) : (
					<ScrollView showsVerticalScrollIndicator={false}>
						{places.map(place => (
							<GuideItemDetails key={place.id} place={place} />
						))}
					</ScrollView>
				))
			)}
		</Layout>
	);
};

export default Guide;
