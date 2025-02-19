import React from "react";
import { SvgXml } from "react-native-svg";

export default function Add() {
	const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 2V22M22 12H2" stroke="white" stroke-width="3" stroke-linecap="round"/>
		</svg>`;

	const Svg = () => <SvgXml xml={svg} className="absolute" />;

	return <Svg />;
}
