import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BackgroundProvider } from "./src/context/BackgroundContext";
import { ThemeProvider } from "./src/context/ThemeContext";

const App = () => {
	return (
		<ThemeProvider>
			<BackgroundProvider>
				<GestureHandlerRootView>
					<Provider store={store}>
						<NavigationContainer>
							<AppNavigator />
						</NavigationContainer>
					</Provider>
				</GestureHandlerRootView>
			</BackgroundProvider>
		</ThemeProvider>
	);
};

export default App;
