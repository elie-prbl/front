import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Color, Content } from "../base/constant";
import Home from "../views/Home";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Game from "../views/game/Game";
import Shop from "../views/Shop";
import Map from "../views/Map";
import Quest from "../views/Quest";
import { Text, View } from "react-native";
import ElieHeader from "../svg/ElieHeader";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "./AppNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	const navigation = useNavigation<MyNavigationProp>();

	return (
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
					headerStyle: {
						height: 120,
					},
					headerTitle: () => (
						<View className="h-full my-2 flex-row">
							<View className="flex-1 justify-evenly">
								<View className="flex-row justify-between">
									<Text className="font-bold text-lg">{Content.HOME_TITLE}</Text>
								</View>
								<Text className="w-10/12">{Content.HOME_DESCRIPTION}</Text>
							</View>
							<View className="justify-center">
								<Ionicons
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
					headerShown: false,
					headerTransparent: true,
					headerStyle: {
						backgroundColor: Color.WHITE,
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
					},
					headerTitle: () => (
						<View className="h-full my-2">
							<View className="flex-1 justify-evenly">
								<Text className="font-bold text-lg text-center">{Content.SHOP_TITLE}</Text>
								<Text className="w-10/12">{Content.SHOP_DESCRIPTION}</Text>
							</View>
							<ElieHeader />
						</View>
					),
					headerTitleContainerStyle: {
						width: "100%",
					},
				}}
			/>
			<Tab.Screen
				name="Map"
				component={Map}
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <Ionicons name="map-outline" size={24} color={color} />,
					headerStyle: {
						height: 120,
					},
					headerTitle: () => (
						<View className="h-full my-2">
							<View className="flex-1 justify-evenly">
								<Text className="font-bold text-lg text-center">{Content.MAP_TITLE}</Text>
								<Text className="w-10/12">{Content.MAP_DESCRIPTION}</Text>
							</View>
							<ElieHeader />
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
					},
					headerTitle: () => (
						<View className="h-full my-2">
							<View className="flex-1 justify-evenly">
								<Text className="font-bold text-lg text-center">{Content.QUEST_TITLE}</Text>
								<Text className="w-10/12">{Content.QUEST_DESCRIPTION}</Text>
							</View>
							<ElieHeader />
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
