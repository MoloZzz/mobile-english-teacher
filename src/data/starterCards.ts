type StarterCard = {
  context: string;
  answer: string;
  variations?: string[];
};

const starterCardsData: StarterCard[] = require("./starterCards.json");

export const starterCards = starterCardsData;
