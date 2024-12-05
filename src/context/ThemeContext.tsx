import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { light, dark } from "../base/Themes"; // Import des thèmes définis

type Theme = "light" | "dark"; // Types de thèmes possibles

interface ThemeContextType {
	theme: Theme;
	themeVariables: typeof light; // Variables du thème actuel
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>("light"); // Thème par défaut

	// Choisir dynamiquement les variables du thème en fonction du thème actuel
	const themeVariables = useMemo(() => {
		return theme === "light" ? light : dark;
	}, [theme]);

	// Fonction pour changer de thème
	const changeTheme = (theme: Theme) => {
		setTheme(theme);
	};

	return (
		<ThemeContext.Provider value={{ theme, themeVariables, setTheme: changeTheme }}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within ThemeProvider");
	return context;
};
