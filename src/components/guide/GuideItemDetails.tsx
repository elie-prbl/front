import { FontSize } from "../../base/constant";
import { View } from "react-native";
import React from "react";
import { Place } from "../../store/features/Map/MapPOI";
import { useTheme } from "../../context/ThemeContext";
import TextComponent from "../../base/Text";

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
	const { themeVariables } = useTheme();
	return (
		<View style={{ backgroundColor: themeVariables.background }} className="mx-2 my-1.5 p-4 rounded-lg">
			{place ? (
				<>
					<TextComponent content={place.name} className={`${FontSize.TEXT_XL} font-bold`} />
					<TextComponent content={`${place.road} - ${place.town}`} className={`${FontSize.TEXT_LG} mt-1`} />
				</>
			) : (
				<>
					<TextComponent content={nameEvent} className={`${FontSize.TEXT_XL} font-bold`} />
					<TextComponent content={`${addressEvent} - ${dateTimeEvent}`} className={`${FontSize.TEXT_LG} my-1`} />
					<TextComponent content={descriptionEvent} />
				</>
			)}
		</View>
	);
};

export default GuideItemDetails;
