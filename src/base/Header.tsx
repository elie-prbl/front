import { Text, View } from "react-native";
import React from "react";
import ElieHeader from "../svg/ElieHeader";

interface Props {
	headertext: string;
}

const Header = ({ headertext }: Props) => {
	return (
		<View className="mx-1 my-2 bg-black">
			<Text className="font-bold text-lg text-center mb-2">Quêtes</Text>
			<View>
				<Text className=" mb-2">
					{headertext}
				</Text>
				<ElieHeader />
			</View>
		</View>
	);
};

export default Header;
