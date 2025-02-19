import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "../context/ThemeContext";

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	const { BackgroundComponent, themeVariables } = useTheme();

	return (
		<SafeAreaView className="flex-1" style={{ backgroundColor: themeVariables.background }}>
			<BackgroundComponent />
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
				{children}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Layout;
