import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "./src/context/ThemeContext";
import { AvatarProvider } from "./src/context/AvatarContext";

const App = () => {
	return (
		<ThemeProvider>
			<AvatarProvider>
				<GestureHandlerRootView>
					<Provider store={store}>
						<NavigationContainer>
							<AppNavigator />
						</NavigationContainer>
					</Provider>
				</GestureHandlerRootView>
			</AvatarProvider>
		</ThemeProvider>
	);
};

export default App;
