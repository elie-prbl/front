import React, { useEffect, useState } from "react";
import { eventI } from "../../store/features/Events/EventSlices";
import { TouchableOpacity, View } from "react-native";
import TextComponent from "../../base/Text";
import { Color, FontSize, Url } from "../../base/constant";
import { Divider } from "@rneui/themed";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { createUserEvent, deleteUserEvent, getUsersEvents } from "../../store/features/UserEvents/UserEventThunks";
import { userEventI } from "../../store/features/UserEvents/UserEventSlices";

interface EventCardProps {
	event: eventI;
}

const EventCard = ({ event }: EventCardProps) => {
	const { user } = useAppSelector((state: RootState) => state.user);
	const { user_events, isModifiedUserEvent } = useAppSelector((state: RootState) => state.userEvent);
	const [retrieveParticipants, setRetrieveParticipants] = useState<number>(1);
	const [userEventFromEvent, setUserEventFromEvent] = useState<userEventI | null>(null);
	const [isParticipating, setParticipating] = useState(false);
	const dispatch = useAppDispatch();

	const getNumberOfParticipants = async () => {
		try {
			const response = await fetch(`${Url.BASE_URL_API}/events/user?event_id=${event.id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				console.error("error", response);
			}
			return await response.json();
		} catch (err) {
			throw new Error(`network error: ${err}`);
		}
	};

	useEffect(() => {
		getNumberOfParticipants().then(r => {
			setRetrieveParticipants(r.length);
		});
	}, [isModifiedUserEvent]);

	useEffect(() => {
		if (user?.id) {
			dispatch(getUsersEvents(user.id));
		}
	}, [isModifiedUserEvent, user]);

	useEffect(() => {
		if (user_events) {
			const userEventFromEventFiltered = user_events?.find(userEvent => userEvent.event_id === event.id);
			if (userEventFromEventFiltered) {
				setUserEventFromEvent(userEventFromEventFiltered);
			}
		}
	}, [isModifiedUserEvent, user_events]);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);

		return new Intl.DateTimeFormat("fr-FR", {
			day: "2-digit",
			month: "short",
			hour: "2-digit",
			minute: "2-digit",
			timeZone: "Europe/Paris",
		}).format(date);
	};

	const handleParticipate = () => {
		if (user && userEventFromEvent) {
			if (!isParticipating) {
				dispatch(createUserEvent({ user_id: user.id, event_id: userEventFromEvent.event_id }));
			} else {
				if (user) {
					dispatch(deleteUserEvent(userEventFromEvent.id));
				}
			}
			setParticipating(!isParticipating);
		}
	};

	return (
		<View className="flex-col w-11/12 h-fit flex self-center flex-1 p-4 rounded-xl bg-white my-1.5">
			<TextComponent content={event.name} className={`${FontSize.TEXT_LG} font-bold`} />
			<TextComponent content={event.description} className="mb-2" />
			<Divider />
			<View className="flex-row justify-between items-center">
				<View>
					<TextComponent
						content={`Nombre de participants : ${retrieveParticipants} / ${event.number_of_participants}`}
						className="mt-2"
					/>
					<TextComponent content={`Lieu : ${event.city}`} />
					<TextComponent content={"Du " + formatDate(event.start_date) + " au " + formatDate(event.end_date)} />
				</View>
				{event.organizer_uuid !== user?.uuid && (
					<TouchableOpacity
						disabled={false}
						onPress={handleParticipate}
						className="p-2 mt-2 rounded"
						style={{ backgroundColor: Color.PRIMARY }}>
						<TextComponent
							className={`color=${Color.WHITE}`}
							content={isParticipating ? "Se désinscrire" : "Participer"}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default EventCard;
