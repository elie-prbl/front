import { createSlice } from "@reduxjs/toolkit";
import { purchaseShopItem } from "./ShopService";

export type Item = any;

const initialState = {
	shop: null as null | Item,
	isLoading: false,
	error: null as null | Item,
};

export const ShopSlice = createSlice({
	name: "Shop",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(purchaseShopItem.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(purchaseShopItem.fulfilled, (state, action) => {
				state.shop = action.payload;
				state.isLoading = false;
			})
			.addCase(purchaseShopItem.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default ShopSlice.reducer;
