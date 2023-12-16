import React from "react";
import {
	NativeStackNavigationProp,
	createNativeStackNavigator,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import Login from "../views/Login";
import SignUp1 from "../views/SignUp1";

export type StackParamList = {
	Login: undefined;
	SignUp1: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export type RouteSignUp1Props = NativeStackScreenProps<StackParamList, "SignUp1">;
export type NavigationSignUp1Props = NativeStackNavigationProp<StackParamList, "SignUp1">;

const AppNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTransparent: true,
				headerBackTitleVisible: false,
			}}>
			<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
			<Stack.Screen name="SignUp1" component={SignUp1} options={{ headerTitle: "" }} />
		</Stack.Navigator>
	);
};

export default AppNavigator;
