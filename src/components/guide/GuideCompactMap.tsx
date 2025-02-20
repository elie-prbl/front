import MapView from "react-native-maps";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getTheCurrentPosition } from "../../utils";
import { setPosition } from "../../store/features/Position/PositionSlices";
import { useAppDispatch } from "../../store/hooks";

const GuideCompactMap = () => {
	const dispatch = useAppDispatch();
	const position = useSelector((state: RootState) => state.position.position);

	useEffect(() => {
		getTheCurrentPosition().then(location => {
			if (location) {
				const { latitude, longitude } = location.coords;
				dispatch(setPosition({ latitude, longitude }));
			}
		});
	}, []);

	return (
		<MapView
			className="w-full h-28"
			style={{ borderRadius: 8 }}
			region={{
				latitude: position?.latitude ?? 0,
				longitude: position?.longitude ?? 0,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}
			showsUserLocation
		/>
	);
};

export default GuideCompactMap;
