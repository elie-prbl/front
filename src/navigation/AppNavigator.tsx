import React from "react";
import {
	NativeStackNavigationProp,
	createNativeStackNavigator,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import Login from "../views/registration/Login";
import SignUp1 from "../views/registration/SignUp1";
import SignUp2 from "../views/registration/SignUp2";

export type StackParamList = {
	Login: undefined;
	SignUp1: undefined;
	SignUp2: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export type RouteSignUp1Props = NativeStackScreenProps<StackParamList, "SignUp1">;
export type NavigationSignUp1Props = NativeStackNavigationProp<StackParamList, "SignUp1">;

export type RouteSignUp2Props = NativeStackScreenProps<StackParamList, "SignUp2">;
export type NavigationSignUp2Props = NativeStackNavigationProp<StackParamList, "SignUp2">;

const AppNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTransparent: true,
				headerBackTitleVisible: false,
			}}>
			<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
			<Stack.Screen name="SignUp1" component={SignUp1} options={{ headerTitle: "" }} />
			<Stack.Screen name="SignUp2" component={SignUp2} options={{ headerTitle: "" }} />
		</Stack.Navigator>
	);
};

export default AppNavigator;
