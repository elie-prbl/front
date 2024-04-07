import { w3cwebsocket as WebSocketClient } from "websocket";

class WebSocketSingleton {
	private static instance: WebSocketSingleton;
	private ws: WebSocketClient | null = null;

	private constructor() {}

	public static getInstance(): WebSocketSingleton {
		if (!WebSocketSingleton.instance) {
			WebSocketSingleton.instance = new WebSocketSingleton();
		}
		return WebSocketSingleton.instance;
	}

	public connectWebSocket(url: string): void {
		this.ws = new WebSocketClient(url);

		this.ws.onopen = () => {
			console.log("Connected to WebSocket server");
		};

		this.ws.onclose = () => {
			console.log("WebSocket connection closed");
		};

		this.ws.onerror = error => {
			console.error("WebSocket error:", error);
		};

		this.ws.onmessage = event => {
			console.log("Received message:", event.data);
			// Insérez votre logique de traitement des messages ici
		};
	}

	public getWebSocket(url: string): WebSocketClient {
		if (!this.ws) {
			this.connectWebSocket(url);
		}
		return this.ws as WebSocketClient;
	}
}

export default WebSocketSingleton;
