import { ScrollView, View } from "react-native";
import React, { useState } from "react";
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
import { createEvent } from "../../store/features/Events/EventThunk";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../../navigation/AppNavigator";

const GuideAddEvents = () => {
	const navigation = useNavigation<MyNavigationProp>();
	const [name, setName] = useState<string>("Trie de Déchet à espace vert");
	const [description, setDescription] = useState<string>(
		"Tri de déchet dans les espace vert autour des stades, de l'ecole et des voies rapides",
	);
	const [address, setAddress] = useState<string>("15 rue pierre de coubertin");
	const [city, setCity] = useState<string>("Pontoise");
	const [postalCode, setPostalCode] = useState<string>("95032");
	const [startDateTime, setStartDateTime] = useState(new Date());
	const [endDateTime, setEndDateTime] = useState(new Date());
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { user } = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();

	const newEvent = {
		name,
		description,
		address,
		city,
		zip_code: postalCode,
		start_date: startDateTime.toISOString(),
		end_date: endDateTime.toISOString(),
		organizer_uuid: user!.uuid,
		currency_win: 100,
		number_of_participants: 0,
		is_full: false,
	};

	const handleCreateEvent = async () => {
		if (!name || !description || !address || !city || !postalCode) {
			setErrorMessage("Tous les champs doivent être remplis.");
			return;
		}
		const postalCodeRegex = /^\d{5}$/;
		if (!postalCodeRegex.test(postalCode)) {
			setErrorMessage("Le code postal doit être composé de 5 chiffres.");
			return;
		}
		if (endDateTime <= startDateTime) {
			setErrorMessage("La date de fin doit être supérieure à la date de début.");
			return;
		}

		try {
			await dispatch(createEvent(newEvent)).unwrap();
			navigation.goBack();
			setErrorMessage("");
		} catch (error) {
			setErrorMessage("Erreur lors de la création de l'évenement.");
		}
	};

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
					{errorMessage && <TextComponent content={errorMessage} isError className="text-center font-bold py-4" />}
					<ButtonComponent onPress={handleCreateEvent} content="Confirmer" width="w-full" padding="pt-4" />
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default GuideAddEvents;
