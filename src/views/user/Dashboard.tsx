import React from "react";
import UserDashboardComponent from "../../components/dashboard/UserDashboardComponent";
import { ScrollView } from "react-native";
import BoxComponent from "../../base/Box";
import StatDashboardComponent from "../../components/dashboard/StatDashboardComponent";
import CustomizeDashboardComponent from "../../components/dashboard/CustomizeDashboardComponent";
import Layout from "../../base/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Dashboard = () => {
	const user = useSelector((state: RootState) => state.user.user);
	return (
		<Layout>
			<ScrollView>
				<BoxComponent title={user?.username}>
					<UserDashboardComponent />
				</BoxComponent>
				<BoxComponent title="Statistiques">
					<StatDashboardComponent />
				</BoxComponent>
				<BoxComponent title="Elie">
					<CustomizeDashboardComponent elie="" />
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default Dashboard;
