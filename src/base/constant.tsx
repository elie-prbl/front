export class Color {
	static PRIMARY: string = "#58CC02";
	static SECONDARY: string = "#48A106";
	static GREEN_OPACITY: string = "#CBFCCA";
	static WHITE: string = "#FFFFFF";
	static WHITE_OPACITY: string = "#FFFFFFBF";
	static GREY: string = "#CDCCCC";
	static BLACK: string = "#000000";
	static GOLD: string = "#FDE404";
	static YELLOW: string = "#FFD900";
	static PURPLE_LIGHT: string = "#CE82FF";
	static PURPLE_DARK: string = "#A568CC";
	static RED_PALE_LIGHT: string = "#FA6C6C";
	static RED_PALE_DARK: string = "#C85656";
	static PINK_LIGHT: string = "#FF82EB";
	static PINK_DARK: string = "#D36CC1";
	static CYAN_LIGHT: string = "#00CD9C";
	static CYAN_DARK: string = "#00A47D";
	static BLUE_PALE_DARK: string = "#85D8FF";
	static BLUE_PALE_LIGHT: string = "#DCF1FF";
	static BLUE_BRIGHT_DARK: string = "#0C71CF";
	static BLUE_BRIGHT_LIGHT: string = "#01B3FF";
	static RED_BRIGHT_LIGHT: string = "#FF4343";
	static RED_BRIGHT_DARK: string = "#BC0D0D";
	static RED: string = "#EF0C0C";
	static RED_OPACITY: string = "#FDCACA";
	static BLUE: string = "#54B7FF";
}

export class Content {
	// Registration
	static LOGIN: string = "Connexion";
	static SIGN_UP: string = "Inscription";
	static CONTINUE: string = "Continuer";
	static ELIE_LOGIN: string = "Hello, avant de t'amuser, connecte-toi !";
	static LABEL_EMAIL: string = "Email";
	static PLACEHOLDER_EMAIL: string = "johndoe@exemple.fr";
	static LABEL_PASSWORD: string = "Mot de passe";
	static PLACEHOLDER_PASSWORD: string = "•••••••••";
	static LABEL_CONFIRM_PASSWORD: string = "Confirmation du mot de passe";
	static PASSWORD_FORGET: string = "Mot de passe oublié ?";
	static NO_ACCOUNT: string = "Pas encore de compte ? ";
	static NO_ACCOUNT_SIGN_UP: string = "Inscrivez-vous !";
	static LABEL_FIRSTNAME: string = "Prénom";
	static PLACEHOLDER_FIRSTNAME: string = "John";
	static LABEL_LASTNAME: string = "Nom";
	static PLACEHOLDER_LASTNAME: string = "Doe";
	static LABEL_AGE: string = "Âge";
	static PLACEHOLDER_AGE: string = "18";
	static ELIE_SIGNUP_1: string = "Hello, qui es-tu ?";
	static ELIE_SIGNUP_2: string = "Renseigne tes informations complémentaires";
	static ELIE_SIGNUP_3: string = "Bien joué ! Tu as fini ton inscription.";

	//Home
	static HOME_TITLE: string = "Bonjour";
	static HOME_DESCRIPTION: string = "Pour gagner des points réalises des quêtes !";
	static DAILY_QUEST: string = "Quêtes du jour";
	static SHOP: string = "Boutique";
	static GAME: string = "Jeu";
	static MAP: string = "Map";
	static EVENT: string = "Évènement";
	static PROFIL: string = "Profil";

	//Shop
	static SHOP_TITLE: string = "Boutique";
	static SHOP_DESCRIPTION: string = "Ici tu peux dépenser tes rubis !";
	static SHOP_PERSONALISATION: string = "Personnalisation";
	static SHOP_POWER_UP: string = "Power Up";
	static SHOP_POWER_UP_LIFE_TITLE: string = "5 cœurs";
	static SHOP_POWER_UP_LIFE_DESCRIPTION: string = "Vous permet de récuperer de la vie pour jouer aux quiz";
	static SHOP_POWER_UP_BOOST_TITLE: string = "Boost";
	static SHOP_POWER_UP_BOOST_DESCRIPTION: string =
		"Vous permet de réaliser des quiz pendant 20 minutes sans perdre de vie";

	//Quest
	static QUEST_TITLE: string = "Quête";
	static QUEST_DESCRIPTION: string = "Visualises la progression de tes quêtes !";
	static SUCCESS: string = "Succès";
	static SPEND_SHOP: string = "Dépenser ces points";
	static GO_SHOP: string = "Go à la boutique !";

	//Game
	static CHOOSE_MODULE: string = "Choisissez un module";
	static START: string = "Commencer";
	static VALIDATE: string = "Valider";
	static AGREED: string = "D'accord";
	static INCORRECT: string = "Incorrect";
	static SUPER: string = "Super !";
	static LESSON_FINISHED: string = "Leçon terminée !";
	static SUCCESSFUL: string = "Réussite";
	static PRECISION: string = "Précision";
	static SCORE: string = "Score";

	//Game Multiplayer
	static MATCH_MAKING: string = "Matchmaking";
	static WAITING_PLAYER: string = "Recherche d'un joueur...";
	static MATCH: string = "Match trouvé !";
	static WAITING_ANSWER_PLAYER: string = "En attente de votre adversaire...";
	static ANSWER_PLAYER: string = "Votre adversaire a répondu !";
	static ELAPSED_TIME: string = "Dommage, le temps est écoulé pour cette question !";
	static NEXT_QUESTION: string = "La prochaine question va débuter !";
	static DRAW: string = "Égalité !";
	static WINNER: string = "Vous avez gagné !";
	static LOSER: string = "Vous avez perdu !";

	//Dashboard
	static PROFILE: string = "Profil";
	static STATISTICS: string = "Statistiques";
	static LEVEL: string = "Niveau";
	static QUIZZ: string = "Quizs réussis";
	static XP: string = "Total xp";
	static GEMS: string = "Total gems";

	//Elie
	static ELIE: string = "Elie";
	static ELIE_PIRATE: string = "Elie Pirate";
	static ELIE_PIRATE_DESCRIPTION: string = "Personnaliser votre Elie pour partir à la découverte de nouveaux quiz !";
	static ELIE_CYBORG: string = "Elie Cyborg";
	static ELIE_CYBORG_DESCRIPTION: string =
		"Elie devient un cyber compagnon près à vous accompagner dans tous vos quiz !";
	static ELIE_GOLD: string = "Elie Gold";
	static ELIE_GOLD_DESCRIPTION: string = "Prenez la route de la richesse avec Ellie Gold !";

	//Map
	static MAP_TITLE: string = "Carte";
	static MAP_DESCRIPTION: string = "Visualises la carte des lieux de ton choix !";
	static LOAD_POI: string = "Chargement des lieux...";
	static LOAD_POI_ERROR: string = "Erreur lors de la récupération des lieux";
}

export class FontSize {
	static TEXT_XL: string = "text-xl";
	static TEXT_LG: string = "text-lg";
}

export class Url {
	// Commande pour récupérer l'ip dans le termainal : ipconfig getifaddr en0
	static IP: string = "192.168.1.133";
	static LOCALHOST: string = "localhost";
	static BASE_URL_API: string = `http://${Url.IP}:8080/api/v1`;
	static BASE_URL_WS: string = `ws://${Url.IP}:8080/ws`;
}
