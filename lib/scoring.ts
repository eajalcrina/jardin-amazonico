import type { Plant } from "./plants";
import type { QuizAnswers } from "./quiz-types";

export function calculateScore(plant: Plant, answers: QuizAnswers): number {
  let score = 0;

  // TYPE
  if (answers.type === "exotic" && plant.tags.type.includes("exotic")) score += 3;
  if (answers.type === "indoor" && plant.tags.type.includes("indoor")) score += 2;
  if (answers.type === "outdoor" && plant.tags.type.includes("outdoor")) score += 2;
  if (answers.type === "air" && plant.tags.type.includes("air")) score += 4;

  // Bonus coherencia exotic + tier S
  if (answers.type === "exotic" && plant.tier === "S") score += 1;

  // SIZE
  if (plant.tags.size.includes(answers.size)) score += 2;

  // CARE
  if (plant.tags.care.includes(answers.care)) score += 2;
  if (answers.care === "none" && plant.tags.care.includes("none")) score += 1;

  // PETS — filtro disqualificante
  if (answers.pets === "yes" && !plant.petSafe) score -= 10;

  // PURPOSE
  if (answers.purpose === "gift" && plant.suitableFor.gift) score += 1;
  if (answers.purpose === "space" && plant.suitableFor.space) score += 1;
  if (answers.purpose === "me" && plant.suitableFor.me) score += 1;

  return score;
}

export function getRecommendations(
  plants: Plant[],
  answers: QuizAnswers,
): Plant[] {
  const scored = plants
    .map((plant) => ({ plant, score: calculateScore(plant, answers) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length < 3) {
    const fallback = plants
      .filter((p) => p.tier === "B")
      .filter((p) => answers.pets === "no" || p.petSafe)
      .slice(0, 3);
    return fallback;
  }

  return scored.slice(0, Math.min(10, scored.length)).map((item) => item.plant);
}
