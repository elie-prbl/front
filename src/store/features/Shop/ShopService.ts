import { Url } from "../../../base/constant";

export enum TypeName {
	AVATAR = "avatar",
	POWER_UP = "powerUp",
	THEME = "theme",
}

type Type = {
	id: number;
	name: string;
};

export type ShopItem = {
	id: number;
	name: string;
	description: string;
	currency: number;
	type_id: number;
	type: Type;
};

export const getShopItems = async (type?: TypeName) => {
	const response = await fetch(`${Url.BASE_URL_API}/shop/items?type=${type}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const res = await response.json();

	const items: ShopItem[] = res.map((item: ShopItem) => {
		return {
			id: item.id,
			name: item.name,
			description: item.description,
			currency: item.currency,
			type_id: item.type_id,
			type: item.type,
		};
	});

	return items;
};
