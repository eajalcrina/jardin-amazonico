# Jardín Amazónico — Especificación Técnica: Cuestionario de Recomendación de Plantas

> **Propósito de este documento:** Especificación completa para implementar el cuestionario interactivo de recomendación de plantas de Jardín Amazónico. Incluye estructura de datos, lógica de negocio, algoritmo de scoring y especificación de UI. Diseñado para ser implementado con Claude Code o cualquier stack web moderno.

---

## 1. Resumen del Componente

| Atributo | Valor |
|---|---|
| Nombre del componente | `PlantQuiz` |
| Ubicación en la web | Sección `/regalos` — embebido como sección destacada |
| Función principal | Recomendar 3–5 plantas del portafolio según perfil del usuario |
| Flujo | 5 pasos secuenciales → resultados con fichas de planta |
| Opciones de compra por planta | 2 (Básica y Regenerativa) |
| Interacción post-resultado | Botones CTA que redirigen a WhatsApp o al carrito |

---

## 2. Flujo de Usuario

```
[Inicio] 
    ↓
[Paso 1] ¿Para quién es la planta? (propósito)
    ↓
[Paso 2] ¿Qué tipo de planta buscas? (tipo)
    ↓
[Paso 3] ¿Qué tamaño buscas? (tamaño)
    ↓
[Paso 4] ¿Cuánto tiempo tienes para cuidarla? (nivel de cuidado)
    ↓
[Paso 5] ¿Tienes mascotas en casa? (filtro de seguridad)
    ↓
[Algoritmo de scoring] → selecciona top 3–5 plantas
    ↓
[Pantalla de resultados] → fichas de planta + opciones de compra
    ↓
[CTA] → WhatsApp / carrito / catálogo completo
```

**Comportamiento de navegación:**
- Una pregunta visible a la vez
- Botón "Siguiente" se activa solo cuando hay una opción seleccionada
- Botón "Atrás" disponible desde el paso 2 en adelante
- Barra de progreso visible en todos los pasos
- Al llegar a resultados, la barra de progreso desaparece

---

## 3. Estructura de Datos — Preguntas

### 3.1 Paso 1 — Propósito

```json
{
  "id": "purpose",
  "label": "Paso 1 de 5",
  "title": "¿Para quién es la planta?",
  "subtitle": "Esto nos ayuda a ajustar la selección y la narrativa del regalo.",
  "options": [
    {
      "value": "me",
      "icon": "🌿",
      "title": "Para mí",
      "description": "Quiero crecer mi colección o empezar una"
    },
    {
      "value": "gift",
      "icon": "🎁",
      "title": "Para regalar",
      "description": "Busco algo especial para alguien"
    },
    {
      "value": "space",
      "icon": "🏠",
      "title": "Para mi espacio",
      "description": "Quiero decorar una habitación u oficina"
    }
  ]
}
```

### 3.2 Paso 2 — Tipo de planta

```json
{
  "id": "type",
  "label": "Paso 2 de 5",
  "title": "¿Qué tipo de planta buscas?",
  "subtitle": "Elige la que más conecta con lo que tienes en mente.",
  "options": [
    {
      "value": "exotic",
      "icon": "🦋",
      "title": "Exótica / Colección",
      "description": "Plantas raras, de alto impacto, para coleccionistas"
    },
    {
      "value": "indoor",
      "icon": "🪴",
      "title": "Interior",
      "description": "Verde para adentro, resistente y decorativa"
    },
    {
      "value": "outdoor",
      "icon": "☀️",
      "title": "Exterior",
      "description": "Plantas para balcón, jardín o mucha luz"
    },
    {
      "value": "air",
      "icon": "💨",
      "title": "Planta de aire",
      "description": "Sin tierra ni maceta, flotan libres"
    }
  ]
}
```

### 3.3 Paso 3 — Tamaño

```json
{
  "id": "size",
  "label": "Paso 3 de 5",
  "title": "¿Qué tamaño buscas?",
  "subtitle": "El tamaño define la presencia visual en el espacio.",
  "options": [
    {
      "value": "small",
      "icon": "🌱",
      "title": "Pequeña",
      "description": "Cabe en un escritorio o repisa"
    },
    {
      "value": "medium",
      "icon": "🌿",
      "title": "Mediana",
      "description": "Tiene presencia pero no ocupa mucho"
    },
    {
      "value": "large",
      "icon": "🌳",
      "title": "Grande",
      "description": "Protagonista del espacio, impacto total"
    }
  ]
}
```

### 3.4 Paso 4 — Nivel de cuidado

```json
{
  "id": "care",
  "label": "Paso 4 de 5",
  "title": "¿Cuánto tiempo tengo para cuidarla?",
  "subtitle": "Sé honesto — ¡las plantas te lo agradecerán!",
  "options": [
    {
      "value": "none",
      "icon": "⏱",
      "title": "Casi ninguno",
      "description": "Quiero algo que sobreviva con olvido"
    },
    {
      "value": "amateur",
      "icon": "🌸",
      "title": "Un poco",
      "description": "Puedo regarla y darle algo de atención"
    },
    {
      "value": "collector",
      "icon": "🔬",
      "title": "Soy entusiasta",
      "description": "Disfruto cuidar y aprender de mis plantas"
    }
  ]
}
```

### 3.5 Paso 5 — Mascotas

```json
{
  "id": "pets",
  "label": "Paso 5 de 5",
  "title": "¿Tienes mascotas en casa?",
  "subtitle": "Algunas plantas son tóxicas para gatos y perros.",
  "options": [
    {
      "value": "no",
      "icon": "🏡",
      "title": "No tengo mascotas",
      "description": "Todas las opciones están disponibles"
    },
    {
      "value": "yes",
      "icon": "🐾",
      "title": "Sí tengo mascotas",
      "description": "Filtraremos solo plantas seguras"
    }
  ]
}
```

---

## 4. Catálogo de Plantas — Estructura de Datos

Cada planta tiene los siguientes atributos:

```typescript
interface Plant {
  id: string
  name: string                    // Nombre comercial Jardín Amazónico
  scientificName: string
  icon: string                    // Emoji representativo
  tier: "S" | "P" | "B"          // S=Signature, P=Premium, B=Básico
  tags: {
    type: ("exotic" | "indoor" | "outdoor" | "air")[]
    size: ("small" | "medium" | "large")[]
    care: ("none" | "amateur" | "collector")[]
  }
  petSafe: boolean
  suitableFor: {
    gift: boolean
    space: boolean
    me: boolean
  }
  description: string             // 1–2 frases evocadoras, tono poético
  benefit: {
    icon: string                  // Emoji del beneficio
    text: string                  // Beneficio energético/espiritual
  }
  options: {
    basic: PlantOption
    regenerative: PlantOption
  }
  careDetails: {
    light: string
    water: string
    humidity: string
  }
}

interface PlantOption {
  name: "Básica" | "Regenerativa"
  priceRange: string              // Ej: "S/ 140–200"
  includes: string[]              // Lista de ítems incluidos
  labubu?: {                      // Solo en opción Regenerativa
    animal: string
    artisan: string
    community: string
    region: string
  }
}
```

### 4.1 Plantas del Portafolio

```json
[
  {
    "id": "p01",
    "name": "Alocasia Amazónica",
    "scientificName": "Alocasia 'Amazonica'",
    "icon": "🖤",
    "tier": "S",
    "tags": {
      "type": ["exotic", "indoor"],
      "size": ["medium"],
      "care": ["amateur", "collector"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Sus hojas oscuras con bordes blancos parecen arte amazónico tallado en verde vivo. La planta que lleva nuestro nombre en su propio.",
    "benefit": {
      "icon": "✨",
      "text": "Eleva la energía del espacio y conecta con la fuerza de la selva"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 140–200",
        "includes": ["Planta Alocasia Amazónica", "Maceta Tierra (cerámica artesanal)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 185–255",
        "includes": [
          "Planta Alocasia Amazónica",
          "Maceta Tierra (cerámica artesanal)",
          "Labubu Rana Venenosa — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Rana Venenosa",
          "artisan": "Rosa Cumapa",
          "community": "Shipibo-Conibo",
          "region": "Ucayali, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media",
      "water": "Moderado — 1 vez por semana",
      "humidity": "Alta — nebulizar ocasionalmente"
    }
  },
  {
    "id": "p02",
    "name": "Filodendro Micans",
    "scientificName": "Philodendron hederaceum 'Micans'",
    "icon": "🟤",
    "tier": "P",
    "tags": {
      "type": ["exotic", "indoor"],
      "size": ["small", "medium"],
      "care": ["amateur", "collector"]
    },
    "petSafe": true,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Sus hojas aterciopeladas en verde-bronce iridiscente capturan la luz de manera única. Hay que tocarlo para creerlo.",
    "benefit": {
      "icon": "💚",
      "text": "Textura sensorial que invita a la presencia y la calma"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 100–180",
        "includes": ["Planta Filodendro Micans", "Maceta Piedra (cemento pulido)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 145–230",
        "includes": [
          "Planta Filodendro Micans",
          "Maceta Piedra (cemento pulido)",
          "Labubu Mono Choro — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Mono Choro",
          "artisan": "Carmen Shawit",
          "community": "Awajún",
          "region": "Amazonas, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media",
      "water": "Moderado — regar cuando el sustrato esté casi seco",
      "humidity": "Media — tolera ambientes normales de interior"
    }
  },
  {
    "id": "p03",
    "name": "Pothos Golden",
    "scientificName": "Epipremnum aureum 'Golden'",
    "icon": "💛",
    "tier": "B",
    "tags": {
      "type": ["indoor"],
      "size": ["small", "medium"],
      "care": ["none", "amateur"]
    },
    "petSafe": true,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "La planta que perdona todo. Crece rápido, regala esquejes y llena cada rincón con hojas doradas que traen calidez.",
    "benefit": {
      "icon": "🍀",
      "text": "Atrae abundancia y prosperidad al espacio donde vive"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 90–140",
        "includes": ["Planta Pothos Golden (colgante)", "Maceta Selva (fibra natural)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 130–185",
        "includes": [
          "Planta Pothos Golden (colgante)",
          "Maceta Selva (fibra natural)",
          "Labubu Loro Verde — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Loro Verde",
          "artisan": "Marleni Flores",
          "community": "Yine",
          "region": "Ucayali, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Sombra / Luz indirecta baja — muy tolerante",
      "water": "Escaso — regar cuando el sustrato esté completamente seco",
      "humidity": "Baja a media — muy adaptable"
    }
  },
  {
    "id": "p04",
    "name": "Aglaonema Rosada",
    "scientificName": "Aglaonema commutatum 'Pink'",
    "icon": "🌸",
    "tier": "B",
    "tags": {
      "type": ["indoor"],
      "size": ["small", "medium"],
      "care": ["none", "amateur"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Sus hojas parecen pintadas a mano — una paleta que va del blanco cremoso al rosa profundo. Arte vivo que no necesita cuidados extremos.",
    "benefit": {
      "icon": "💗",
      "text": "Atrae amor y conexiones emocionales significativas"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 130–200",
        "includes": ["Planta Aglaonema Rosada", "Maceta Tierra (cerámica artesanal)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 175–250",
        "includes": [
          "Planta Aglaonema Rosada",
          "Maceta Tierra (cerámica artesanal)",
          "Labubu Flamenco Rosado — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Flamenco Rosado",
          "artisan": "Julia Yareja",
          "community": "Kukama",
          "region": "Loreto, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta baja a media",
      "water": "Moderado — tolera irregularidades",
      "humidity": "Alta — evitar corrientes de aire frío"
    }
  },
  {
    "id": "p05",
    "name": "Aglaonema Pattaya",
    "scientificName": "Aglaonema commutatum 'Pattaya'",
    "icon": "🔴",
    "tier": "P",
    "tags": {
      "type": ["indoor"],
      "size": ["medium"],
      "care": ["amateur", "collector"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Rojo y verde en explosión. La Aglaonema más dramática del mercado — sus hojas son un grito de color y vitalidad.",
    "benefit": {
      "icon": "🔥",
      "text": "Activa la energía, la creatividad y la pasión en el espacio"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 150–300",
        "includes": ["Planta Aglaonema Pattaya", "Maceta Piedra (cemento pulido)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 195–355",
        "includes": [
          "Planta Aglaonema Pattaya",
          "Maceta Piedra (cemento pulido)",
          "Labubu Guacamayo Verde-Rojo — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Guacamayo Verde-Rojo",
          "artisan": "Elena Paima",
          "community": "Asháninka",
          "region": "Junín, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media",
      "water": "Moderado — 1 vez por semana",
      "humidity": "Alta — ambientes cálidos"
    }
  },
  {
    "id": "p06",
    "name": "Filodendro Dark Lord",
    "scientificName": "Philodendron 'Dark Lord'",
    "icon": "⚫",
    "tier": "S",
    "tags": {
      "type": ["exotic", "indoor"],
      "size": ["medium", "large"],
      "care": ["collector"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Sus hojas van de rojo sangre a negro metálico. La planta más dramática de la familia — presencia de galería de arte, sin necesitar un cuadro.",
    "benefit": {
      "icon": "🛡️",
      "text": "Protección del espacio y poder silencioso"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 200–420",
        "includes": ["Planta Filodendro Dark Lord", "Maceta Piedra (cemento pulido)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 250–475",
        "includes": [
          "Planta Filodendro Dark Lord",
          "Maceta Piedra (cemento pulido)",
          "Labubu Jaguar Negro — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Jaguar Negro",
          "artisan": "Marco Inuma",
          "community": "Shipibo",
          "region": "Ucayali, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media-alta",
      "water": "Moderado — sustrato húmedo pero drenado",
      "humidity": "Alta — nebulizar regularmente"
    }
  },
  {
    "id": "p07",
    "name": "Filodendro Pink Princess",
    "scientificName": "Philodendron erubescens 'Pink Princess'",
    "icon": "🌺",
    "tier": "S",
    "tags": {
      "type": ["exotic"],
      "size": ["medium"],
      "care": ["collector"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Ninguna hoja es igual. Sus manchas rosas sobre verde oscuro son irrepetibles — cada nueva hoja es una sorpresa que la planta te reserva.",
    "benefit": {
      "icon": "✨",
      "text": "Rareza y distinción — quien la tiene, la convierte en conversación"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 280–450",
        "includes": ["Planta Filodendro Pink Princess", "Maceta Tierra (cerámica artesanal)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 330–510",
        "includes": [
          "Planta Filodendro Pink Princess",
          "Maceta Tierra (cerámica artesanal)",
          "Labubu Guacamayo Rosado — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Guacamayo Rosado",
          "artisan": "Nora Cumapa",
          "community": "Shipibo-Conibo",
          "region": "Ucayali, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media — más luz = más variegación rosa",
      "water": "Moderado — no encharcamiento",
      "humidity": "Alta — humidificador recomendado"
    }
  },
  {
    "id": "p08",
    "name": "Monstera Adansonii",
    "scientificName": "Monstera adansonii",
    "icon": "🌿",
    "tier": "P",
    "tags": {
      "type": ["exotic", "indoor"],
      "size": ["medium"],
      "care": ["amateur", "collector"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Sus hojas perforadas crean un juego de luz y sombra fascinante. Crece rápido y trepa con entusiasmo — llena el espacio con movimiento.",
    "benefit": {
      "icon": "💚",
      "text": "Dinamismo y abundancia — energía de selva en movimiento"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 80–160",
        "includes": ["Planta Monstera Adansonii", "Maceta Selva (fibra natural)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 120–210",
        "includes": [
          "Planta Monstera Adansonii",
          "Maceta Selva (fibra natural)",
          "Labubu Rana Arborícola — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Rana Arborícola",
          "artisan": "Yeni Tangoa",
          "community": "Ese Eja",
          "region": "Madre de Dios, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media",
      "water": "Moderado — regar cuando el sustrato esté casi seco",
      "humidity": "Alta — agradece nebulización"
    }
  },
  {
    "id": "p09",
    "name": "ZZ Plant — Zamioculca",
    "scientificName": "Zamioculcas zamiifolia",
    "icon": "🪨",
    "tier": "P",
    "tags": {
      "type": ["indoor"],
      "size": ["medium"],
      "care": ["none"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Sin luz, sin agua, sin problemas. La planta más estoica del mundo — sus hojas verde brillante son casi artificialmente perfectas.",
    "benefit": {
      "icon": "🍀",
      "text": "Prosperidad y resiliencia — crece incluso cuando te olvidas de ella"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 145–180",
        "includes": ["Planta ZZ Plant", "Maceta Piedra (cemento pulido)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 190–230",
        "includes": [
          "Planta ZZ Plant",
          "Maceta Piedra (cemento pulido)",
          "Labubu Tortuga Amazónica — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Tortuga Amazónica",
          "artisan": "Sonia Inuma",
          "community": "Yawanapi",
          "region": "Loreto, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz tenue a indirecta baja — tolera casi oscuridad total",
      "water": "Muy escaso — cada 2–4 semanas",
      "humidity": "Baja — muy adaptable"
    }
  },
  {
    "id": "p10",
    "name": "Sansevieria Golden",
    "scientificName": "Dracaena trifasciata 'Golden Hahnii'",
    "icon": "🗡️",
    "tier": "P",
    "tags": {
      "type": ["indoor"],
      "size": ["medium", "large"],
      "care": ["none"]
    },
    "petSafe": true,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "La indestructible. Sus hojas doradas y erguidas purifican el aire dormida — requiere casi nada y da mucho a cambio.",
    "benefit": {
      "icon": "🌬️",
      "text": "Purifica el aire y protege el espacio — el guardián verde"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 200–280",
        "includes": ["Planta Sansevieria Golden", "Maceta Tierra (cerámica artesanal)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 245–335",
        "includes": [
          "Planta Sansevieria Golden",
          "Maceta Tierra (cerámica artesanal)",
          "Labubu Caimán Dorado — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Caimán Dorado",
          "artisan": "Luz Marina Flores",
          "community": "Kukama-Kukamiria",
          "region": "Loreto, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz tenue — soporta sombra profunda",
      "water": "Muy escaso — cada 3–4 semanas",
      "humidity": "Baja — muy resistente"
    }
  },
  {
    "id": "p11",
    "name": "Anturio Rojo",
    "scientificName": "Anthurium andraeanum",
    "icon": "❤️",
    "tier": "P",
    "tags": {
      "type": ["indoor"],
      "size": ["medium"],
      "care": ["amateur"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": false, "me": false },
    "description": "Sus espatas rojas lacadas florecen casi sin parar. El anturio rojo es el regalo vivo más reconocido de Lima — hermoso, duradero y emotivo.",
    "benefit": {
      "icon": "💗",
      "text": "Amor y hospitalidad — la planta del corazón abierto"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 100–140",
        "includes": ["Planta Anturio Rojo", "Maceta Tierra (cerámica artesanal)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 145–190",
        "includes": [
          "Planta Anturio Rojo",
          "Maceta Tierra (cerámica artesanal)",
          "Labubu Guacamayo Rojo — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Guacamayo Rojo",
          "artisan": "Rosa Cumapa",
          "community": "Shipibo-Conibo",
          "region": "Ucayali, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media — sin sol directo",
      "water": "Moderado — sustrato húmedo no encharcado",
      "humidity": "Alta — agradece nebulización en verano"
    }
  },
  {
    "id": "p12",
    "name": "Anturio Amarillo / Chocolate",
    "scientificName": "Anthurium andraeanum (vars. raras)",
    "icon": "🌼",
    "tier": "P",
    "tags": {
      "type": ["indoor"],
      "size": ["medium"],
      "care": ["amateur", "collector"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": true, "me": false },
    "description": "El color que nadie espera en un anturio — amarillo solar o marrón chocolate que convierte un regalo común en algo que nadie ha visto antes.",
    "benefit": {
      "icon": "🔥",
      "text": "Alegría única — el regalo que rompe todos los esquemas"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 130–170",
        "includes": ["Planta Anturio (variedad de color)", "Maceta Piedra (cemento pulido)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 175–220",
        "includes": [
          "Planta Anturio (variedad de color)",
          "Maceta Piedra (cemento pulido)",
          "Labubu Mariposa Amarilla — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Mariposa Amarilla",
          "artisan": "Carla Tangoa",
          "community": "Huitoto",
          "region": "Loreto, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media",
      "water": "Moderado — regar 1 vez por semana",
      "humidity": "Alta — nebulizar en verano"
    }
  },
  {
    "id": "p13",
    "name": "Tillandsia — Planta de Aire",
    "scientificName": "Tillandsia spp.",
    "icon": "🌬️",
    "tier": "B",
    "tags": {
      "type": ["air", "outdoor"],
      "size": ["small"],
      "care": ["none", "amateur"]
    },
    "petSafe": true,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Sin tierra, sin maceta. La Tillandsia vive del aire y un poco de agua nebulizada — puede posarse en cualquier superficie y transformarla.",
    "benefit": {
      "icon": "✨",
      "text": "Libertad y energía del aire — desafía la idea de lo que una planta puede ser"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 50–110",
        "includes": ["Tillandsia (especie seleccionada)", "Base de madera amazónica"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 90–155",
        "includes": [
          "Tillandsia (especie seleccionada)",
          "Base de madera amazónica",
          "Labubu Loro Epífito — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Loro Epífito",
          "artisan": "Ana Soria",
          "community": "Nomatsiguenga",
          "region": "Junín, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta alta — cerca de ventana sin sol directo",
      "water": "Nebulización 2–3 veces por semana o baño semanal",
      "humidity": "Media — sin sustrato, absorbe por hojas"
    }
  },
  {
    "id": "p14",
    "name": "Jazmín Limón",
    "scientificName": "Murraya paniculata",
    "icon": "🌸",
    "tier": "P",
    "tags": {
      "type": ["outdoor", "indoor"],
      "size": ["medium"],
      "care": ["amateur"]
    },
    "petSafe": true,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Sus flores blancas desprenden un perfume dulce y cítrico que impregna toda la habitación. El Jazmín es una experiencia sensorial completa.",
    "benefit": {
      "icon": "🧘",
      "text": "Bienestar y calma sensorial — el aroma que transforma el ambiente"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 100–150",
        "includes": ["Planta Jazmín Limón", "Maceta Selva (fibra natural)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 145–200",
        "includes": [
          "Planta Jazmín Limón",
          "Maceta Selva (fibra natural)",
          "Labubu Colibrí — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Colibrí",
          "artisan": "Miriam Cushi",
          "community": "Matsés",
          "region": "Loreto, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz intensa / sol indirecto — balcón o ventana luminosa",
      "water": "Moderado — regar cuando el sustrato esté casi seco",
      "humidity": "Media — adaptable a interiores bien iluminados"
    }
  },
  {
    "id": "p15",
    "name": "Cuerno de Alce",
    "scientificName": "Platycerium bifurcatum",
    "icon": "🦌",
    "tier": "P",
    "tags": {
      "type": ["indoor", "outdoor"],
      "size": ["medium"],
      "care": ["amateur", "collector"]
    },
    "petSafe": true,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Vive montado en pared — no necesita maceta. Sus frondes en forma de cuerno son una declaración de interiores. Es un cuadro vivo.",
    "benefit": {
      "icon": "🛡️",
      "text": "Protección y arte — transforma cualquier pared en selva viva"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 100–160",
        "includes": ["Planta Cuerno de Alce", "Tabla de madera para montaje en pared"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 145–215",
        "includes": [
          "Planta Cuerno de Alce",
          "Tabla de madera para montaje",
          "Labubu Cóndor — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Cóndor",
          "artisan": "David Ruiz",
          "community": "Kokama",
          "region": "Loreto, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media a sombra — interior con algo de luz",
      "water": "Nebulización o baño semanal — epífito, no tiene sustrato",
      "humidity": "Media-alta — agradece ambientes húmedos"
    }
  },
  {
    "id": "p16",
    "name": "Anturio Cristalino",
    "scientificName": "Anthurium crystallinum",
    "icon": "💎",
    "tier": "S",
    "tags": {
      "type": ["exotic", "indoor"],
      "size": ["medium"],
      "care": ["collector"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Venas plateadas sobre terciopelo verde oscuro — el Crystallinum parece tener luz propia. El Anturio que convierte a la gente en coleccionista.",
    "benefit": {
      "icon": "✨",
      "text": "Luz interior y conexión amazónica — viene de nuestra propia selva"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 120–250",
        "includes": ["Planta Anturio Cristalino", "Maceta Tierra (cerámica artesanal)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 165–310",
        "includes": [
          "Planta Anturio Cristalino",
          "Maceta Tierra (cerámica artesanal)",
          "Labubu Mariposa Morpho — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Mariposa Morpho",
          "artisan": "Elena Paima",
          "community": "Shipibo",
          "region": "Ucayali, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media — evitar sol directo",
      "water": "Moderado — sustrato húmedo con buen drenaje",
      "humidity": "Muy alta — humidificador recomendado"
    }
  },
  {
    "id": "p17",
    "name": "Filodendro Gloriosum",
    "scientificName": "Philodendron gloriosum",
    "icon": "👑",
    "tier": "S",
    "tags": {
      "type": ["exotic"],
      "size": ["medium", "large"],
      "care": ["collector"]
    },
    "petSafe": false,
    "suitableFor": { "gift": false, "space": true, "me": true },
    "description": "Hojas aterciopeladas gigantes con venas blancas imponentes — el ícono del coleccionismo mundial. Y es de nuestra Amazonía sudamericana.",
    "benefit": {
      "icon": "🌿",
      "text": "Grandeza amazónica — la razón por la que la gente cae en el mundo de las aráceas"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 240–520",
        "includes": ["Planta Filodendro Gloriosum", "Maceta Piedra (cemento pulido, talla grande)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 290–580",
        "includes": [
          "Planta Filodendro Gloriosum",
          "Maceta Piedra (cemento pulido, talla grande)",
          "Labubu Boa Esmeralda — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Boa Esmeralda",
          "artisan": "Marco Inuma",
          "community": "Ese Eja",
          "region": "Madre de Dios, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta media — rampa horizontal (crece arrastrando, no trepando)",
      "water": "Moderado — regar cuando el sustrato esté casi seco",
      "humidity": "Muy alta — humidificador o bandeja con agua"
    }
  },
  {
    "id": "p18",
    "name": "Maranta Prayer Plant",
    "scientificName": "Maranta leuconeura",
    "icon": "🙏",
    "tier": "B",
    "tags": {
      "type": ["indoor"],
      "size": ["small", "medium"],
      "care": ["amateur"]
    },
    "petSafe": true,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Sus hojas se pliegan cada noche como manos en oración — y vuelven a abrirse con la luz del día. Tiene uno de los patrones más elaborados de la naturaleza.",
    "benefit": {
      "icon": "🧘",
      "text": "Meditación y presencia — la planta que te recuerda el ritmo de la vida"
    },
    "options": {
      "basic": {
        "name": "Básica",
        "priceRange": "S/ 120–160",
        "includes": ["Planta Maranta Prayer Plant", "Maceta Selva (fibra natural)"]
      },
      "regenerative": {
        "name": "Regenerativa",
        "priceRange": "S/ 165–210",
        "includes": [
          "Planta Maranta Prayer Plant",
          "Maceta Selva (fibra natural)",
          "Labubu Mariposa de Noche — fibra de chambira",
          "Tarjeta dedicatoria personalizada"
        ],
        "labubu": {
          "animal": "Mariposa de Noche",
          "artisan": "Graciela Huanca",
          "community": "Matsiguenka",
          "region": "Cusco, Perú"
        }
      }
    },
    "careDetails": {
      "light": "Luz indirecta baja a media — sin sol directo",
      "water": "Frecuente — mantener sustrato húmedo sin encharcamiento",
      "humidity": "Alta — usa agua sin cloro o filtrada"
    }
  }
]
```

---

## 5. Algoritmo de Scoring

El sistema calcula una puntuación para cada planta cruzando las respuestas del usuario con los atributos de cada planta. Las plantas con mayor score se muestran primero.

```typescript
function calculateScore(plant: Plant, answers: Answers): number {
  let score = 0

  // --- TIPO (peso alto: 2–4 puntos) ---
  if (answers.type === "exotic" && plant.tags.type.includes("exotic")) score += 3
  if (answers.type === "indoor" && plant.tags.type.includes("indoor")) score += 2
  if (answers.type === "outdoor" && plant.tags.type.includes("outdoor")) score += 2
  if (answers.type === "air" && plant.tags.type.includes("air")) score += 4

  // Bonus de coherencia de tier con tipo
  if (answers.type === "exotic" && plant.tier === "S") score += 1

  // --- TAMAÑO (peso medio: 2 puntos) ---
  if (plant.tags.size.includes(answers.size)) score += 2

  // --- NIVEL DE CUIDADO (peso alto: 2–3 puntos) ---
  if (plant.tags.care.includes(answers.care)) score += 2
  // Bonus especial para plantas "none" — las más tolerantes
  if (answers.care === "none" && plant.tags.care.includes("none")) score += 1

  // --- MASCOTAS (filtro disqualificante: -10) ---
  if (answers.pets === "yes" && !plant.petSafe) score -= 10

  // --- PROPÓSITO (peso bajo: 1 punto) ---
  if (answers.purpose === "gift" && plant.suitableFor.gift) score += 1
  if (answers.purpose === "space" && plant.suitableFor.space) score += 1
  if (answers.purpose === "me" && plant.suitableFor.me) score += 1

  return score
}

function getRecommendations(answers: Answers): Plant[] {
  const scored = PLANTS
    .map(plant => ({ plant, score: calculateScore(plant, answers) }))
    .filter(item => item.score > 0)         // excluir plantas con score negativo
    .sort((a, b) => b.score - a.score)       // ordenar de mayor a menor score

  // Fallback: si no hay resultados, mostrar las 3 más básicas
  if (scored.length === 0) {
    return PLANTS.filter(p => p.tier === "B").slice(0, 3)
  }

  // Mostrar entre 3 y 5 resultados
  return scored.slice(0, Math.min(5, scored.length)).map(item => item.plant)
}
```

### Reglas especiales de scoring

| Condición | Ajuste | Razón |
|---|---|---|
| `pets=yes` + `petSafe=false` | `-10` | Filtro duro — la planta no debe aparecer |
| `type=air` + `tags.type includes 'air'` | `+4` | Categoría muy específica — match perfecto |
| `care=none` + ZZ Plant / Sansevieria / Pothos | `+2` bonus adicional | Las plantas más tolerantes merecen prioridad clara |
| `type=exotic` + `tier=S` | `+1` | Coherencia aspiracional |

---

## 6. Especificación de UI

### 6.1 Componente de progreso

```
Barra de progreso: 5 segmentos lineales horizontales
- Segmento completado: color verde oscuro (#1B4332)
- Segmento activo: color terracota (#C1440E)
- Segmento pendiente: borde gris claro
- Posición: arriba del cuestionario, siempre visible
- En pantalla de resultados: ocultar
```

### 6.2 Pantalla de pregunta

```
Estructura por pregunta:
┌──────────────────────────────────────────┐
│ [Barra de progreso]                      │
│                                          │
│ PASO X DE 5                    ← label   │
│ ¿Título de la pregunta?        ← h2      │
│ Subtítulo explicativo          ← p       │
│                                          │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │  icon   │ │  icon   │ │  icon   │    │
│ │ Título  │ │ Título  │ │ Título  │    │
│ │  desc   │ │  desc   │ │  desc   │    │
│ └─────────┘ └─────────┘ └─────────┘    │
│                                          │
│ [← Atrás]              [Siguiente →]    │
└──────────────────────────────────────────┘

Estado de tarjeta de opción:
- Default: borde 0.5px gris claro, fondo blanco
- Hover: borde verde medio, fondo gris muy claro
- Selected: borde 2px verde oscuro, fondo verde muy claro
- El botón "Siguiente" permanece desactivado hasta que haya una selección
```

### 6.3 Pantalla de resultados

```
Estructura:
┌──────────────────────────────────────────┐
│ TU SELECCIÓN PERSONALIZADA    ← label    │
│ Estas plantas fueron...       ← h2       │
│ Subtítulo contextual          ← p        │
│                                          │
│ ┌──────────────┐ ┌──────────┐ ┌────────┐│
│ │ MEJOR MATCH  │ │         │ │        ││
│ │ [badge tier] │ │[badge]  │ │[badge] ││
│ │ [pet badge]  │ │         │ │        ││
│ │              │ │         │ │        ││
│ │ icon 28px    │ │ icon    │ │ icon   ││
│ │ Nombre       │ │ Nombre  │ │ Nombre ││
│ │ Nombre cient │ │ ...     │ │ ...    ││
│ │ Descripción  │ │         │ │        ││
│ │ [Beneficio]  │ │         │ │        ││
│ │──────────────│ │         │ │        ││
│ │ Elige opción │ │         │ │        ││
│ │ [Básica]     │ │         │ │        ││
│ │ [Regenerat.] │ │         │ │        ││
│ └──────────────┘ └──────────┘ └────────┘│
│                                          │
│ [Volver a empezar]  [Ver catálogo ↗]   │
└──────────────────────────────────────────┘

Primera planta (mejor match):
- Tiene badge verde "Mejor coincidencia" en la parte superior
- Borde destacado: 2px verde medio (vs 0.5px del resto)
```

### 6.4 Tarjeta de opción de compra — Básica

```
┌─────────────────────────────────┐
│ Básica                          │
│ Planta + Maceta [nombre maceta] │
│                                 │
│ S/ 140–200              ← precio│
│                                 │
│ [  Quiero esta →  ]    ← botón  │
└─────────────────────────────────┘
```

### 6.5 Tarjeta de opción de compra — Regenerativa

```
┌─────────────────────────────────┐
│ Regenerativa 🌿                 │
│ Planta + Maceta                 │
│ + Labubu [animal] de chambira   │
│ + Tarjeta de [Artesana],        │
│   comunidad [Comunidad]         │
│                                 │
│ S/ 185–255              ← precio│
│                                 │
│ [  Quiero esta →  ]    ← botón  │  ← fondo verde oscuro
└─────────────────────────────────┘
```

---

## 7. Opciones de Compra — Especificación Detallada

### 7.1 Opción Básica

Incluye siempre:
- La planta en su maceta seleccionada (una de las 3 macetas del portafolio)
- Guía de cuidado impresa con el nombre y los beneficios de la planta

No incluye:
- Labubu amazónico
- Tarjeta personalizada con artesano

### 7.2 Opción Regenerativa

Incluye todo lo de la opción básica más:
- Labubu amazónico: animalito tejido en fibra de chambira, único para esa especie de planta
- Tarjeta dedicatoria personalizada que incluye:
  - Nombre del artesano/artesana
  - Comunidad indígena de origen
  - Región del Perú
  - QR que lleva a un video corto del proceso de tejido (fase 2)
  - Espacio para mensaje personal del comprador (máximo 120 caracteres)

### 7.3 Las 3 Macetas del Portafolio

| Nombre | Material | Acabado | Tono | Uso preferido |
|---|---|---|---|---|
| **Tierra** | Cerámica artesanal | Mate | Crema / arena / ocre | Plantas de interior con presencia |
| **Piedra** | Cemento pulido | Texturado gris | Gris claro / oscuro | Plantas de colección y dramáticas |
| **Selva** | Fibra natural / bambú | Orgánico | Tono natural | Plantas colgantes y tropicales |

### 7.4 Labubus Amazónicos — Colección Completa

| Animal | Planta asociada | Artesano/a | Comunidad | Región |
|---|---|---|---|---|
| Rana Venenosa | Alocasia Amazónica | Rosa Cumapa | Shipibo-Conibo | Ucayali |
| Mono Choro | Filodendro Micans | Carmen Shawit | Awajún | Amazonas |
| Loro Verde | Pothos Golden | Marleni Flores | Yine | Ucayali |
| Flamenco Rosado | Aglaonema Rosada | Julia Yareja | Kukama | Loreto |
| Guacamayo Verde-Rojo | Aglaonema Pattaya | Elena Paima | Asháninka | Junín |
| Jaguar Negro | Filodendro Dark Lord | Marco Inuma | Shipibo | Ucayali |
| Guacamayo Rosado | Filodendro Pink Princess | Nora Cumapa | Shipibo-Conibo | Ucayali |
| Rana Arborícola | Monstera Adansonii | Yeni Tangoa | Ese Eja | Madre de Dios |
| Tortuga Amazónica | ZZ Plant | Sonia Inuma | Yawanapi | Loreto |
| Caimán Dorado | Sansevieria Golden | Luz Marina Flores | Kukama-Kukamiria | Loreto |
| Guacamayo Rojo | Anturio Rojo | Rosa Cumapa | Shipibo-Conibo | Ucayali |
| Mariposa Amarilla | Anturio Amarillo/Chocolate | Carla Tangoa | Huitoto | Loreto |
| Loro Epífito | Tillandsia | Ana Soria | Nomatsiguenga | Junín |
| Colibrí | Jazmín Limón | Miriam Cushi | Matsés | Loreto |
| Cóndor | Cuerno de Alce | David Ruiz | Kokama | Loreto |
| Mariposa Morpho | Anturio Cristalino | Elena Paima | Shipibo | Ucayali |
| Boa Esmeralda | Filodendro Gloriosum | Marco Inuma | Ese Eja | Madre de Dios |
| Mariposa de Noche | Maranta Prayer Plant | Graciela Huanca | Matsiguenka | Cusco |

---

## 8. Reglas de Negocio

```
RN-01  Una sola opción seleccionable por pregunta (radio, no checkbox).
RN-02  El botón "Siguiente" está desactivado hasta que el usuario seleccione una opción.
RN-03  El usuario puede retroceder con "Atrás" sin perder las respuestas previas.
RN-04  Si pets=yes y la planta no es petSafe, aplicar penalización de -10 puntos.
       La planta no debe aparecer en resultados salvo que no haya suficientes
       plantas pet-safe (menos de 3) — en ese caso mostrarla con advertencia visual.
RN-05  Mostrar entre 3 y 5 plantas. Nunca menos de 3.
RN-06  Si no hay suficientes plantas con score > 0, mostrar las 3 de tier "B" 
       con mayor compatibilidad de cuidado.
RN-07  La primera planta en resultados siempre lleva el badge "Mejor coincidencia".
RN-08  El CTA de cada opción de compra redirige a WhatsApp con mensaje preformateado
       que incluye: nombre de la planta, opción elegida (Básica o Regenerativa),
       y nombre del labubu si aplica.
RN-09  Si purpose=gift, el subtítulo de resultados cambia a 
       "Perfectas para regalar con impacto y significado."
       Si purpose=me o space, usar 
       "Curadas según tu espacio, ritmo y nivel de experiencia."
RN-10  La opción Regenerativa siempre usa el botón con fondo verde oscuro (#1B4332)
       para destacarla visualmente sobre la Básica.
```

---

## 9. Comportamiento del CTA — WhatsApp

Al hacer clic en cualquier botón de compra, abrir WhatsApp con mensaje preformateado:

```
// Opción Básica
const messageBasic = `Hola 🌿 Me interesa la opción BÁSICA de: 
*${plant.name}* (${plant.scientificName})
Incluye: ${plant.options.basic.includes.join(", ")}
Precio: ${plant.options.basic.priceRange}
¿Tienen disponibilidad?`

// Opción Regenerativa
const messageRegen = `Hola 🌿 Me interesa la opción REGENERATIVA de:
*${plant.name}* (${plant.scientificName})
Incluye: ${plant.options.regenerative.includes.join(", ")}
Labubu: ${plant.options.regenerative.labubu.animal} 
— tejido por ${plant.options.regenerative.labubu.artisan}, 
   comunidad ${plant.options.regenerative.labubu.community}
Precio: ${plant.options.regenerative.priceRange}
¿Tienen disponibilidad?`

// URL de apertura
const waNumber = "51XXXXXXXXX" // número real de JA
const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
window.open(url, "_blank")
```

---

## 10. Consideraciones Técnicas para Claude Code

### Stack recomendado

```
Framework:     React 18+ (o Vanilla JS si es widget embebido)
Estilos:       Tailwind CSS v3 (paleta personalizada) o CSS modules
State:         useState — no se necesita librería de estado global
Routing:       No aplica — componente embebido en página existente
Hosting quiz:  Shopify (si la web va en Shopify) o como componente Next.js
```

### Variables de entorno necesarias

```env
NEXT_PUBLIC_WA_NUMBER=51XXXXXXXXX   # número de WhatsApp de Jardín Amazónico
NEXT_PUBLIC_CATALOG_URL=/catalogo   # URL del catálogo completo
```

### Paleta de colores Jardín Amazónico

```css
:root {
  --ja-dark:    #1B4332;   /* verde oscuro — principal, headers, botón regen */
  --ja-mid:     #40916C;   /* verde medio — acentos, hover, badges */
  --ja-light:   #D8F3DC;   /* verde claro — fondos alt, selected state */
  --ja-terra:   #C1440E;   /* terracota — progreso activo, precios */
  --ja-cream:   #F5F0E8;   /* crema — fondo general de la sección */
  --ja-gold:    #F4A261;   /* dorado — badges Signature, detalles premium */
  --ja-sand:    #E9C46A;   /* arena — accents secundarios */
}
```

### Tipografía

```css
/* Títulos de pregunta */
.q-title { font-size: 22px; font-weight: 500; }

/* Nombres de planta en tarjeta */
.plant-name { font-size: 15px; font-weight: 500; }

/* Descripciones y body */
.body-text { font-size: 13px; font-weight: 400; line-height: 1.6; }

/* Labels de sección */
.label-tag { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
```

### Animaciones

```css
/* Transición entre pasos */
@keyframes stepIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0);   }
}
.step-enter { animation: stepIn 0.3s ease forwards; }

/* Activación del botón siguiente */
.btn-next { transition: opacity 0.2s, background 0.2s; }
.btn-next:disabled { opacity: 0.35; pointer-events: none; }
```

### Estructura de archivos sugerida

```
/components
  /PlantQuiz
    index.tsx              ← componente raíz con estado global del quiz
    QuizStep.tsx           ← pantalla de pregunta individual
    OptionCard.tsx         ← tarjeta de opción seleccionable
    Results.tsx            ← pantalla de resultados
    PlantCard.tsx          ← tarjeta de planta con opciones de compra
    ProgressBar.tsx        ← barra de progreso
    scoring.ts             ← algoritmo de scoring (función pura, testeable)
    data/
      questions.ts         ← array de preguntas y opciones
      plants.ts            ← catálogo de plantas con todos los atributos
      labubus.ts           ← catálogo de labubus amazónicos
```

### Tests unitarios mínimos recomendados

```typescript
// scoring.test.ts
describe("calculateScore", () => {
  it("debe retornar -10 o menos cuando pets=yes y planta no es petSafe")
  it("debe retornar score > 0 para ZZ Plant cuando care=none")
  it("debe retornar score > 0 para Tillandsia cuando type=air")
  it("debe retornar al menos 3 resultados siempre")
  it("debe ordenar resultados de mayor a menor score")
})
```

---

## 11. Accesibilidad

```
- Todo el cuestionario navegable con teclado (Tab + Enter/Space)
- Tarjetas de opción implementadas como <button> (no como <div> clickeable)
- Barra de progreso con aria-valuenow, aria-valuemin, aria-valuemax
- Resultados anunciados con aria-live="polite" al cambiar de paso
- Contraste mínimo WCAG AA en todos los textos sobre fondos de color
- Alt text en todas las imágenes de plantas (cuando se implementen fotos reales)
```

---

## 12. Fases de Implementación

| Fase | Contenido | Prioridad |
|---|---|---|
| **MVP** | Quiz funcional con datos JSON hardcodeados, CTA a WhatsApp | Lanzamiento |
| **Fase 2** | Fotos reales de plantas reemplazando emojis, animaciones | Mes 2 |
| **Fase 3** | QR en tarjeta Regenerativa → video del artesano tejiendo | Mes 3 |
| **Fase 4** | Integración con CMS (Contentful/Sanity) para gestionar plantas sin código | Mes 4 |
| **Fase 5** | Analytics de quiz: qué responden los usuarios, qué plantas convierten más | Mes 5 |

---

*Documento generado para Jardín Amazónico — v1.0 — Mayo 2026*
*Para implementación con Claude Code o equipo de desarrollo web*
