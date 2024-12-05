import { SafeAreaView } from "react-native";
import React, { ReactNode } from "react";
import { useBackground } from "../context/BackgroundContext";

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	const { BackgroundComponent } = useBackground();

	return (
		<SafeAreaView className="flex-1 p-2">
			{BackgroundComponent}
			{children}
		</SafeAreaView>
	);
};

export default Layout;
