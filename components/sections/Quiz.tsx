"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { OptionCard } from "@/components/quiz/OptionCard";
import { QUIZ_QUESTIONS } from "@/lib/quiz-questions";
import type {
  QuizAnswers,
  PartialQuizAnswers,
  QuizQuestionId,
} from "@/lib/quiz-types";

type QuizProps = {
  onComplete: (answers: QuizAnswers) => void;
  onReset: () => void;
};

export function Quiz({ onComplete, onReset }: QuizProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<PartialQuizAnswers>({});
  const [completed, setCompleted] = useState(false);

  const question = QUIZ_QUESTIONS[stepIndex]!;
  const totalSteps = QUIZ_QUESTIONS.length;
  const currentValue = answers[question.id as QuizQuestionId];

  function selectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function next() {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setCompleted(true);
      onComplete(answers as QuizAnswers);
    }
  }

  function back() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  function reset() {
    setStepIndex(0);
    setAnswers({});
    setCompleted(false);
    onReset();
  }

  if (completed) {
    return (
      <section
        id="quiz"
        className="bg-ja-paper py-16 md:py-24"
      >
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
            Tu selección personalizada
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-ja-dark">
            Estas plantas son para ti.
          </h2>
          <p className="mt-3 text-ja-ink/70">
            Curadas según tu espacio, ritmo y nivel de experiencia.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 text-sm text-ja-dark underline underline-offset-4 hover:text-ja-mid"
          >
            Volver a empezar el cuestionario
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="bg-ja-paper py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <ProgressBar total={totalSteps} current={stepIndex} />

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
              {question.label}
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-ja-dark">
              {question.title}
            </h2>
            <p className="mt-2 text-ja-ink/70">{question.subtitle}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {question.options.map((opt) => (
                <OptionCard
                  key={opt.value}
                  iconLucide={opt.iconLucide}
                  title={opt.title}
                  description={opt.description}
                  selected={currentValue === opt.value}
                  onClick={() => selectOption(opt.value)}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={back}
                disabled={stepIndex === 0}
              >
                ← Atrás
              </Button>
              <Button onClick={next} disabled={!currentValue}>
                {stepIndex === totalSteps - 1 ? "Ver mis plantas →" : "Siguiente →"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
