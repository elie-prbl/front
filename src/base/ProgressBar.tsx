import React from "react";
import { View } from "react-native";
import { Color } from "./constant";

export type progressBarComponentProps = {
	currentStep: number;
	totalStep: number;
	width: number;
};

const ProgressBarComponent = ({ currentStep, totalStep, width }: progressBarComponentProps) => {
	const eachStepSize = width / totalStep;
	const steps = [];

	for (let i = 1; i <= totalStep; i++) {
		const stepStyle = i <= currentStep ? Color.PRIMARY : Color.GREY;
		steps.push(
			<View
				key={i}
				className={`h-4 ${i < 2 ? "rounded-l-lg" : ""} ${i === totalStep ? "rounded-r-lg" : ""}`}
				style={{ width: eachStepSize, backgroundColor: stepStyle }}
			/>,
		);
	}

	return <View className="h-4 flex-row">{steps}</View>;
};

export default ProgressBarComponent;
