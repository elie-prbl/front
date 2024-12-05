import React, { useState } from "react";
import Layout from "../base/Layout";
import GuideCompactMap from "../components/guide/GuideCompactMap";
import { Content } from "../base/constant";
import BoxComponent from "../base/Box";
import GuideTabs, { Tab } from "../components/guide/GuideTabs";

const Guide = () => {
	const [activeTab, setActiveTab] = useState<Tab>(Tab.EVENTS);

	const handleDisplayEvents = () => {
		setActiveTab(Tab.EVENTS);
	};

	const handleDisplayPoi = () => {
		setActiveTab(Tab.POI);
	};

	return (
		<Layout>
			<BoxComponent title={Content.MAP} height="h-48" onPress={() => {}}>
				<GuideCompactMap />
			</BoxComponent>
			<GuideTabs
				activeTab={activeTab}
				onPressEvent={() => handleDisplayEvents()}
				onPressPoi={() => handleDisplayPoi()}
			/>
		</Layout>
	);
};

export default Guide;
