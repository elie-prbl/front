import React from "react";
import UserDashboardComponent from "../../components/dashboard/UserDashboardComponent";
import { ScrollView } from "react-native";
import BoxComponent from "../../base/Box";
import StatDashboardComponent from "../../components/dashboard/StatDashboardComponent";
import CustomizeDashboardComponent from "../../components/dashboard/CustomizeDashboardComponent";
import Layout from "../../base/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Content } from "../../base/constant";

const Dashboard = () => {
	const user = useSelector((state: RootState) => state.user.user);
	return (
		<Layout>
			<ScrollView>
				<BoxComponent title={user?.username}>
					<UserDashboardComponent />
				</BoxComponent>
				<BoxComponent title={Content.STATISTICS}>
					<StatDashboardComponent />
				</BoxComponent>
				<BoxComponent title={Content.ELIE}>
					<CustomizeDashboardComponent elie="" />
				</BoxComponent>
			</ScrollView>
		</Layout>
	);
};

export default Dashboard;
