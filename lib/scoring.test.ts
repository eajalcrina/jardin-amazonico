import { describe, it, expect } from "vitest";
import { calculateScore } from "./scoring";
import type { Plant } from "./plants";
import type { QuizAnswers } from "./quiz-types";

const samplePetUnsafe: Plant = {
  id: "TEST-1",
  slug: "test-1",
  name: "Test Plant",
  scientificName: "Testus testus",
  tier: "P",
  iconLucide: "leaf",
  imageUrl: "",
  imageAlt: "",
  tags: { type: ["indoor"], size: ["medium"], care: ["amateur"] },
  petSafe: false,
  suitableFor: { gift: true, space: true, me: true },
  description: "",
  longDescription: "",
  benefit: { iconLucide: "leaf", text: "" },
  care: { light: "", water: "", humidity: "" },
  seasonalWarningLima: null,
  regenerative: {
    priceRange: "",
    pot: "Tierra",
    includes: [],
    labubu: { animal: "", artisan: "", community: "", region: "" },
  },
};

const baseAnswers: QuizAnswers = {
  purpose: "me",
  type: "indoor",
  size: "medium",
  care: "amateur",
  pets: "no",
};

describe("calculateScore", () => {
  it("penalizes -10 when pets=yes and plant is not pet-safe", () => {
    const answers: QuizAnswers = { ...baseAnswers, pets: "yes" };
    const score = calculateScore(samplePetUnsafe, answers);
    expect(score).toBeLessThan(0);
  });
});
