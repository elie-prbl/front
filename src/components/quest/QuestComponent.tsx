import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import CircleComponent from "../../base/Circle";
import ProgressBar from "../../base/ProgressBar";
import { UserQuest } from "../../store/features/UserQuests/UserQuestsSlices";

export type questProps = {
	userQuest: UserQuest;
	img: ReactElement;
};

const QuestComponent = ({ userQuest, img }: questProps) => {
	return (
		<View className="justify-center flex-1">
			<View className="flex-row w-full items-center my-2">
				<CircleComponent
					img={img}
					isDisabled={false}
					isDone={userQuest?.progression >= userQuest.quest?.done_condition}
					isNext
				/>
				<View className="flex-col ml-2 flex-1 justify-center">
					<Text className="text-md">{userQuest?.quest?.name}</Text>
					{userQuest?.progression < userQuest?.quest?.done_condition ? (
						<View className="flex-row justify-between mt-2 w-full">
							<ProgressBar
								currentStep={userQuest?.progression}
								totalStep={userQuest?.quest?.done_condition}
								width={230}
							/>
							<Text>
								{userQuest?.progression} / {userQuest?.quest?.done_condition}
							</Text>
						</View>
					) : (
						<Text className="mt-2"> Tu as gagné {userQuest?.quest?.xp} xp !</Text>
					)}
				</View>
			</View>
		</View>
	);
};

export default QuestComponent;
