import React from "react";
import { SvgXml } from "react-native-svg";

export default function BackgroundIce() {
	const svg = `
			<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0_1487_3845)">
			<rect width="390" height="844" fill="#153F85"/>
			<ellipse cx="189" cy="155.5" rx="201" ry="229.5" fill="url(#paint0_radial_1487_3845)"/>
			<ellipse cx="105" cy="539" rx="201" ry="227" fill="url(#paint1_radial_1487_3845)"/>
			<ellipse cx="306.5" cy="422" rx="139.5" ry="152" fill="url(#paint2_radial_1487_3845)"/>
			<ellipse cx="306.5" cy="737" rx="101.5" ry="107" fill="url(#paint3_radial_1487_3845)"/>
			</g>
			<defs>
			<radialGradient id="paint0_radial_1487_3845" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(189 155.5) rotate(90) scale(229.5 201)">
			<stop stop-color="#00FFF0" stop-opacity="0.35"/>
			<stop offset="1" stop-color="#54FC8D" stop-opacity="0"/>
			</radialGradient>
			<radialGradient id="paint1_radial_1487_3845" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(105 539) rotate(90) scale(227 201)">
			<stop stop-color="#72FF1B" stop-opacity="0.35"/>
			<stop offset="1" stop-color="#54FC8D" stop-opacity="0"/>
			</radialGradient>
			<radialGradient id="paint2_radial_1487_3845" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(306.5 422) rotate(90.2039) scale(140.501 120.421)">
			<stop stop-color="#A0FCDD" stop-opacity="0.68"/>
			<stop offset="0.09" stop-color="#A0FCDD" stop-opacity="0.85"/>
			<stop offset="1" stop-color="#05FF5A" stop-opacity="0"/>
			</radialGradient>
			<radialGradient id="paint3_radial_1487_3845" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(306.5 737) rotate(90) scale(107 101.5)">
			<stop stop-color="#00FFB3" stop-opacity="0.35"/>
			<stop offset="0.3" stop-color="#10FEAB" stop-opacity="0.2835"/>
			<stop offset="1" stop-color="#54FC8D" stop-opacity="0"/>
			</radialGradient>
			<clipPath id="clip0_1487_3845">
			<rect width="390" height="844" fill="white"/>
			</clipPath>
			</defs>
			</svg>
	`;
	const Svg = () => <SvgXml xml={svg} className="absolute" />;

	return <Svg />;
}
