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
				<BoxComponent title={"Robin Litiere"}>
					<UserDashboardComponent user={""} />
				</BoxComponent>
				<BoxComponent title={"Statistiques"}>
					<StatDashboardComponent />
				</BoxComponent>
				<BoxComponent title={"Elie"}>
					<CustomizeDashboardComponent elie={""} />
				</BoxComponent>
			</ScrollView>
		</>
	);
};

export default Dashboard;
