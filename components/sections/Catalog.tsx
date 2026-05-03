"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FilterChips, type CatalogFilters } from "@/components/catalog/FilterChips";
import { PlantCard } from "@/components/catalog/PlantCard";
import { PLANTS } from "@/lib/plants";
import { getRecommendations } from "@/lib/scoring";
import type { Plant } from "@/lib/plants";
import type { QuizAnswers } from "@/lib/quiz-types";

type CatalogProps = {
  quizAnswers: QuizAnswers | null;
  onSelectPlant: (plant: Plant) => void;
};

export function Catalog({ quizAnswers, onSelectPlant }: CatalogProps) {
  const [filters, setFilters] = useState<CatalogFilters>({});
  const [showAll, setShowAll] = useState(false);

  const visiblePlants = useMemo(() => {
    if (quizAnswers && !showAll) {
      return getRecommendations(PLANTS, quizAnswers);
    }
    return PLANTS.filter((p) => {
      if (filters.type && !p.tags.type.includes(filters.type)) return false;
      if (filters.size && !p.tags.size.includes(filters.size)) return false;
      if (filters.care && !p.tags.care.includes(filters.care)) return false;
      if (filters.petSafe && !p.petSafe) return false;
      return true;
    });
  }, [filters, quizAnswers, showAll]);

  const showQuizResults = quizAnswers && !showAll;

  return (
    <section id="catalogo" className="bg-ja-paper py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          {showQuizResults ? "Tu selección personalizada" : "El catálogo"}
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark">
          {showQuizResults
            ? "Tus plantas recomendadas"
            : "Todas nuestras plantas, curadas."}
        </h2>
        <p className="mt-3 text-ja-ink/70 max-w-2xl">
          {showQuizResults
            ? quizAnswers.purpose === "gift"
              ? "Perfectas para regalar con impacto y significado."
              : "Curadas según tu espacio, ritmo y nivel de experiencia."
            : "Filtra por lo que necesitas — o responde el cuestionario para una selección personalizada."}
        </p>

        {showQuizResults ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-sm text-ja-ink/70">
              Filtrado por tu cuestionario
            </span>
            <Button variant="secondary" size="sm" onClick={() => setShowAll(true)}>
              Ver todas las plantas
            </Button>
          </div>
        ) : (
          <div className="mt-8">
            <FilterChips
              value={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
            />
          </div>
        )}

        {visiblePlants.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-ja-dark/20 p-12 text-center">
            <p className="font-display text-2xl text-ja-dark">
              No encontramos plantas con esa combinación.
            </p>
            <p className="mt-2 text-ja-ink/70">
              Prueba ajustando algún filtro.
            </p>
          </div>
        ) : (
          <div
            aria-live="polite"
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visiblePlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onSelect={onSelectPlant}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
