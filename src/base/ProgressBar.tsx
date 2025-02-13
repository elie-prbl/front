import React from "react";
import { View } from "react-native";
import { Color } from "./constant";

export type progressBarComponentProps = {
	currentStep: number;
	totalStep: number;
	width: number;
};

const ProgressBarComponent = ({ currentStep, totalStep, width }: progressBarComponentProps) => {
	const progressWidth = (currentStep / totalStep) * width;

	return (
		<View className="overflow-hidden h-4" style={{ width, backgroundColor: Color.GREY, borderRadius: 8 }}>
			<View className="h-full" style={{ width: progressWidth, backgroundColor: Color.PRIMARY, borderRadius: 8 }} />
		</View>
	);
};

export default ProgressBarComponent;
