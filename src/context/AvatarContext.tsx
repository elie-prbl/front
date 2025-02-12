import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AvatarName, avatars } from "../base/Avatar";

interface AvatarContextType {
	avatar: AvatarName;
	AvatarComponent: React.FC;
	setAvatar: (avatar: AvatarName) => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [avatar, setAvatarState] = useState<AvatarName>("elie");

	useEffect(() => {
		const loadAvatar = async () => {
			const storedAvatar = await AsyncStorage.getItem("app_avatar");
			if (storedAvatar && avatars[storedAvatar as AvatarName]) {
				setAvatar(storedAvatar as AvatarName);
			}
		};
		loadAvatar();
	}, []);

	const setAvatar = async (newAvatar: AvatarName) => {
		setAvatarState(newAvatar);
		await AsyncStorage.setItem("app_avatar", newAvatar);
	};

	const contextValue = useMemo(() => {
		const { elie } = avatars[avatar];
		return {
			avatar,
			AvatarComponent: elie,
			setAvatar,
		};
	}, [avatar]);

	return <AvatarContext.Provider value={contextValue}>{children}</AvatarContext.Provider>;
};

export const useAvatar = () => {
	const context = useContext(AvatarContext);
	if (!context) {
		throw new Error("useAvatar must be used within a ThemeProvider");
	}
	return context;
};
