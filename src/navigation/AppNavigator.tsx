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
import Map from "../views/Map";
import GameQuiz from "../views/game/GameQuiz";
import GameQuizScore from "../views/game/GameQuizScore";
import Game from "../views/game/Game";
import Shop from "../views/Shop";
import Dashboard from "../views/user/Dashboard";
import GameMatchMaking from "../views/game/GameMatchMaking";
import GameDualQuiz from "../views/game/GameDualQuiz";
import GameDualQuizScore from "../views/game/GameDualQuizScore";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export type StackParamList = {
	TabNav: { screen: string };
	Login: undefined;
	SignUp1: undefined;
	SignUp2: undefined;
	SignUp3: undefined;
	Home: undefined;
	Map: undefined;
	Game: undefined;
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
};

const Stack = createNativeStackNavigator<StackParamList>();
export type MyNavigationProp = NativeStackNavigationProp<StackParamList>;

export type RouteGameScoreProps = NativeStackScreenProps<StackParamList, "GameQuizScore">;
export type NavigationGameScoreProps = NativeStackNavigationProp<StackParamList, "GameQuizScore">;

export type RouteGameDualQuizProps = NativeStackScreenProps<StackParamList, "GameDualQuiz">;
export type NavigationGameDualQuizProps = NativeStackNavigationProp<StackParamList, "GameDualQuiz">;

export type RouteGameDualQuizScoreProps = NativeStackScreenProps<StackParamList, "GameDualQuizScore">;
export type NavigationGameDualQuizScoreProps = NativeStackNavigationProp<StackParamList, "GameDualQuizScore">;

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
				<Stack.Screen name="GameDualQuiz" component={GameDualQuiz} options={{ headerShown: false }} />
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
					}}
				/>
				<Stack.Screen name="GameMatchMaking" component={GameMatchMaking} options={{ headerShown: false }} />
			</Stack.Navigator>
		</>
	);
};

export default AppNavigator;
