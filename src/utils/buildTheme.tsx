import { Content } from "../base/constant";

import React from "react";
import ThemeDark from "../svg/ThemeDark";
import ThemeIce from "../svg/ThemeIce";
import ThemeLight from "../svg/ThemeLight";


export const buildTheme = (name: string) => {
	switch (name) {
		case "Theme Dark":
			return <ThemeDark />;
		case "Theme Blue":
			return <ThemeIce />;
		case "Theme Green":
			return <ThemeLight />;
		default:
			return <ThemeLight />;
	}
};
