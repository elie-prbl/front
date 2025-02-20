import { createAsyncThunk } from "@reduxjs/toolkit";
import { LatLng } from "react-native-maps/lib/sharedTypes";
import { PlaceI } from "./PlacesSlice";

export class Place {
	id: number = 0;
	name: string = "";
	latitude: number = 0;
	longitude: number = 0;
	road: string = "";
	town: string = "";

	constructor(id: number, name: string, latitude: number, longitude: number, road: string, town: string) {
		this.id = id;
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.road = road;
		this.town = town;
	}
}

export const getPlaces = createAsyncThunk("places/getPlaces", async (currentMapView: LatLng, { rejectWithValue }) => {
	const overpassUrl = "https://overpass-api.de/api/interpreter";
	const query = `
		[out:json];
		(
			node["shop"="organic"](around:2000,${currentMapView.latitude},${currentMapView.longitude});
			node["shop"="health_food"](around:2000,${currentMapView.latitude},${currentMapView.longitude});
			node["shop"="farm"](around:2000,${currentMapView.latitude},${currentMapView.longitude});
			node["shop"="greengrocer"](around:2000,${currentMapView.latitude},${currentMapView.longitude});
			node["amenity"="community_centre"](around:2000,${currentMapView.latitude},${currentMapView.longitude});
			node["amenity"="social_facility"](around:2000,${currentMapView.latitude},${currentMapView.longitude});
			node["sustainability"](around:2000,${currentMapView.latitude},${currentMapView.longitude});
			node["natural"="nature_reserve"](around:2000,${currentMapView.latitude},${currentMapView.longitude});
			node["natural"="protected_area"](around:2000,${currentMapView.latitude},${currentMapView.longitude});
		);
		out body;
	`;

	try {
		const response = await fetch(overpassUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({ data: query }).toString(),
		});

		const data = await response.json();
		const places: Place[] = [];

		if (data.elements) {
			for (const element of data.elements) {
				const placeName = await getPlaceName(element.lat, element.lon);
				const newPlace: PlaceI = {
					id: element.id,
					name: placeName.name || placeName.display_name.split(", ")[1] || "-",
					latitude: element.lat,
					longitude: element.lon,
					road: placeName.address.road || "",
					town: placeName.address.town || "",
				};
				places.push(newPlace);
			}
		}
		return places;
	} catch (err) {
		return rejectWithValue(`network error: ${err}`);
	}
});

export const getPlaceName = async (latitude: number, longitude: number) => {
	const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
	try {
		const response = await fetch(nominatimUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return await response.json();
	} catch (err) {
		throw new Error(`network error name place: ${err}`);
	}
};
