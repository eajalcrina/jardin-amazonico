"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Quiz } from "@/components/sections/Quiz";
import { Footer } from "@/components/sections/Footer";
import type { QuizAnswers } from "@/lib/quiz-types";

export default function Home() {
  const [_quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);

  return (
    <main>
      <Hero />
      <Pillars />
      <Quiz
        onComplete={(a) => setQuizAnswers(a)}
        onReset={() => setQuizAnswers(null)}
      />
      <Footer />
    </main>
  );
}
