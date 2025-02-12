import ElieHeader from "../svg/ElieHeader";
import EliePirateHeader from "../svg/EliePirateHeader";
import ElieCyberHeader from "../svg/ElieCyberHeader";
import ElieGoldHeader from "../svg/ElieGoldHeader";

export const avatarMapping: Record<string, AvatarName> = {
	Elie: "elie",
	"Elie Pirate": "pirate",
	"Elie Cyber": "cyber",
	"Elie Gold": "gold",
};

export const avatars = {
	elie: {
		elie: ElieHeader,
	},

	pirate: {
		elie: EliePirateHeader,
	},

	cyber: {
		elie: ElieCyberHeader,
	},

	gold: {
		elie: ElieGoldHeader,
	},
};

export type AvatarName = keyof typeof avatars;
