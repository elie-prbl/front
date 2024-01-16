import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Color, FontSize } from "../base/constant";
import Home from "../views/Home";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Game from "../views/game/Game";
import Shop from "../views/Shop";
import Map from "../views/Map";
import Quest from "../views/Quest";
import { Text, View } from "react-native";
import Gem from "../svg/Gem";
import Life from "../svg/Life";
import { useAppSelector } from "../store/hooks";
import ModuleGame from "../base/ModuleGame";
import { useNavigation } from "@react-navigation/core";
import { NavigationGameModuleProps } from "./AppNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	const navigation = useNavigation<NavigationGameModuleProps>();
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
					headerTitle: () => (
						<View className="my-2 justify-center">
							<View className="flex-row justify-between w-full">
								<View className="flex-row items-center">
									<Gem />
									<Text className={`${FontSize.TEXT_XL} ml-1 font-bold`} style={{ color: Color.PRIMARY }}>
										1250
									</Text>
								</View>
								<View className="flex-row items-center">
									<Life />
									<Text className={`${FontSize.TEXT_XL} ml-1 font-bold`} style={{ color: Color.RED_LIGHT }}>
										5
									</Text>
								</View>
							</View>
							<View className="items-center my-3">
								<ModuleGame
									onPress={handleGameModule}
									title={module.name}
									description={module.description}
									icon={<MaterialCommunityIcons name="notebook-multiple" size={24} color="white" />}
								/>
							</View>
						</View>
					),
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
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
