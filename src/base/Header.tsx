import { Text, View } from "react-native";
import React from "react";
import ElieHeader from "../svg/ElieHeader";

interface Props {
	headertext: string;
}

const Header = ({ headertext }: Props) => {
	return (
		<View className="my-2">
			<Text className="font-bold text-lg text-center mb-2">Quêtes</Text>
			<View>
				<Text className="w-11/12 mb-1">
					{headertext}
				</Text>
				<ElieHeader />
			</View>
		</View>
	);
};

export default Header;
