import React from "react";
import Background from "../../svg/Background";
import UserDashboardComponent from "../../components/dashboard/UserDashboardComponent";
import { ScrollView, Text } from "react-native";
import BoxComponent from "../../base/Box";
import { Content } from "../../base/constant";
import StatDashboardComponent from "../../components/dashboard/StatDashboardComponent";
import CustomizeDashboardComponent from "../../components/dashboard/CustomizeDashboardComponent";

const Dashboard = () => {
	return (
		<>
			<Background />
			<ScrollView>
				<BoxComponent title={"Robin Litiere"} height="h-30">
					<UserDashboardComponent user={""} />
				</BoxComponent>
				<BoxComponent title={"Statistiques"} height="h-50">
					<StatDashboardComponent />
				</BoxComponent>
				<BoxComponent title={"Elie"} height={"h-50"}>
					<CustomizeDashboardComponent elie={""} />
				</BoxComponent>
			</ScrollView>
		</>
	);
};

export default Dashboard;
