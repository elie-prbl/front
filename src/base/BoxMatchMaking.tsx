import React, { ReactElement } from "react";
import { View } from "react-native";
import { Color } from "./constant";

interface BoxComponentProps {
	children: ReactElement | ReactElement[];
	height?: number;
}

const BoxMatchMakingComponent = ({ children, height = 250 }: BoxComponentProps) => {
	return (
		<View className="m-4 rounded-lg" style={{ backgroundColor: Color.GREY, height }}>
			<View className="rounded-lg h-11 justify-center p-4" style={{ backgroundColor: Color.WHITE, height: height - 5 }}>
				{children}
			</View>
		</View>
	);
};

export default BoxMatchMakingComponent;
