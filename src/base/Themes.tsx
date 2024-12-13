import { Color } from "./constant";
import Background from "../svg/Background";
import BackgroundDark from "../svg/BackgroundDark";
import BackgroundIce from "../svg/BackgroundIce";

export const themeMapping: Record<string, ThemeName> = {
	"Theme Dark": "dark",
	"Theme Green": "light",
	"Theme Blue": "ice",
};

export const themes = {
	light: {
		colors: {
			primary: Color.PRIMARY,
			secondary: Color.SECONDARY,
			background: Color.WHITE,
			text: Color.BLACK,
			borderColor: Color.GREY,
		},
		background: Background,
	},

	dark: {
		colors: {
			primary: Color.PRIMARY,
			secondary: Color.BLACK,
			background: Color.DARK_BLUE,
			text: Color.WHITE,
			borderColor: Color.DARK_BLUE_BORDER,
		},
		background: BackgroundDark,
	},

	ice: {
		colors: {
			primary: Color.SKY,
			secondary: Color.BLUE_PALE_DARK,
			background: Color.MARINE,
			text: Color.WHITE,
			borderColor: Color.DARK_BLUE_BORDER,
		},
		background: BackgroundIce,
	},
};

export type ThemeName = keyof typeof themes;
