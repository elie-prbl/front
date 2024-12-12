import React from "react";
import { SvgXml } from "react-native-svg";

export default function ThemeIce() {
	const svg = `<svg width="45" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="120" height="100" rx="15" fill="white"/>
<g filter="url(#filter0_d_1680_3495)">
<circle cx="35" cy="50" r="25" fill="#010A5A"/>
<circle cx="60" cy="50" r="25" fill="#4FB2D4"/>
<circle cx="85" cy="50" r="25" fill="white"/>
</g>
<defs>
<filter id="filter0_d_1680_3495" x="5" y="20" width="110" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="2.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1680_3495"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1680_3495" result="shape"/>
</filter>
</defs>
</svg>
`;

	const Svg = () => <SvgXml xml={svg} className="absolute" />;

	return <Svg />;
}
