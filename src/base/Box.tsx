import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import { Color, FontSize } from "./constant";

interface BoxComponentProps {
	title: string;
	itemRight?: string | ReactElement;
	height?: string;
	children: ReactElement;
}

const BoxComponent = ({ title, height, children, itemRight }: BoxComponentProps) => {
	return (
		<View style={{ backgroundColor: Color.WHITE }} className={`${height} mx-2 my-1.5 p-4 rounded-lg`}>
			<View className="mb-2 flex-row justify-between">
				<Text className={FontSize.TEXT_XL}>{title}</Text>
				{typeof itemRight === "string" ? (
					<Text className={FontSize.TEXT_XL}>{itemRight}</Text>
				) : (
					<View>{itemRight}</View>
				)}
			</View>
			{children}
		</View>
	);
};

export default BoxComponent;
