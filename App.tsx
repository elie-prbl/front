import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
	return (
		<GestureHandlerRootView>
			<Provider store={store}>
				<NavigationContainer>
					<AppNavigator />
				</NavigationContainer>
			</Provider>
		</GestureHandlerRootView>
	);
};

export default App;
