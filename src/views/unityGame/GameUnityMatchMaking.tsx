import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { Url } from "../../base/constant";
import { CommonActions, useNavigation } from "@react-navigation/core";
import { NavigationCommunityGameProps, RouteCommunityGameProps } from "../../navigation/AppNavigator";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

const UnityGameWebView = ({ route }: RouteCommunityGameProps) => {
	const { gameId, gameTitle } = route.params;
	const navigation = useNavigation<NavigationCommunityGameProps>();
	const { user } = useAppSelector((state: RootState) => state.user);
	const [gameUrl] = useState<string>(`${Url.BASE_URL_GAME_SERVICE}/${gameTitle}/`); // URL du build WebGL de Unity
	const webViewRef = useRef<WebView>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	// Injecter du JavaScript dans la WebView pour envoyer le playerId au jeu Unity
	const injectPlayerIdScript = `
    if (typeof MyGameInstance !== 'undefined' && MyGameInstance !== null) {
      MyGameInstance.SendMessage('ElieTool','SetGameId', ${gameId})
      MyGameInstance.SendMessage('ElieTool','SetPlayerId', '${user?.uuid}')
		 	MyGameInstance.SendMessage('ElieTool','SetMainApiURL', '${Url.BASE_URL_API}')
		 	MyGameInstance.SendMessage('ElieTool','SetGameManagerUrl', '${Url.BASE_URL_GAME_MANAGER}')
    }
    true;
  `;

	// Gestion des messages provenant de la WebView (Unity -> React Native)
	const handleWebViewMessage = (event: WebViewMessageEvent) => {
		const message = JSON.parse(event.nativeEvent.data);
		if (message.status === "loaded") {
			console.log("Game loaded");
			setIsLoaded(true);
		} else if (message.status === "quit") {
			console.log("Game quit");
			setIsLoaded(false);
			navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [{ name: "TabNav", params: { screen: "Home" } }],
				}),
			);
		}
	};

	useEffect(() => {
		if (webViewRef?.current) {
			console.log("Injecting");
			console.log(Url.BASE_URL_GAME_MANAGER);
			webViewRef.current.injectJavaScript(injectPlayerIdScript); // Injecter le playerId au jeu Unity
		}
	}, [isLoaded]);

	return (
		<View style={{ flex: 1 }}>
			<WebView
				ref={webViewRef}
				cacheEnabled={false}
				source={{ uri: gameUrl }}
				style={{ flex: 1 }}
				javaScriptEnabled
				injectedJavaScript={injectPlayerIdScript} // Injecter le playerId au jeu Unity
				onMessage={handleWebViewMessage} // Gestion des messages envoyés par Unity
			/>
		</View>
	);
}

export default UnityGameWebView;
