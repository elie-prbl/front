import React from "react";
import ThemeDark from "../svg/ThemeDark";
import ThemeIce from "../svg/ThemeIce";
import ThemeLight from "../svg/ThemeLight";

export const buildTheme = (name: string) => {
	switch (name) {
		case "Dark":
			return <ThemeDark />;
		case "Blue":
			return <ThemeIce />;
		case "Green":
			return <ThemeLight />;
		default:
			return <ThemeLight />;
	}
};
