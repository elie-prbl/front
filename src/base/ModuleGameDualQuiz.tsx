import React from "react";
import { Text, View } from "react-native";
import { Color, FontSize } from "./constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextComponent from "./Text";

interface ModuleGameDualQuizProps {
	topic: string;
	title: string;
	bg?: string;
	borderColor?: string;
	borderWidth?: number;
	shadowColor?: string;
}

const ModuleGameDualQuiz = ({
	topic,
	title,
	bg = Color.PRIMARY,
	shadowColor = Color.SECONDARY,
	borderColor = Color.SECONDARY,
	borderWidth,
}: ModuleGameDualQuizProps) => {
	return (
		<View
			className="rounded-lg"
			style={{
				backgroundColor: `${shadowColor}`,
				borderColor,
				borderWidth,
				height: 95,
			}}>
			<View
				className="rounded-lg p-4 flex-row justify-between items-center"
				style={{ zIndex: 1, backgroundColor: `${bg}`, height: 90 }}>
				<View className="w-4/5">
					<TextComponent content={topic} className={`${FontSize.TEXT_XL} bold color=${Color.WHITE}`} />
					<TextComponent content={title} className={`color=${Color.WHITE}`} />
				</View>
				<View className="w-12">
					<View
						className="rounded-lg h-12"
						style={{
							backgroundColor: `${shadowColor}`,
							borderColor,
							borderWidth: 1,
						}}>
						<View
							className="rounded-lg h-11 justify-center items-center"
							style={{ zIndex: 1, backgroundColor: `${bg}` }}>
							<MaterialCommunityIcons name="notebook-multiple" size={24} color="white" />
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ModuleGameDualQuiz;
