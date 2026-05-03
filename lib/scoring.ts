import type { Plant } from "./plants";
import type { QuizAnswers } from "./quiz-types";

export function calculateScore(plant: Plant, answers: QuizAnswers): number {
  let score = 0;
  if (answers.pets === "yes" && !plant.petSafe) score -= 10;
  return score;
}
