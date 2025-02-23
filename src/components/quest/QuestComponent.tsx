import React, { ReactElement } from "react";
import { View } from "react-native";
import CircleComponent from "../../base/Circle";
import ProgressBar from "../../base/ProgressBar";
import { UserQuest } from "../../store/features/UserQuests/UserQuestsSlices";
import TextComponent from "../../base/Text";

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
					<TextComponent content={userQuest?.quest?.name} className="text-md" />
					{userQuest?.progression < userQuest?.quest?.done_condition ? (
						<View className="flex-row justify-between mt-2 w-full">
							<ProgressBar
								currentStep={userQuest?.progression}
								totalStep={userQuest?.quest?.done_condition}
								width={245}
							/>
							<TextComponent content={`${userQuest?.progression}/${userQuest?.quest?.done_condition}`} />
						</View>
					) : (
						<TextComponent content={`Tu as gagné ${userQuest?.quest?.xp} XP !`} className="mt-2" />
					)}
				</View>
			</View>
		</View>
	);
};

export default QuestComponent;
