import React, { useState } from "react";
import {
	NativeStackNavigationProp,
	createNativeStackNavigator,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../views/registration/Login";
import SignUp1 from "../views/registration/SignUp1";
import SignUp2 from "../views/registration/SignUp2";
import SignUp3 from "../views/registration/SignUp3";
import Home from "../views/Home";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { Color } from "../base/constant";
import Game from "../views/Game";
import Shop from "../views/Shop";
import Map from "../views/Map";
import Quest from "../views/Quest";

export type StackParamList = {
	Login: undefined;
	SignUp1: undefined;
	SignUp2: undefined;
	SignUp3: undefined;
	Home: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<StackParamList>();

export type RouteLoginProps = NativeStackScreenProps<StackParamList, "Login">;
export type NavigationLoginProps = NativeStackNavigationProp<StackParamList, "Login">;

export type RouteSignUp1Props = NativeStackScreenProps<StackParamList, "SignUp1">;
export type NavigationSignUp1Props = NativeStackNavigationProp<StackParamList, "SignUp1">;

export type RouteSignUp2Props = NativeStackScreenProps<StackParamList, "SignUp2">;
export type NavigationSignUp2Props = NativeStackNavigationProp<StackParamList, "SignUp2">;

export type RouteHomeProps = NativeStackScreenProps<StackParamList, "Home">;
export type NavigationHomeProps = NativeStackNavigationProp<StackParamList, "Home">;

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

	return (
		<>
			{isLoggedIn ? (
				<Tab.Navigator
					screenOptions={{
						tabBarActiveTintColor: Color.PRIMARY,
						tabBarInactiveTintColor: Color.BLACK,
					}}>
					<Tab.Screen
						name="Home"
						component={Home}
						options={{
							tabBarShowLabel: false,
							tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
						}}
					/>
					<Tab.Screen
						name="Game"
						component={Game}
						options={{
							tabBarShowLabel: false,
							tabBarIcon: ({ color }) => <Ionicons name="game-controller-outline" size={24} color={color} />,
						}}
					/>
					<Tab.Screen
						name="Shop"
						component={Shop}
						options={{
							tabBarShowLabel: false,
							tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" size={24} color={color} />,
						}}
					/>
					<Tab.Screen
						name="Map"
						component={Map}
						options={{
							tabBarShowLabel: false,
							tabBarIcon: ({ color }) => <Ionicons name="map-outline" size={24} color={color} />,
						}}
					/>
					<Tab.Screen
						name="Quest"
						component={Quest}
						options={{
							tabBarShowLabel: false,
							tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
						}}
					/>
				</Tab.Navigator>
			) : (
				<AuthStack />
			)}
		</>
	);
};

export default AppNavigator;
