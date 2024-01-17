import React from "react";
import { SvgXml } from "react-native-svg";

export default function Life() {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21" fill="none">
		<path d="M0.0311868 6.36267C1.13098 -0.969269 7.35452 0.378362 11.0806 2.3225C11.602 2.59451 12.2968 2.41676 12.7709 2.06888C14.6084 0.720583 19.0109 -0.237383 21.5312 1.86302C25.7309 5.36292 24.5312 8.86292 21.0312 12.8629L14.5077 18.6186C13.3772 19.6161 11.6824 19.6197 10.5327 18.6444C8.03989 16.5297 5.08337 14.1042 3.5314 12.8628C0.274399 10.2576 -0.13548 7.36263 0.0311868 6.36267Z" fill="#EA5850"/>
		<circle cx="6.53125" cy="6.86292" r="3" fill="#EF807C"/>
	</svg>`;

	const Svg = () => <SvgXml xml={svg} className="h-full w-full" />;

	return <Svg />;
}
