import { Url } from "../../../base/constant";
import { ApiError } from "../../../utils/ApiError";
import { parseErrorMessage } from "../../../utils/parseErrorMessage";

type Type = {
	id: number;
	name: string;
};

type ShopItem = {
	id: number;
	name: string;
	description: string;
	currency: number;
	type: Type;
};

export type UserShopItem = {
	id: number;
	user_id: string;
	shop_item_id: number;
	shop_item: ShopItem;
};

export const getUserShopItems = async (userUuid: string) => {
	const response = await fetch(`${Url.BASE_URL_API}/shop/items/user/${userUuid}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const responseData = await response.json();

	if (!response.ok) {
		throw new ApiError(parseErrorMessage(responseData.message) || "Une erreur est survenue", response.status);
	}

	const userShopItems: UserShopItem[] = responseData.map((userShopItem: UserShopItem) => {
		const { id, shop_item, shop_item_id, user_id } = userShopItem;

		return {
			id,
			user_id,
			shop_item_id,
			shop_item: {
				id: shop_item.id,
				name: shop_item.name,
				description: shop_item.description,
				currency: shop_item.currency,
				type: {
					id: shop_item.type.id,
					name: shop_item.type.name,
				},
			},
		};
	});

	return userShopItems;
};
