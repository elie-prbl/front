import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { Color } from "./constant";

export type progressBarComponentProps = {
	currentStep: number;
	totalStep: number;
	width?: number;
	height?: number;
};

const ProgressBarComponent = ({ currentStep, totalStep, width = 300, height = 10 }: progressBarComponentProps) => {
	const animatedWidth = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const targetWidth = (currentStep / totalStep) * width;

		Animated.spring(animatedWidth, {
			toValue: targetWidth,
			tension: 10,
			friction: 5,
			useNativeDriver: false,
		}).start();
	}, [currentStep]);

	return (
		<View
			className="h-4 felx flex-row justify-start w-64 bg-gray-300 rounded-lg"
			style={{ width, backgroundColor: "#E0E0E0", overflow: "hidden", position: "relative" }}>
			<Animated.View
				style={{
					position: "absolute",
					left: 0,
					width: animatedWidth,
					height: "100%",
					backgroundColor: Color.PRIMARY,
					shadowColor: Color.PRIMARY,
					shadowOffset: { width: 0, height: 0 },
					borderRadius: 10,
				}}
			/>

			<Animated.View
				style={{
					position: "absolute",
					left: 10,
					top: "25%",
					width: animatedWidth.interpolate({
						inputRange: [0, width],
						outputRange: [0, width / 2],
					}),
					height: height * 0.3,
					backgroundColor: "white",
					borderRadius: height,
				}}
			/>
		</View>
	);
};

export default ProgressBarComponent;
