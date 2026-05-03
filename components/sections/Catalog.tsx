"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { OptionCard } from "@/components/quiz/OptionCard";
import { PlantCard } from "@/components/catalog/PlantCard";
import { PLANTS } from "@/lib/plants";
import { getRecommendations } from "@/lib/scoring";
import { QUIZ_QUESTIONS } from "@/lib/quiz-questions";
import type { Plant } from "@/lib/plants";
import type { QuizAnswers, PartialQuizAnswers, QuizQuestionId } from "@/lib/quiz-types";

type CatalogProps = {
  onSelectPlant: (plant: Plant) => void;
};

type View = "quiz" | "results" | "all";

export function Catalog({ onSelectPlant }: CatalogProps) {
  const [view, setView] = useState<View>("quiz");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<PartialQuizAnswers>({});

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
      setView("results");
    }
  }

  function back() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  function resetQuiz() {
    setStepIndex(0);
    setAnswers({});
    setView("quiz");
  }

  const visiblePlants = useMemo(() => {
    if (view === "results") {
      return getRecommendations(PLANTS, answers as QuizAnswers);
    }
    return PLANTS;
  }, [view, answers]);

  return (
    <section id="catalogo" className="bg-ja-paper py-14 md:py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          {view === "results" ? "Tu selección personalizada" : "El catálogo"}
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          {view === "results"
            ? "Tus plantas recomendadas"
            : view === "all"
              ? "Todas nuestras plantas, curadas."
              : "Encuentra tu planta ideal."}
        </h2>
        <p className="mt-3 text-ja-ink/70 max-w-2xl">
          {view === "results"
            ? answers.purpose === "gift"
              ? "Perfectas para regalar con impacto y significado."
              : "Curadas según tu espacio, ritmo y nivel de experiencia."
            : view === "all"
              ? "Explora el catálogo completo."
              : "Responde 5 preguntas y te mostramos las plantas que mejor se ajustan a ti."}
        </p>

        {view === "quiz" && (
          <div className="mt-10 max-w-2xl">
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
                <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">{question.label}</p>
                <h3 className="mt-2 font-display text-2xl md:text-3xl text-ja-dark">
                  {question.title}
                </h3>
                <p className="mt-2 text-ja-ink/70">{question.subtitle}</p>

                <div
                  className={[
                    "mt-6 grid gap-3",
                    question.options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
                  ].join(" ")}
                >
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

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" onClick={back} disabled={stepIndex === 0}>
                      ← Atrás
                    </Button>
                    <Button onClick={next} disabled={!currentValue}>
                      {stepIndex === totalSteps - 1 ? "Ver mis plantas →" : "Siguiente →"}
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setView("all")}
                    className="text-sm text-ja-dark underline underline-offset-4 hover:text-ja-mid"
                  >
                    Ver todas las plantas →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {(view === "results" || view === "all") && (
          <>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {view === "results" && (
                <>
                  <span className="text-sm text-ja-ink/70">Filtrado por tu cuestionario</span>
                  <Button variant="secondary" size="sm" onClick={() => setView("all")}>
                    Ver todas las plantas
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm" onClick={resetQuiz}>
                {view === "all" ? "Volver al cuestionario" : "Volver a empezar"}
              </Button>
            </div>
            {visiblePlants.length === 0 ? (
              <div className="mt-12 rounded-3xl border border-dashed border-ja-dark/20 p-12 text-center">
                <p className="font-display text-2xl text-ja-dark">
                  No encontramos plantas con esa combinación.
                </p>
                <p className="mt-2 text-ja-ink/70">Prueba ajustando alguna respuesta.</p>
              </div>
            ) : (
              <div
                aria-live="polite"
                className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visiblePlants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} onSelect={onSelectPlant} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
