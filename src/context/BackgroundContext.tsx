import React, { createContext, useContext, useState, ReactNode } from "react";
import Background from "../svg/Background";
import BackgroundDark from "../svg/BackgroundDark";

// Exemple de configuration de backgrounds associés aux thèmes
const backgrounds = {
	light: <Background />,
	dark: <BackgroundDark />,
};

type BackgroundContextType = {
	BackgroundComponent: ReactNode;
	setBackground: (key: keyof typeof backgrounds) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [BackgroundComponent, setBackgroundComponent] = useState<ReactNode>(backgrounds.light); // Fond par défaut

	const setBackground = (key: keyof typeof backgrounds) => {
		setBackgroundComponent(backgrounds[key]);
	};

	return (
		<BackgroundContext.Provider value={{ BackgroundComponent, setBackground }}>{children}</BackgroundContext.Provider>
	);
};

export const useBackground = () => {
	const context = useContext(BackgroundContext);
	if (!context) throw new Error("useBackground must be used within BackgroundProvider");
	return context;
};
