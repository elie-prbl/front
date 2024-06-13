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
import Header from "../base/Header";
import { black } from "colorette";

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
					headerRight: () => (
						<Ionicons
							size={30}
							style={{ marginRight: 10 }} // Ajoute une marge de 10 sur tous les côtés
							name="person-circle-outline"
							onPress={() => {
								navigation.navigate("Profile");
							}}
						/>
					),
					headerStyle: {
						height: 130,
						backgroundColor: "#f4511e",
					},
					headerShown: true,
					headerTitle: () => <Header headertext={Content.SHOPHEADER} />,
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
						height: 130,
					},
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
					headerTitle: () => <Header headertext={Content.QUESTHEADER} />,
					headerStyle: {
						height: 130,
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
