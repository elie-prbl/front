import { Color, FontSize } from "../../base/constant";
import { Text, View } from "react-native";
import React from "react";
import { Place } from "../../store/features/Map/MapPOI";

interface GuideItemDetailsProps {
	// TODO : Remplacer les 4 premières props par l'object Event lorsque ça sera implémenté
	nameEvent?: string;
	descriptionEvent?: string;
	addressEvent?: string;
	dateTimeEvent?: string;
	place?: Place;
}

const GuideItemDetails = ({
	nameEvent,
	descriptionEvent,
	addressEvent,
	dateTimeEvent,
	place,
}: GuideItemDetailsProps) => {
	return (
		<View style={{ backgroundColor: Color.WHITE }} className="mx-2 my-1.5 p-4 rounded-lg">
			{place ? (
				<>
					<Text className={`${FontSize.TEXT_XL} font-bold`}>{place.name}</Text>
					<Text className={`${FontSize.TEXT_LG} mt-1`}>
						{place.road} - {place.town}
					</Text>
				</>
			) : (
				<>
					<Text className={`${FontSize.TEXT_XL} font-bold`}>{nameEvent}</Text>
					<Text className={`${FontSize.TEXT_LG} my-1`}>
						{addressEvent} - {dateTimeEvent}
					</Text>
					<Text>{descriptionEvent}</Text>
				</>
			)}
		</View>
	);
};

export default GuideItemDetails;
