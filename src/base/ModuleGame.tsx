import React, { ReactElement } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { Color } from "./constant";

interface ModuleGameProps {
	onPress: (event: GestureResponderEvent) => void;
	title: string;
	description: string;
	icon: ReactElement;
	disabled?: boolean;
	bg?: string;
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
	disabled = false,
	bg = Color.PRIMARY,
	shadowColor = Color.SECONDARY,
	borderColor = Color.SECONDARY,
	borderWidth = 1,
	width = "w-11/12",
}: ModuleGameProps) => {
	return (
		<TouchableOpacity className={width} onPress={onPress} disabled={disabled}>
			<View
				className="rounded-lg"
				style={{
					backgroundColor: disabled ? Color.GREY : `${shadowColor}`,
					borderColor,
					borderWidth,
					height: 95,
				}}>
				<View
					className="rounded-lg p-5 flex-row justify-between items-center"
					style={{ zIndex: 1, backgroundColor: disabled ? Color.GREY : `${bg}`, height: 90 }}>
					<View className="w-2/3">
						<Text className="font-bold text-xl mb-2" style={{ color: Color.WHITE }}>
							{title}
						</Text>
						<Text className="text-xl" style={{ color: Color.WHITE }}>
							{description}
						</Text>
					</View>
					<View className="w-12">
						<View
							className="rounded-lg h-12"
							style={{
								backgroundColor: disabled ? Color.GREY : `${shadowColor}`,
								borderColor,
								borderWidth,
							}}>
							<View
								className="rounded-lg h-11 justify-center items-center"
								style={{ zIndex: 1, backgroundColor: disabled ? Color.GREY : `${bg}` }}>
								{icon}
							</View>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ModuleGame;