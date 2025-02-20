import React from "react";
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
import Guide from "../views/Guide";
import GameQuiz from "../views/game/GameQuiz";
import GameQuizScore from "../views/game/GameQuizScore";
import Game from "../views/game/Game";
import GameEcoQuiz from "../views/game/GameEcoQuiz";
import Shop from "../views/Shop";
import Dashboard from "../views/user/Dashboard";
import GameMatchMaking from "../views/game/GameMatchMaking";
import GameDualQuiz from "../views/game/GameDualQuiz";
import GameDualQuizScore from "../views/game/GameDualQuizScore";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useTheme } from "../context/ThemeContext";
import UnityGameWebView from "../views/unityGame/GameUnityMatchMaking";
import GuideFullMap from "../components/guide/GuideFullMap";
import GuideAddEvents from "../components/guide/GuideAddEvents";

export type StackParamList = {
	TabNav: { screen: string };
	Login: undefined;
	SignUp1: undefined;
	SignUp2: undefined;
	SignUp3: undefined;
	Home: undefined;
	Guide: undefined;
	GuideFullMap: undefined;
	GuideAddEvent: undefined;
	Game: undefined;
	GameEcoQuiz: undefined;
	GameModule: undefined;
	GameQuiz: undefined;
	GameQuizScore: { score: number; nbQuestions: number };
	GameDualQuiz: { roomId: number; nameOpponent: string };
	GameDualQuizScore: {
		isDraw: boolean;
		isWinner: boolean;
		myScore: number;
		scorePlayer: number;
		nbQuestions: number;
		nameOpponent: string;
	};
	Shop: undefined;
	Profile: undefined;
	GameMatchMaking: undefined;
	UnityGame: { gameId: number; gameTitle: string };
};

const Stack = createNativeStackNavigator<StackParamList>();
export type MyNavigationProp = NativeStackNavigationProp<StackParamList>;

export type RouteGameScoreProps = NativeStackScreenProps<StackParamList, "GameQuizScore">;
export type NavigationGameScoreProps = NativeStackNavigationProp<StackParamList, "GameQuizScore">;

export type RouteGameDualQuizProps = NativeStackScreenProps<StackParamList, "GameDualQuiz">;
export type NavigationGameDualQuizProps = NativeStackNavigationProp<StackParamList, "GameDualQuiz">;

export type RouteGameDualQuizScoreProps = NativeStackScreenProps<StackParamList, "GameDualQuizScore">;
export type NavigationGameDualQuizScoreProps = NativeStackNavigationProp<StackParamList, "GameDualQuizScore">;

export type RouteCommunityGameProps = NativeStackScreenProps<StackParamList, "UnityGame">;
export type NavigationCommunityGameProps = NativeStackNavigationProp<StackParamList, "UnityGame">;

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
	const isLoggedIn = useSelector((state: RootState) => state.user.user !== null);
	const { themeVariables } = useTheme();

	if (!isLoggedIn) {
		return <AuthStack />;
	}

	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerTransparent: true,
					headerBackTitleVisible: false,
					headerStyle: {
						backgroundColor: themeVariables.background,
					},
				}}>
				<Stack.Screen name="TabNav" component={TabNavigator} options={{ headerShown: false }} />
				<Stack.Screen
					name="GameModule"
					component={GameModule}
					options={{ presentation: "modal", headerTintColor: themeVariables.text, headerTitle: Content.CHOOSE_MODULE }}
				/>
				<Stack.Screen name="Guide" component={Guide} options={{ headerShown: false }} />
				<Stack.Screen
					name="GuideFullMap"
					component={GuideFullMap}
					options={{
						headerShown: true,
						headerTransparent: false,
						headerTitle: Content.MAP,
						headerTintColor: themeVariables.text,
					}}
				/>
				<Stack.Screen
					name="GuideAddEvent"
					component={GuideAddEvents}
					options={{
						headerShown: true,
						headerTitle: Content.ADD_EVENT_TITLE,
						headerTintColor: themeVariables.text,
					}}
				/>
				<Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
				<Stack.Screen
					name="GameEcoQuiz"
					component={GameEcoQuiz}
					options={{ headerShown: true, headerTitle: Content.ECO_QUIZ, headerTintColor: themeVariables.text }}
				/>
				<Stack.Screen name="GameQuiz" component={GameQuiz} options={{ headerShown: false }} />
				<Stack.Screen name="GameDualQuiz" component={GameDualQuiz} options={{ headerShown: false }} />
				<Stack.Screen name="UnityGame" component={UnityGameWebView} options={{ headerShown: false }} />
				<Stack.Screen
					name="GameDualQuizScore"
					component={GameDualQuizScore}
					options={{ headerShown: true, headerTransparent: false, headerTitle: Content.SCORE }}
				/>
				<Stack.Screen
					name="GameQuizScore"
					component={GameQuizScore}
					options={{ headerShown: true, headerTransparent: false, headerTitle: Content.SCORE }}
				/>
				<Stack.Screen name="Shop" component={Shop} options={{ headerShown: false }} />
				<Stack.Screen
					name="Profile"
					component={Dashboard}
					options={{
						headerShown: true,
						headerTransparent: false,
						headerTitle: Content.PROFILE,
						headerTintColor: themeVariables.text,
					}}
				/>
				<Stack.Screen
					name="GameMatchMaking"
					component={GameMatchMaking}
					options={{ headerShown: true, headerTitle: Content.DUAL_QUIZ, headerTintColor: themeVariables.text }}
				/>
			</Stack.Navigator>
		</>
	);
};

export default AppNavigator;
