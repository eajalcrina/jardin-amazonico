export type QuizPurpose = "me" | "gift" | "space";
export type QuizType = "exotic" | "indoor" | "outdoor" | "air";
export type QuizSize = "small" | "medium" | "large";
export type QuizCare = "none" | "amateur" | "collector";
export type QuizPets = "yes" | "no";

export type QuizAnswers = {
  purpose: QuizPurpose;
  type: QuizType;
  size: QuizSize;
  care: QuizCare;
  pets: QuizPets;
};

export type PartialQuizAnswers = Partial<QuizAnswers>;

export type QuizQuestionId =
  | "purpose"
  | "type"
  | "size"
  | "care"
  | "pets";

export type QuizOption<V extends string = string> = {
  value: V;
  iconLucide: string;
  title: string;
  description: string;
};

export type QuizQuestion = {
  id: QuizQuestionId;
  label: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
};
