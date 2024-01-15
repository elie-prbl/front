import React from "react";
import { SvgXml } from "react-native-svg";

export default function Background() {
	const svg = `<svg width="500" height="844" viewBox="0 0 500 844" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_606_2030)">
    <rect width="500" height="844" fill="#FAF9F9"/>
    <ellipse cx="189" cy="155.5" rx="201" ry="229.5" fill="url(#paint0_radial_606_2030)"/>
    <ellipse cx="105" cy="539" rx="201" ry="227" fill="url(#paint1_radial_606_2030)"/>
    <ellipse cx="306.5" cy="422" rx="139.5" ry="152" fill="url(#paint2_radial_606_2030)"/>
    <ellipse cx="306.5" cy="737" rx="101.5" ry="107" fill="url(#paint3_radial_606_2030)"/>
    </g>
    <defs>
    <radialGradient id="paint0_radial_606_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(189 155.5) rotate(90) scale(229.5 201)">
    <stop stop-color="#00FFF0" stop-opacity="0.35"/>
    <stop offset="1" stop-color="#54FC8D" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="paint1_radial_606_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(105 539) rotate(90) scale(227 201)">
    <stop stop-color="#72FF1B" stop-opacity="0.35"/>
    <stop offset="1" stop-color="#54FC8D" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="paint2_radial_606_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(306.5 422) rotate(90) scale(152 139.5)">
    <stop stop-color="#00FF57" stop-opacity="0.35"/>
    <stop offset="1" stop-color="#54FC8D" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="paint3_radial_606_2030" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(306.5 737) rotate(90) scale(107 101.5)">
    <stop stop-color="#00FFB3" stop-opacity="0.35"/>
    <stop offset="1" stop-color="#54FC8D" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="clip0_606_2030">
    <rect width="500" height="844" fill="white"/>
    </clipPath>
    </defs>
  </svg>`;

	const Svg = () => <SvgXml xml={svg} className="absolute" />;

	return <Svg />;
}
