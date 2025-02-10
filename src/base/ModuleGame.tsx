import React, { ReactElement } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { Color, FontSize } from "./constant";

interface ModuleGameProps {
	onPress: (event: GestureResponderEvent) => void;
	title: string;
	description: string;
	icon?: ReactElement;
	image?: ReactElement;
	bg?: string;
	textColor?: string;
	borderColor?: string;
	borderWidth?: number;
	shadowColor?: string;
	width?: string;
}

const ModuleGame = ({
	onPress,
	title,
	description,
	icon,
	image,
	bg = Color.PRIMARY,
	textColor = Color.WHITE,
	shadowColor = Color.SECONDARY,
	borderColor = Color.SECONDARY,
	borderWidth,
	width = "w-full",
}: ModuleGameProps) => {
	return (
		<TouchableOpacity className={width} onPress={onPress}>
			<View
				className="rounded-lg"
				style={{
					backgroundColor: shadowColor,
					borderColor,
					borderWidth,
					height: 95,
				}}>
				<View
					className="rounded-lg p-4 flex-row justify-between items-center"
					style={{ zIndex: 1, backgroundColor: bg, height: 90 }}>
					<View className="w-4/5">
						<Text className={`font-bold ${FontSize.TEXT_XL}`} style={{ color: textColor }}>
							{title}
						</Text>
						<Text style={{ color: textColor }}>{description}</Text>
					</View>
					<View className="w-12">
						{icon && (
							<View
								className="rounded-lg h-12"
								style={{
									backgroundColor: shadowColor,
									borderColor,
									borderWidth: 1,
								}}>
								<View
									className="rounded-lg h-11 justify-center items-center"
									style={{ zIndex: 1, backgroundColor: bg }}>
									{icon}
								</View>
							</View>
						)}
						{image && image}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ModuleGame;
