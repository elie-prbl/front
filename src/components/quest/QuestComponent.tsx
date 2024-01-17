import React, { ReactElement, useState } from "react";
import { Text, View } from "react-native";
import CircleComponent from "../../base/Circle";
import ProgressBar from "../../base/ProgressBar";
import { QuestState } from "../../store/features/Quests/QuestsSlices";

export type questProps = {
	quest: QuestState;
	img: ReactElement;
};

const QuestComponent = ({ quest, img }: questProps) => {
	const [currentStep, setCurrentStep] = useState<number>(0);

	return (
		<View className="justify-center flex-1">
			<View className="flex-row w-full items-center my-2">
				<CircleComponent img={img} isDisabled={false} isDone={false} />
				<View className="flex-col ml-2 flex-1 justify-center">
					<Text>{quest?.name}</Text>
					<View className="flex-row justify-between mt-2 w-full">
						<ProgressBar currentStep={0} totalStep={quest?.done_condition} width={230} />
						<Text>
							{currentStep} / {quest?.done_condition}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default QuestComponent;
