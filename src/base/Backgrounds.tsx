import BackgroundDark from "../svg/BackgroundDark";
import Background from "../svg/Background";
import BackgroundIce from "../svg/BackgroundIce";

export const backgrounds = {
	light: Background,
	dark: BackgroundDark,
	ice: BackgroundIce,
} as const;
