import { FontSize } from "../../base/constant";
import { View } from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import TextComponent from "../../base/Text";
import { PlaceI } from "../../store/features/Places/PlacesSlice";

interface PoiCardProps {
	place?: PlaceI;
}

const PoiCard = ({ place }: PoiCardProps) => {
	const { themeVariables } = useTheme();
	return (
		<View style={{ backgroundColor: themeVariables.background }} className="mx-2 my-1.5 p-4 rounded-lg">
			{place && (
				<>
					<TextComponent content={place.name} className={`${FontSize.TEXT_LG} font-bold`} />
					<TextComponent content={`${place.road} - ${place.town}`} className="mt-1" />
				</>
			)}
		</View>
	);
};

export default PoiCard;
