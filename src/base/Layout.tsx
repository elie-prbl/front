import { SafeAreaView } from "react-native";
import React, { ReactNode } from "react";
import Background from "../svg/Background";

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<SafeAreaView className="flex-1 p-2">
			<Background />
			{children}
		</SafeAreaView>
	);
};

export default Layout;
