import React, { ReactElement } from "react";
import { View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface BoxComponentProps {
	children: ReactElement | ReactElement[];
	height?: number;
}

const BoxMatchMakingComponent = ({ children, height = 250 }: BoxComponentProps) => {
	const { themeVariables } = useTheme();
	return (
		<View className="m-4 rounded-lg" style={{ backgroundColor: themeVariables.primary, height }}>
			<View
				className="rounded-lg h-11 justify-center p-4"
				style={{ backgroundColor: themeVariables.background, height: height - 5 }}>
				{children}
			</View>
		</View>
	);
};

export default BoxMatchMakingComponent;
