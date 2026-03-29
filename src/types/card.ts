export type Card = {
  id: string;
  context: string;
  answer: string;
  variations?: string[];

  topic: string;
  source: "starter" | "user";

  isLearned: boolean;

  createdAt: number;
  dueDate: number;
  interval: number;
};

export type Attempt = {
  id: string;
  cardId: string;
  topic: string;

  userInput: string;
  correctAnswer: string;

  result: "correct" | "almost" | "wrong";

  timestamp: number;
};
