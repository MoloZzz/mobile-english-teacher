export type Card = {
  id: string;
  context: string;
  answer: string;
  variations?: string[];

  topic: string;
  source: "starter" | "user";

  createdAt: number;
  dueDate: number;
  interval: number;
};
