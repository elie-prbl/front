import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";
import { themes, ThemeName } from "../base/Themes";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextType {
	theme: ThemeName;
	themeVariables: typeof themes["light"]["colors"];
	BackgroundComponent: React.FC;
	setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [theme, setThemeState] = useState<ThemeName>("light");

	// Charger le thème depuis AsyncStorage
	useEffect(() => {
		const loadTheme = async () => {
			const storedTheme = await AsyncStorage.getItem("app_theme");
			if (storedTheme && themes[storedTheme as ThemeName]) {
				setThemeState(storedTheme as ThemeName);
			}
		};
		loadTheme();
	}, []);

	// Enregistrer le thème dans AsyncStorage
	const setTheme = async (newTheme: ThemeName) => {
		setThemeState(newTheme);
		await AsyncStorage.setItem("app_theme", newTheme); // Persister le thème
	};

	const contextValue = useMemo(() => {
		const { colors, background } = themes[theme];
		return {
			theme,
			themeVariables: colors,
			BackgroundComponent: background,
			setTheme,
		};
	}, [theme]);

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
