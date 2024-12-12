import React from "react";
import { SvgXml } from "react-native-svg";

export default function ThemeLight() {
	const svg = `<svg width="45" height="70" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1667_3436)">
<circle cx="39" cy="32" r="25" fill="white"/>
<circle cx="64" cy="32" r="25" fill="#28CD41"/>
<circle cx="89" cy="32" r="25" fill="black"/>
</g>
<defs>
<filter id="filter0_d_1667_3436" x="0" y="0" width="120" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="3"/>
<feGaussianBlur stdDeviation="5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1667_3436"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1667_3436" result="shape"/>
</filter>
</defs>
</svg>
`;

	const Svg = () => <SvgXml xml={svg} className="absolute" />;

	return <Svg />;
}
