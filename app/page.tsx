"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Quiz } from "@/components/sections/Quiz";
import { Catalog } from "@/components/sections/Catalog";
import { Footer } from "@/components/sections/Footer";
import type { QuizAnswers } from "@/lib/quiz-types";
import type { Plant } from "@/lib/plants";

export default function Home() {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [, setSelectedPlant] = useState<Plant | null>(null);

  return (
    <main>
      <Hero />
      <Pillars />
      <Quiz
        onComplete={(a) => setQuizAnswers(a)}
        onReset={() => setQuizAnswers(null)}
      />
      <Catalog
        quizAnswers={quizAnswers}
        onSelectPlant={setSelectedPlant}
      />
      <Footer />
    </main>
  );
}
