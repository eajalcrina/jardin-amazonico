import { describe, it, expect } from "vitest";
import { calculateScore, getRecommendations } from "./scoring";
import type { Plant } from "./plants";
import { PLANTS } from "./plants";
import type { QuizAnswers } from "./quiz-types";

const samplePetUnsafe: Plant = {
  id: "TEST-1",
  slug: "test-1",
  name: "Test Plant",
  scientificName: "Testus testus",
  tier: "P",
  iconLucide: "leaf",
  images: [],
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

  it("scores +9 for exotic+S match: type +3, tier S +1, size +2, care +2, purpose me +1", () => {
    const sampleExoticS: Plant = {
      ...samplePetUnsafe,
      id: "TEST-2",
      tier: "S",
      petSafe: true,
      tags: { type: ["exotic", "indoor"], size: ["medium"], care: ["amateur"] },
    };
    const answers: QuizAnswers = { ...baseAnswers, type: "exotic" };
    const score = calculateScore(sampleExoticS, answers);
    expect(score).toBe(9);
  });
});

describe("getRecommendations", () => {
  it("returns between 3 and 10 recommendations", () => {
    const answers: QuizAnswers = {
      purpose: "me",
      type: "indoor",
      size: "medium",
      care: "amateur",
      pets: "no",
    };
    const recs = getRecommendations(PLANTS, answers);
    expect(recs.length).toBeGreaterThanOrEqual(3);
    expect(recs.length).toBeLessThanOrEqual(10);
  });

  it("excludes pet-unsafe plants when user has pets", () => {
    const answers: QuizAnswers = {
      purpose: "me",
      type: "indoor",
      size: "medium",
      care: "amateur",
      pets: "yes",
    };
    const recs = getRecommendations(PLANTS, answers);
    for (const plant of recs) {
      expect(plant.petSafe).toBe(true);
    }
  });

  it("falls back to at least 3 plants when no positive scores", () => {
    const answers: QuizAnswers = {
      purpose: "gift",
      type: "air",
      size: "large",
      care: "collector",
      pets: "no",
    };
    const recs = getRecommendations(PLANTS, answers);
    expect(recs.length).toBeGreaterThanOrEqual(3);
  });

  it("orders results desc by score", () => {
    const answers: QuizAnswers = {
      purpose: "me",
      type: "exotic",
      size: "medium",
      care: "collector",
      pets: "no",
    };
    const recs = getRecommendations(PLANTS, answers);
    const scores = recs.map((p) => calculateScore(p, answers));
    for (let i = 0; i < scores.length - 1; i++) {
      expect(scores[i]!).toBeGreaterThanOrEqual(scores[i + 1]!);
    }
  });
});
