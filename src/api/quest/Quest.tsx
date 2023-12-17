import { QuestItem } from "./QuestItem";
import React from "react";
import Circle_1 from "../../svg/Circle_1";

export class Quest {
	item: QuestItem[];

	static EASY_QUEST = new Quest([
		new QuestItem("Connectes toi sur l'application", <Circle_1 />, 1, ""),
		new QuestItem("Joues à 1 quiz", <Circle_1 />, 1, "game"),
	]);
	static MEDIUM_QUEST = new Quest([
		new QuestItem("Gagne 1 quiz", <Circle_1 />, 1, "game"),
		new QuestItem("Joues à 3 quiz", <Circle_1 />, 3, "game"),
	]);
	static HARD_QUEST = new Quest([
		new QuestItem("Effectues un trajet", <Circle_1 />, 1, "map"),
		new QuestItem("Gagnes 5 quiz", <Circle_1 />, 5, "game"),
	]);

	constructor(item: QuestItem[]) {
		this.item = item;
	}

	static values(): Quest[] {
		return [Quest.EASY_QUEST, Quest.MEDIUM_QUEST, Quest.HARD_QUEST];
	}

	static randomQuestItem() {
		const randomEasyQuestItem = this.EASY_QUEST.item[Math.floor(Math.random() * this.EASY_QUEST.item.length)];
		const randomMediumQuestItem = this.MEDIUM_QUEST.item[Math.floor(Math.random() * this.MEDIUM_QUEST.item.length)];
		const randomHardQuestItem = this.HARD_QUEST.item[Math.floor(Math.random() * this.HARD_QUEST.item.length)];

		return [randomEasyQuestItem, randomMediumQuestItem, randomHardQuestItem];
	}
}
