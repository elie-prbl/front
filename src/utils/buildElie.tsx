import { Content } from "../base/constant";
import ElieGold from "../svg/ElieGold";
import ElieCyber from "../svg/ElieCyber";
import EliePirate from "../svg/EliePirate";
import Elie from "../svg/Elie";
import React from "react";

export const buildElie = (name: string) => {
	switch (name) {
		case Content.ELIE_GOLD:
			return <ElieGold />;
		case Content.ELIE_CYBER:
			return <ElieCyber />;
		case Content.ELIE_PIRATE:
			return <EliePirate />;
		default:
			return <Elie />;
	}
};
