import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Content } from "../base/constant";
import Home from "../views/Home";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Game from "../views/game/Game";
import Shop from "../views/Shop";
import Guide from "../views/Guide";
import Quest from "../views/Quest";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "./AppNavigator";
import { useTheme } from "../context/ThemeContext";
import { useAvatar } from "../context/AvatarContext";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	const navigation = useNavigation<MyNavigationProp>();
	const { themeVariables } = useTheme();
	const { AvatarComponent } = useAvatar();

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: themeVariables.primary,
				tabBarInactiveTintColor: themeVariables.text,
				tabBarStyle: {
					backgroundColor: themeVariables.background,
					borderTopWidth: 0,
				},
			}}>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
					headerStyle: {
						height: 120,
						backgroundColor: themeVariables.background,
					},
					headerTitle: () => (
						<View className="h-full my-2 flex-row">
							<View className="flex-1 justify-evenly">
								<View className="flex-row justify-between">
									<Text style={{ color: themeVariables.text }} className="font-bold text-lg">
										{Content.HOME_TITLE}
									</Text>
								</View>
								<Text style={{ color: themeVariables.text }} className="w-10/12">
									{Content.HOME_DESCRIPTION}
								</Text>
							</View>
							<View className="justify-center">
								<Ionicons
									color={themeVariables.text}
									size={30}
									name="person-circle-outline"
									onPress={() => {
										navigation.navigate("Profile");
									}}
								/>
							</View>
						</View>
					),
					headerTitleContainerStyle: {
						width: "100%",
					},
				}}
			/>
			<Tab.Screen
				name="Game"
				component={Game}
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <Ionicons name="game-controller-outline" size={24} color={color} />,
					headerStyle: {
						height: 120,
						backgroundColor: themeVariables.background,
					},
					headerTitle: () => (
						<View className="h-full my-2">
							<View className="flex-1 justify-evenly">
								<Text style={{ color: themeVariables.text }} className="font-bold text-lg text-center">
									{Content.GAME_TITLE}
								</Text>
								<Text style={{ color: themeVariables.text }} className="w-10/12">
									{Content.GAME_DESCRIPTION}
								</Text>
							</View>
							<AvatarComponent />
						</View>
					),
					headerTitleContainerStyle: {
						width: "100%",
					},
				}}
			/>
			<Tab.Screen
				name="Shop"
				component={Shop}
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" size={24} color={color} />,
					headerStyle: {
						height: 120,
						backgroundColor: themeVariables.background,
					},
					headerTitle: () => (
						<View className="h-full my-2">
							<View className="flex-1 justify-evenly">
								<Text style={{ color: themeVariables.text }} className="font-bold text-lg text-center">
									{Content.SHOP_TITLE}
								</Text>
								<Text style={{ color: themeVariables.text }} className="w-10/12">
									{Content.SHOP_DESCRIPTION}
								</Text>
							</View>
							<AvatarComponent />
						</View>
					),
					headerTitleContainerStyle: {
						width: "100%",
					},
				}}
			/>
			<Tab.Screen
				name="Guide"
				component={Guide}
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <Ionicons name="map-outline" size={24} color={color} />,
					headerStyle: {
						height: 120,
						backgroundColor: themeVariables.background,
					},
					headerTitle: () => (
						<View className="h-full my-2">
							<View className="flex-1 justify-evenly">
								<Text style={{ color: themeVariables.text }} className="font-bold text-lg text-center">
									{Content.GUIDE_TITLE}
								</Text>
								<Text style={{ color: themeVariables.text }} className="w-10/12">
									{Content.GUIDE_DESCRIPTION}
								</Text>
							</View>
							<AvatarComponent />
						</View>
					),
					headerTitleContainerStyle: {
						width: "100%",
					},
				}}
			/>
			<Tab.Screen
				name="Quest"
				component={Quest}
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
					headerStyle: {
						height: 120,
						backgroundColor: themeVariables.background,
					},
					headerTitle: () => (
						<View className="h-full my-2">
							<View className="flex-1 justify-evenly">
								<Text style={{ color: themeVariables.text }} className="font-bold text-lg text-center">
									{Content.QUEST_TITLE}
								</Text>
								<Text style={{ color: themeVariables.text }} className="w-10/12">
									{Content.QUEST_DESCRIPTION}
								</Text>
							</View>
							<AvatarComponent />
						</View>
					),
					headerTitleContainerStyle: {
						width: "100%",
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
