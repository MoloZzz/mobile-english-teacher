export type Card = {
  id: string;
  context: string;
  answer: string;
  variations?: string[];
  createdAt: number;
  dueDate: number;
  interval: number;
};
