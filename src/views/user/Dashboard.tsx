import React from "react";
import UserDashboardComponent from "../../components/dashboard/UserDashboardComponent";
import { ScrollView } from "react-native";
import BoxComponent from "../../base/Box";
import StatDashboardComponent from "../../components/dashboard/StatDashboardComponent";
import ShopItemsDashboardComponent from "../../components/dashboard/ShopItemsDashboardComponent";
import Layout from "../../base/Layout";
import { Content } from "../../base/constant";
import { Ionicons } from "@expo/vector-icons";

const Dashboard = () => {
	return (
		<Layout>
			<ScrollView>
				<BoxComponent title={Content.INFORMATIONS} itemRight={<Ionicons name="person-circle-outline" size={40} />}>
					<UserDashboardComponent />
				</BoxComponent>
				<BoxComponent title={Content.STATISTICS}>
					<StatDashboardComponent />
				</BoxComponent>
				<ShopItemsDashboardComponent />
			</ScrollView>
		</Layout>
	);
};

export default Dashboard;
