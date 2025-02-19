import React, { useState } from "react";
import { eventI } from "../../store/features/Events/EventSlices";
import { TouchableOpacity, View } from "react-native";
import TextComponent from "../../base/Text";
import { Color, FontSize } from "../../base/constant";
import { Divider } from "@rneui/themed";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { createUserEvent, deleteUserEvent } from "../../store/features/UserEvents/UserEventThunks";

interface EventCardProps {
	event: eventI;
}

const EventCard = ({ event }: EventCardProps) => {
	const { user } = useAppSelector((state: RootState) => state.user);
	const [isParticipating, setParticipating] = useState(false);
	const dispatch = useAppDispatch();

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

	function handleParticipate() {
		if (user && event.id) {
			if (!isParticipating) {
				dispatch(createUserEvent({ user_id: user.id, event_id: event.id, event, is_realized: false }));
			} else {
				if (user) {
					dispatch(deleteUserEvent(user.uuid));
				}
			}
			setParticipating(!isParticipating);
		}
	}

	return (
		<View className="flex-col w-11/12 h-fit flex self-center flex-1 p-4 rounded-xl bg-white my-1.5">
			<TextComponent content={event.name} className={`${FontSize.TEXT_LG} font-bold`} />
			<TextComponent content={event.description} className="mb-2" />
			<Divider />
			<View className="flex-row justify-between items-center">
				<View>
					<TextComponent content={`Nombre de participants : ${event.number_of_participants}`} className="mt-2" />
					<TextComponent content={`Lieu : ${event.city}`} />
					<TextComponent content={"Du " + formatDate(event.start_date) + " au " + formatDate(event.end_date)} />
				</View>
				{event.organizer_uuid !== user?.uuid && (
					<TouchableOpacity
						disabled={false}
						onPress={handleParticipate}
						className="p-2 mt-2 rounded"
						style={{ backgroundColor: Color.PRIMARY }}>
						<TextComponent content={isParticipating ? "Se désinscrire" : "Participer"} />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default EventCard;
