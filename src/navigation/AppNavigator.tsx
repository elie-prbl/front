import React, { useState } from "react";
import {
	NativeStackNavigationProp,
	createNativeStackNavigator,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import Login from "../views/registration/Login";
import SignUp1 from "../views/registration/SignUp1";
import SignUp2 from "../views/registration/SignUp2";
import SignUp3 from "../views/registration/SignUp3";
import TabNavigator from "./TabNavigator";
import GameModule from "../views/game/GameModule";
import { Content } from "../base/constant";

export type StackParamList = {
	TabNav: undefined;
	Login: undefined;
	SignUp1: undefined;
	SignUp2: undefined;
	SignUp3: undefined;
	Home: undefined;
	GameModule: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export type RouteLoginProps = NativeStackScreenProps<StackParamList, "Login">;
export type NavigationLoginProps = NativeStackNavigationProp<StackParamList, "Login">;

export type RouteSignUp1Props = NativeStackScreenProps<StackParamList, "SignUp1">;
export type NavigationSignUp1Props = NativeStackNavigationProp<StackParamList, "SignUp1">;

export type RouteSignUp2Props = NativeStackScreenProps<StackParamList, "SignUp2">;
export type NavigationSignUp2Props = NativeStackNavigationProp<StackParamList, "SignUp2">;

export type RouteHomeProps = NativeStackScreenProps<StackParamList, "Home">;
export type NavigationHomeProps = NativeStackNavigationProp<StackParamList, "Home">;

export type NavigationGameModuleProps = NativeStackNavigationProp<StackParamList, "GameModule">;

const AuthStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTransparent: true,
				headerBackTitleVisible: false,
			}}>
			<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
			<Stack.Screen name="SignUp1" component={SignUp1} options={{ headerTitle: "" }} />
			<Stack.Screen name="SignUp2" component={SignUp2} options={{ headerTitle: "" }} />
			<Stack.Screen name="SignUp3" component={SignUp3} options={{ headerTitle: "" }} />
		</Stack.Navigator>
	);
};

const AppNavigator = (): JSX.Element => {
	const [isLoggedIn, setLoggedIn] = useState(true);

	if (!isLoggedIn) {
		return <AuthStack />;
	}

	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerTransparent: true,
					headerBackTitleVisible: false,
				}}>
				<Stack.Screen name="TabNav" component={TabNavigator} options={{ headerShown: false }} />
				<Stack.Screen
					name="GameModule"
					component={GameModule}
					options={{ presentation: "modal", headerTitle: Content.CHOOSE_MODULE }}
				/>
			</Stack.Navigator>
		</>
	);
};

export default AppNavigator;
