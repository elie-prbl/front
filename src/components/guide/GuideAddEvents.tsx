import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../../base/Layout";
import GuideCompactMap from "./GuideCompactMap";
import TextInputComponent from "../../base/TextInput";
import TextAreaInputComponent from "../../base/TextAreaInput";
import BoxComponent from "../../base/Box";
import { Content } from "../../base/constant";
import DateTimePickerComponent from "./DateTimePicker";
import ButtonComponent from "../../base/Button";
import TextComponent from "../../base/Text";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { createEvent, createEventBodyI } from "../../store/features/Events/EventThunk";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../../navigation/AppNavigator";

const formatDateToISOWithOffset = (date: Date) => {
	const isoString = date.toISOString();
	const truncatedString = isoString.split(".")[0];
	return `${truncatedString}+00:00`;
};

const GuideAddEvents = () => {
	const navigation = useNavigation<MyNavigationProp>();
	const [name, setName] = useState<string>("Trie de Déchet à espace vert");
	const [description, setDescription] = useState<string>(
		"Tri de déchet dans les espace vert autour des stades, de l'ecole et des voies rapides",
	);
	const [address, setAddress] = useState<string>("16 impasse bellevue");
	const [city, setCity] = useState<string>("Change");
	const [postalCode, setPostalCode] = useState<string>("72560");
	const [startDateTime, setStartDateTime] = useState(new Date());
	const [endDateTime, setEndDateTime] = useState(new Date());
	const [numberOfParticipants, setNumberOfParticipants] = useState<string>("10");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { isCreatedEvent } = useAppSelector((state: RootState) => state.events);
	const { user } = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();

	const newEvent: createEventBodyI = {
		name,
		description,
		address,
		city,
		zip_code: postalCode,
		start_date: formatDateToISOWithOffset(startDateTime),
		end_date: formatDateToISOWithOffset(endDateTime),
		organizer_uuid: user!.uuid,
		number_of_participants: parseInt(numberOfParticipants, 10),
	};

	const handleCreateEvent = () => {
		if (!name || !description || !address || !city || !postalCode) {
			setErrorMessage("Tous les champs doivent être remplis.");
			return;
		}
		const postalCodeRegex = /^\d{5}$/;
		if (!postalCodeRegex.test(postalCode)) {
			setErrorMessage("Le code postal doit être composé de 5 chiffres.");
			return;
		}
		if (isNaN(parseInt(numberOfParticipants, 10))) {
			setErrorMessage("Le nombre de participants doit être un nombre valide.");
			return;
		}
		if (endDateTime <= startDateTime) {
			setErrorMessage("La date de fin doit être supérieure à la date de début.");
			return;
		}
		dispatch(createEvent(newEvent));
	};

	useEffect(() => {
		if (isCreatedEvent) {
			navigation.goBack();
		}
	}, [isCreatedEvent]);

	return (
		<Layout>
			<ScrollView>
				<BoxComponent title={Content.MAP} height="h-48">
					<GuideCompactMap />
				</BoxComponent>
				<BoxComponent title="Création d'un évenement" height="h-full">
					<TextInputComponent onChangeText={setName} label="Nom" textInput={name} placeholder="Nom" width="w-full" />
					<TextInputComponent
						onChangeText={setAddress}
						label="Addresse"
						textInput={address}
						placeholder="Addresse"
						width="w-full"
					/>
					<TextInputComponent
						onChangeText={setCity}
						label="Ville"
						textInput={city}
						placeholder="ville"
						width="w-full"
					/>
					<TextInputComponent
						onChangeText={setPostalCode}
						label="Code postal"
						textInput={postalCode}
						placeholder="Code postal"
						width="w-full"
					/>
					<View className="flex-row justify-between">
						<DateTimePickerComponent label="Début" dateTime={startDateTime} setDateTime={setStartDateTime} />
						<DateTimePickerComponent label="Fin" dateTime={endDateTime} setDateTime={setEndDateTime} />
					</View>
					<TextAreaInputComponent
						onChangeText={setDescription}
						label="Description"
						textInput={description}
						placeholder="Description"
					/>
					<TextInputComponent
						onChangeText={setNumberOfParticipants}
						label="Nombre de participants"
						textInput={numberOfParticipants}
						placeholder="10"
						width="w-full"
					/>
					{errorMessage && (
						<TextComponent content={errorMessage as string} isError className="text-center font-bold py-4" />
					)}
					<ButtonComponent onPress={handleCreateEvent} content="Confirmer" width="w-full" padding="pt-4" />
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default GuideAddEvents;
