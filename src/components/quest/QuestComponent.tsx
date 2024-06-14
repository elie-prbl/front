import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import CircleComponent from "../../base/Circle";
import ProgressBar from "../../base/ProgressBar";
import { QuestState } from "../../store/features/Quests/QuestsSlices";

export type questProps = {
	quest: QuestState;
	img: ReactElement;
};

const QuestComponent = ({ quest, img }: questProps) => {
	return (
		<View className="justify-center flex-1">
			<View className="flex-row w-full items-center my-2">
				<CircleComponent img={img} isDisabled={false} isDone={quest?.progress >= quest?.done_condition} />
				<View className="flex-col ml-2 flex-1 justify-center">
					<Text className="text-md">{quest?.name}</Text>
					{quest?.progress < quest?.done_condition ? (
						<View className="flex-row justify-between mt-2 w-full">
							<ProgressBar currentStep={quest?.progress} totalStep={quest?.done_condition} width={230} />
							<Text>
								{quest?.progress} / {quest?.done_condition}
							</Text>
						</View>
					) : (
						<Text className="mt-2"> Tu as gagné {quest?.xp} xp !</Text>
					)}
				</View>
			</View>
		</View>
	);
};

export default QuestComponent;
