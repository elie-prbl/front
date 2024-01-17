import React from "react";
import { SvgXml } from "react-native-svg";

export default function Crown() {
	const svg = `<svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6093 1.85845C12.9804 1.13115 14.0196 1.13116 14.3907 1.85845L18.4156 9.74592C18.7285 10.3591 19.553 10.4801 20.0289 9.98271L23.8095 6.03137C24.4852 5.32518 25.6684 5.90791 25.5205 6.87402L23.3521 21.0384C23.2774 21.5266 22.8575 21.8871 22.3637 21.8871H4.63634C4.14249 21.8871 3.72259 21.5266 3.64786 21.0384L1.47948 6.87402C1.33158 5.90791 2.51484 5.32518 3.19051 6.03137L6.97111 9.98271C7.44702 10.4801 8.27149 10.3591 8.58439 9.74592L12.6093 1.85845Z" fill="#FFD900" stroke="#FFD900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.2889 4.12681C13.3301 3.55247 14.0734 3.35326 14.3963 3.83009L16.9866 7.65499C17.2205 8.00042 17.0442 8.47326 16.6413 8.5812L13.7202 9.36388C13.3173 9.47193 12.9282 9.15055 12.9581 8.73452L13.2889 4.12681Z" fill="#FFEF8F"/>
<path d="M2.30494 7.51571C2.26582 6.94119 2.97417 6.64051 3.36034 7.06772L6.4578 10.4949C6.73747 10.8044 6.62869 11.2972 6.24474 11.4602L3.46092 12.6419C3.07698 12.8048 2.64689 12.5407 2.61858 12.1246L2.30494 7.51571Z" fill="#F7C100"/>
</svg>
`;
	const Svg = () => <SvgXml xml={svg} width="100%" height="100%" />;

	return <Svg />;
}