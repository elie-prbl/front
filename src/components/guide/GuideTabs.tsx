import { Color, Content } from "../../base/constant";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import TextComponent from "../../base/Text";

export enum Tab {
	EVENTS,
	POI,
}

interface GuideTabsProps {
	activeTab: Tab;
	onPressEvent: () => void;
	onPressPoi: () => void;
}

const GuideTabs = ({ activeTab, onPressEvent, onPressPoi }: GuideTabsProps) => {
	const { themeVariables } = useTheme();

	return (
		<View
			className="flex-row h-12 mx-2 my-1.5 rounded-lg items-center p-1"
			style={{ backgroundColor: themeVariables.borderColor }}>
			<TouchableOpacity
				onPress={onPressEvent}
				className="flex-1 h-10 rounded-lg items-center justify-center mr-0.5"
				style={{
					backgroundColor: themeVariables.background,
					borderColor: activeTab === Tab.EVENTS ? themeVariables.primary : themeVariables.borderColor,
					borderWidth: 2,
				}}>
				<TextComponent content={Content.EVENTS} className="text-lg" />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={onPressPoi}
				className="flex-1 h-10 rounded-lg items-center justify-center ml-0.5"
				style={{
					backgroundColor: themeVariables.background,
					borderColor: activeTab === Tab.POI ? themeVariables.primary : themeVariables.borderColor,
					borderWidth: 2,
				}}>
				<TextComponent content={Content.POI} className="text-lg" />
			</TouchableOpacity>
		</View>
	);
};

export default GuideTabs;
