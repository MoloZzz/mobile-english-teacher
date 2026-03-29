export function classifyAnswer(
  userInput: string,
  correctAnswer: string,
): "correct" | "almost" | "wrong" {
  // Normalize: lowercase, trim, remove punctuation
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, "");

  const user = normalize(userInput);
  const correct = normalize(correctAnswer);

  // Split into words, filter empty
  const userWords = new Set(user.split(/\s+/).filter((w) => w));
  const correctWords = new Set(correct.split(/\s+/).filter((w) => w));

  // Intersection and union
  const intersection = new Set(
    [...userWords].filter((w) => correctWords.has(w)),
  );
  const union = new Set([...userWords, ...correctWords]);

  // Word overlap ratio
  const ratio = union.size === 0 ? 0 : intersection.size / union.size;

  // Classify
  if (ratio >= 0.85) return "correct";
  if (ratio >= 0.6) return "almost";
  return "wrong";
}
