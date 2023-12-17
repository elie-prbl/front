import React, { useState } from "react";
import { Text, View } from "react-native";
import { Quest } from "../../api/quest/Quest";
import CircleComponent from "../../base/Circle";
import ProgressBar from "../../base/ProgressBar";

const QuestComponent = () => {
	const [randomEasy, randomMedium, randomHard] = Quest.randomQuestItem();
	const [currentStep, setCurrentStep] = useState<number>(0);

	return (
		<View className="justify-center flex-1">
			{[randomEasy, randomMedium, randomHard].map((quest, index) => (
				<View className="flex-row w-full items-center my-2" key={index}>
					<CircleComponent img={quest.img} isDisabled={false} isDone={false} />
					<View className="flex-col ml-2 flex-1 justify-center">
						<Text>{quest.name}</Text>
						<View className="flex-row justify-between mt-2 w-full">
							<ProgressBar currentStep={0} totalStep={quest.total} width={230} />
							<Text>
								{currentStep} / {quest.total}
							</Text>
						</View>
					</View>
				</View>
			))}
		</View>
	);
};

export default QuestComponent;
