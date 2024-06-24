export interface Questions {
	question: string;
	good_answer: string;
	answers: string[];
}

export interface QuizData {
	id: number;
	topic: string;
	questions: Questions[];
	title: string;
	current_question: number;
}

export interface DualQuizData {
	type: number;
	type_message: string;
	status: number;
	status_message: string;
	room_id: number;
	quiz_data: QuizData;
	current_question: number;
	timer: number;
}

export enum DualQuizType {
	DualQuiz,
	DualQuizAnswer,
}

export enum DualQuizStatus {
	GameStarting,
	GamePending,
	GameFinished,
	GameRoundStarting,
	GameRoundFinished,
}
