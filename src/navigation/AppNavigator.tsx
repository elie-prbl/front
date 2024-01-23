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
import Map from "../views/Map";
import GameQuiz from "../views/game/GameQuiz";
import GameScore from "../views/game/GameScore";
import Game from "../views/game/Game";
import Shop from "../views/Shop";
import Dashboard from "../views/user/Dashboard";

export type StackParamList = {
	TabNav: undefined;
	Login: undefined;
	SignUp1: undefined;
	SignUp2: undefined;
	SignUp3: undefined;
	Home: undefined;
	Map: undefined;
	Game: { selectedModuleId: number };
	GameModule: undefined;
	GameQuiz: { qid: number };
	GameScore: { qid: number; score: number; nbQuestions: number };
	Shop: undefined;
	Profil: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();
export type MyNavigationProp = NativeStackNavigationProp<StackParamList>;

export type RouteLoginProps = NativeStackScreenProps<StackParamList, "Login">;
export type NavigationLoginProps = NativeStackNavigationProp<StackParamList, "Login">;

export type RouteSignUp1Props = NativeStackScreenProps<StackParamList, "SignUp1">;
export type NavigationSignUp1Props = NativeStackNavigationProp<StackParamList, "SignUp1">;

export type RouteSignUp2Props = NativeStackScreenProps<StackParamList, "SignUp2">;
export type NavigationSignUp2Props = NativeStackNavigationProp<StackParamList, "SignUp2">;

export type RouteHomeProps = NativeStackScreenProps<StackParamList, "Home">;
export type NavigationHomeProps = NativeStackNavigationProp<StackParamList, "Home">;

export type RouteGameProps = NativeStackScreenProps<StackParamList, "Game">;
export type NavigationGameProps = NativeStackNavigationProp<StackParamList, "Game">;

export type RouteGameQuizProps = NativeStackScreenProps<StackParamList, "GameQuiz">;
export type NavigationGameQuizProps = NativeStackNavigationProp<StackParamList, "GameQuiz">;

export type RouteGameScoreProps = NativeStackScreenProps<StackParamList, "GameScore">;
export type NavigationGameScoreProps = NativeStackNavigationProp<StackParamList, "GameScore">;

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
				<Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
				<Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
				<Stack.Screen name="GameQuiz" component={GameQuiz} options={{ headerShown: false }} />
				<Stack.Screen name="GameScore" component={GameScore} options={{ headerShown: false }} />
				<Stack.Screen name="Shop" component={Shop} options={{ headerShown: false }} />
				<Stack.Screen
					name="Profil"
					component={Dashboard}
					options={{
						headerShown: true,
						headerTransparent: false,
					}}
				/>
			</Stack.Navigator>
		</>
	);
};

export default AppNavigator;
