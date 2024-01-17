import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Color } from "../base/constant";
import Home from "../views/Home";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Game from "../views/game/Game";
import Shop from "../views/Shop";
import Map from "../views/Map";
import Quest from "../views/Quest";
import { Text, View } from "react-native";
import ElieHeader from "../svg/ElieHeader";
import { useAppSelector } from "../store/hooks";
import { useNavigation } from "@react-navigation/core";
import { MyNavigationProp, StackParamList } from "./AppNavigator";
import GameHeaderComponent from "../components/game/GameHeaderComponent";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	const navigation = useNavigation<MyNavigationProp>();
	const module = useAppSelector(state => state.quizModules.modules[0]);

	const handleGameModule = () => {
		navigation.navigate("GameModule");
	};

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
							style={{ margin: 10 }} // Ajoute une marge de 10 sur tous les côtés
							name="person-circle-outline"
							onPress={() => {
								navigation.push("Profil");
							}}
						/>
					),
					headerShown: true,
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
					headerTitle: () => <GameHeaderComponent onPress={handleGameModule} module={module} />,
					headerStyle: {
						height: 220,
					},
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
					headerTitle: () => (
						<View className="my-2">
							<Text className="font-bold text-lg text-center mb-2">Quêtes</Text>
							<View>
								<Text className="w-10/12 mb-2">
									Visualises la progression de tes quêtes et dépenses tes points gagnés !
								</Text>
								<ElieHeader />
							</View>
						</View>
					),
					headerStyle: {
						height: 130,
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
