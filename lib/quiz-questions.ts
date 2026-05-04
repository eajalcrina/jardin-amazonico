import type { QuizQuestion } from "./quiz-types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "purpose",
    label: "Paso 1 de 5",
    title: "¿Para quién es la planta?",
    subtitle: "Esto nos ayuda a ajustar la selección y la narrativa del regalo.",
    options: [
      { value: "me", iconLucide: "leaf", title: "Para mí", description: "Quiero crecer mi colección o empezar una" },
      { value: "gift", iconLucide: "gift", title: "Para regalar", description: "Busco algo especial para alguien" },
      { value: "space", iconLucide: "home", title: "Para mi espacio", description: "Quiero decorar una habitación u oficina" },
    ],
  },
  {
    id: "type",
    label: "Paso 2 de 5",
    title: "¿Qué tipo de planta buscas?",
    subtitle: "Elige la que más conecta con lo que tienes en mente.",
    options: [
      { value: "exotic", iconLucide: "sparkles", title: "Exótica / Colección", description: "Plantas raras, de alto impacto, para coleccionistas" },
      { value: "indoor", iconLucide: "flower-2", title: "Interior", description: "Verde para adentro, resistente y decorativa" },
      { value: "outdoor", iconLucide: "sun", title: "Exterior", description: "Plantas para balcón, jardín o mucha luz" },
    ],
  },
  {
    id: "size",
    label: "Paso 3 de 5",
    title: "¿Qué tamaño buscas?",
    subtitle: "El tamaño define la presencia visual en el espacio.",
    options: [
      { value: "small", iconLucide: "sprout", title: "Pequeña", description: "Cabe en un escritorio o repisa" },
      { value: "medium", iconLucide: "leaf", title: "Mediana", description: "Tiene presencia pero no ocupa mucho" },
      { value: "large", iconLucide: "tree-pine", title: "Grande", description: "Protagonista del espacio, impacto total" },
    ],
  },
  {
    id: "care",
    label: "Paso 4 de 5",
    title: "¿Cuánto tiempo tienes para cuidarla?",
    subtitle: "Sé honesto — ¡las plantas te lo agradecerán!",
    options: [
      { value: "none", iconLucide: "clock", title: "Casi ninguno", description: "Quiero algo que sobreviva con olvido" },
      { value: "amateur", iconLucide: "flower", title: "Un poco", description: "Puedo regarla y darle algo de atención" },
      { value: "collector", iconLucide: "microscope", title: "Soy entusiasta", description: "Disfruto cuidar y aprender de mis plantas" },
    ],
  },
  {
    id: "pets",
    label: "Paso 5 de 5",
    title: "¿Tienes mascotas en casa?",
    subtitle: "Algunas plantas son tóxicas para gatos y perros.",
    options: [
      { value: "no", iconLucide: "house", title: "No tengo mascotas", description: "Todas las opciones están disponibles" },
      { value: "yes", iconLucide: "paw-print", title: "Sí tengo mascotas", description: "Filtraremos solo plantas seguras" },
    ],
  },
];
