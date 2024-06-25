import { Url } from "../../../base/constant";

export const getUserOpponent = async (uuid: string) => {
	const response = await fetch(`${Url.BASE_URL_API}/users/${uuid}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	try {
		return await response.json();
	} catch (err) {
		return console.log(`network error: ${err}`);
	}
};
