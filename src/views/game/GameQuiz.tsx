import React from "react";
import { Text } from "react-native";
import { RouteGameQuizProps } from "../../navigation/AppNavigator";
import Layout from "../../base/Layout";

const GameQuiz = ({ route }: RouteGameQuizProps) => {
	const { qid } = route.params;

	return (
		<Layout>
			<Text>Quiz {qid + 1}</Text>
		</Layout>
	);
};

export default GameQuiz;
