import { Color, Content } from "../../base/constant";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

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
	return (
		<View
			className="flex-row h-12 mx-2 my-1.5 rounded-lg items-center p-1"
			style={{ backgroundColor: Color.GREY_LIGHT }}>
			<TouchableOpacity
				onPress={onPressEvent}
				className="flex-1 h-10 rounded-lg items-center justify-center mr-0.5"
				style={{
					backgroundColor: Color.WHITE,
					borderColor: activeTab === Tab.EVENTS ? Color.PRIMARY : Color.GREY_DARK,
					borderWidth: 2,
				}}>
				<Text className="text-lg">{Content.EVENTS}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={onPressPoi}
				className="flex-1 h-10 rounded-lg items-center justify-center ml-0.5"
				style={{
					backgroundColor: Color.WHITE,
					borderColor: activeTab === Tab.POI ? Color.PRIMARY : Color.GREY_DARK,
					borderWidth: 2,
				}}>
				<Text className="text-lg">{Content.POI}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default GuideTabs;
