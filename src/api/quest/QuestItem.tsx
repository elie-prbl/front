import { ReactElement } from "react";

export class QuestItem {
	name: string = "";
	img: ReactElement;
	total: number = 0;
	screen: string = "";

	constructor(name: string, img: ReactElement, total: number, screen: string) {
		this.name = name;
		this.img = img;
		this.total = total;
		this.screen = screen;
	}
}
