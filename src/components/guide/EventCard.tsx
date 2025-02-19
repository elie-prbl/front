import React from "react";
import { eventI } from "../../store/features/Events/EventSlices";
import { View } from "react-native";
import TextComponent from "../../base/Text";
import { FontSize } from "../../base/constant";
import { Divider } from "@rneui/themed";

interface EventCardProps {
	event: eventI;
}

const EventCard = ({ event }: EventCardProps) => {
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

	return (
		<View className="flex-col w-11/12 h-fit flex self-center flex-1 p-4 rounded-xl bg-white my-1.5">
			<TextComponent content={event.name} className={`${FontSize.TEXT_LG} font-bold`} />
			<TextComponent content={event.description} className="mb-2" />
			<Divider />
			<TextComponent content={`Lieu : ${event.city}`} className="mt-2" />
			<TextComponent content={"Du " + formatDate(event.start_date) + " au " + formatDate(event.end_date)} />
		</View>
	);
};

export default EventCard;
