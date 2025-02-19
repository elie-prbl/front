import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { Url } from "../../base/constant";
import { CommonActions, useNavigation } from "@react-navigation/core";
import { MyNavigationProp } from "../../navigation/AppNavigator";

const UnityGameWebView: React.FC = () => {
	const navigation = useNavigation<MyNavigationProp>();
	const [playerId] = useState<string>("player_15");
	const [gameUrl] = useState<string>(`${Url.BASE_URL_GAME_SERVICE}ElieGameTest/`); // URL du build WebGL de Unity
	const webViewRef = useRef<WebView>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	// Injecter du JavaScript dans la WebView pour envoyer le playerId au jeu Unity
	const injectPlayerIdScript = `
		console.log('injectPlayerIdScript');
    if (typeof MyGameInstance !== 'undefined' && MyGameInstance !== null) {
      MyGameInstance.SendMessage('Canvas','SetPlayerId', '${playerId}')
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
};

export default UnityGameWebView;
