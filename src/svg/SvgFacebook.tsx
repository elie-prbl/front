import React from "react";
import { SvgXml } from "react-native-svg";

export default function SvgFacebook() {
	const facebook = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
  		<path fill-rule="evenodd" clip-rule="evenodd" d="M7.275 21.584V11.739H10.58L11.075 7.902H7.275V5.452C7.275 4.341 7.584 3.584 9.177 3.584L11.209 3.583V0.15C10.857 0.104 9.65 0 8.249 0C5.319 0 3.313 1.788 3.313 5.072V7.902H0V11.739H3.313V21.584H7.275Z" fill="#3C5A99"/>
		</svg>`;

	const Svg = () => <SvgXml xml={facebook} width="100%" height="100%" />;

	return <Svg />;
}
