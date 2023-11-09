import React from "react";
import {
	NativeStackNavigationProp,
	createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Home from "../Views/Home";

export type StackParamList = {
	Home: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();
export type MyNavigationProp = NativeStackNavigationProp<StackParamList>;

const AppNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTransparent: true,
				headerBackTitleVisible: false,
			}}>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default AppNavigator;
