import React, { ReactElement } from "react";
import { Pressable, View } from "react-native";
import { Color } from "./constant";

interface CircleComponentProps {
	img: ReactElement;
	isDisabled: boolean;
	isDone: boolean;
	onPress?: () => void;
	classNamePressable?: string;
	classNameView?: string;
}

const CircleComponent = ({
	img,
	isDisabled,
	isDone,
	onPress,
	classNamePressable = "h-16 w-16",
	classNameView = "h-14 w-14",
}: CircleComponentProps) => {
	return (
		<View>
			<Pressable
				className={`rounded-full justify-center items-center ${classNamePressable}`}
				onPress={onPress}
				disabled={isDisabled}
				style={
					isDisabled
						? { backgroundColor: Color.GREY }
						: isDone
						? { backgroundColor: Color.PRIMARY }
						: { backgroundColor: Color.GOLD }
				}>
				<View
					className={`h-14 w-14 rounded-full justify-center items-center ${classNameView}`}
					style={{ borderColor: Color.WHITE, borderWidth: 3, borderStyle: "solid" }}>
					<View className="h-full w-full rounded-full">{img}</View>
				</View>
			</Pressable>
		</View>
	);
};

export default CircleComponent;
