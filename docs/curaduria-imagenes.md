# Curaduría de imágenes — Jardín Amazónico MVP

> **Objetivo:** entregar **19 imágenes** (1 Hero + 18 plantas del catálogo) para reemplazar los placeholders del MVP.
> **Plazo recomendado:** durante el sprint (días 2–7), ideal antes del go-live.
> **Cómo reemplazar:** copiar el archivo nuevo al mismo path con el mismo nombre que el placeholder. El sitio actualiza automáticamente sin tocar JSON ni código.

---

## 1. Especificaciones técnicas

### Imagen Hero

| Atributo | Requisito |
|---|---|
| **Path final** | `public/images/hero.jpg` |
| **Aspecto** | Horizontal 16:10 (o 16:9 aceptable) |
| **Resolución mínima** | 1920×1200 (o 1920×1080) |
| **Resolución óptima** | 2400×1500 |
| **Peso máximo después de compresión** | 350 KB |
| **Tipo de imagen** | Planta amazónica grande (Filodendro, Monstera, Alocasia, Anturio) en un interior limeño premium (departamento moderno, luz natural, paredes claras o madera). Tono cálido. La planta debe ser protagonista — no un detalle decorativo. |
| **Composición** | Espacio generoso a la izquierda o derecha para que el texto del Hero respire (overlay del 30%–50% se aplica en código). |

### Imágenes del catálogo (18 plantas)

| Atributo | Requisito |
|---|---|
| **Path final** | `public/images/plants/<slug>.jpg` |
| **Aspecto** | Vertical 4:5 (recomendado) o 3:4 |
| **Resolución mínima** | 800×1000 |
| **Resolución óptima** | 1200×1500 |
| **Peso máximo después de compresión** | 250 KB |
| **Tipo de imagen** | La planta protagonista en una maceta neutral o decorativa. Fondos limpios (blanco, beige, madera, gris suave). Luz natural. Sin gente. |
| **Estilo** | Editorial / minimalista — coherente con la estética Fjord. Evitar fotos saturadas, con efectos vintage o muy oscuras. |

---

## 2. Fuentes recomendadas

| Fuente | URL | Notas |
|---|---|---|
| **Unsplash** | https://unsplash.com | Primera opción. Licencia gratuita comercial, sin atribución obligatoria (aunque siempre es elegante atribuir). Calidad alta. |
| **Pexels** | https://pexels.com | Segunda opción. Misma licencia. |
| **Pixabay** | https://pixabay.com | Tercera opción. Variedad amplia pero calidad inconsistente. |

**No usar:** Google Images, Pinterest, blogs personales. Pueden tener restricciones de copyright.

### Atribución (opcional pero recomendada)

Si quieres atribuir, lleva una tabla simple en `docs/credits.md` con: planta → fotógrafo → URL Unsplash. No es legalmente obligatorio en Unsplash, pero refuerza la integridad editorial de la marca.

---

## 3. Workflow recomendado

1. **Buscar.** En Unsplash, buscar por nombre científico primero (ej: `Alocasia amazonica`), luego nombre común en inglés (ej: `Alocasia plant`, `tropical leaf`), luego en español si Unsplash devuelve poco (`alocasia oreja de elefante`).
2. **Filtrar.** Activar filtro "Orientation → Portrait" para plantas, "Landscape" para Hero.
3. **Seleccionar.** Preferir fotos donde la planta esté completa (no solo una hoja en macro), en condiciones de luz neutral.
4. **Descargar.** Click en "Download free" → elegir tamaño "Large" (no "Original" — es muy pesado).
5. **Comprimir.** Subir a [squoosh.app](https://squoosh.app) → seleccionar formato MozJPEG, calidad 78–82, redimensionar a `1200px` ancho. Descargar.
6. **Renombrar.** Al `slug` exacto del listado abajo (todo minúsculas, sin acentos, sin espacios).
7. **Mover.** A `public/images/plants/<slug>.jpg` o `public/images/hero.jpg`.

---

## 4. Listado de las 18 plantas — términos de búsqueda y nombres de archivo

| # | Slug (nombre archivo) | Planta JA | Nombre científico | Búsqueda Unsplash recomendada |
|---|---|---|---|---|
| 1 | `alocasia-amazonica.jpg` | Alocasia Amazónica | *Alocasia 'Amazonica'* | `alocasia amazonica` · `alocasia polly` · `dark leaf plant` |
| 2 | `filodendro-micans.jpg` | Filodendro Micans | *Philodendron hederaceum 'Micans'* | `philodendron micans` · `velvet leaf plant` |
| 3 | `pothos-golden.jpg` | Pothos Golden | *Epipremnum aureum 'Golden'* | `golden pothos` · `pothos plant` · `epipremnum` |
| 4 | `aglaonema-rosada.jpg` | Aglaonema Rosada | *Aglaonema commutatum 'Pink'* | `pink aglaonema` · `aglaonema lipstick` |
| 5 | `aglaonema-pattaya.jpg` | Aglaonema Pattaya | *Aglaonema commutatum 'Pattaya'* | `red aglaonema` · `aglaonema pattaya` |
| 6 | `filodendro-dark-lord.jpg` | Filodendro Dark Lord | *Philodendron 'Dark Lord'* | `philodendron dark lord` · `red dark philodendron` |
| 7 | `filodendro-pink-princess.jpg` | Filodendro Pink Princess | *Philodendron erubescens 'Pink Princess'* | `pink princess philodendron` · `pink princess plant` |
| 8 | `monstera-adansonii.jpg` | Monstera Adansonii | *Monstera adansonii* | `monstera adansonii` · `swiss cheese plant` |
| 9 | `zz-plant.jpg` | ZZ Plant | *Zamioculcas zamiifolia* | `zz plant` · `zamioculcas` |
| 10 | `sansevieria-golden.jpg` | Sansevieria Golden | *Dracaena trifasciata 'Golden Hahnii'* | `sansevieria golden` · `snake plant golden` |
| 11 | `anturio-rojo.jpg` | Anturio Rojo | *Anthurium andraeanum* | `red anthurium` · `anthurium andraeanum` |
| 12 | `anturio-amarillo-chocolate.jpg` | Anturio Amarillo / Chocolate | *Anthurium andraeanum (vars.)* | `yellow anthurium` · `chocolate anthurium` (cualquier color raro de Anthurium) |
| 13 | `tillandsia.jpg` | Tillandsia | *Tillandsia spp.* | `air plant` · `tillandsia` · `epiphyte plant` |
| 14 | `jazmin-limon.jpg` | Jazmín Limón | *Murraya paniculata* | `murraya paniculata` · `orange jasmine plant` |
| 15 | `cuerno-de-alce.jpg` | Cuerno de Alce | *Platycerium bifurcatum* | `staghorn fern` · `platycerium` · `wall mounted fern` |
| 16 | `anturio-cristalino.jpg` | Anturio Cristalino | *Anthurium crystallinum* | `anthurium crystallinum` · `velvet anthurium` |
| 17 | `filodendro-gloriosum.jpg` | Filodendro Gloriosum | *Philodendron gloriosum* | `philodendron gloriosum` · `crawling philodendron` |
| 18 | `maranta-prayer-plant.jpg` | Maranta Prayer Plant | *Maranta leuconeura* | `prayer plant` · `maranta leuconeura` · `red veined maranta` |

---

## 5. Imagen Hero

| Slug | Búsqueda recomendada |
|---|---|
| `hero.jpg` | `tropical plant interior` · `monstera home` · `indoor jungle` · `philodendron interior design` · `Lima apartment plants` |

Buscar fotos donde:
- La planta tenga presencia y sea claramente amazónica/tropical.
- El interior sea moderno y limpio (no demasiado ornamentado).
- Hay luz natural lateral o cenital suave.
- Hay espacio negativo a un lado (para el headline del Hero).

---

## 6. Checklist de verificación final

Antes de "darlo por terminado", verifica:

- [ ] Hay exactamente 19 archivos: 1 hero + 18 plantas.
- [ ] Todos los nombres coinciden con los slugs exactos (todo minúsculas, sin acentos, separados por guiones).
- [ ] Cada imagen pesa menos de 350 KB (Hero) o 250 KB (plantas).
- [ ] Cada planta tiene una imagen DE su especie (o muy parecida visualmente). No usar la misma foto para múltiples plantas.
- [ ] Las imágenes son coherentes en estilo entre sí (no mezclar ultra-saturadas con descoloridas).
- [ ] Pet-friendly y no-pet-friendly se ven igual (no marcar visualmente — eso lo hace el badge en código).
- [ ] Has reemplazado los archivos en `public/images/` directamente — no necesitas tocar `data/plants.json`.

Una vez listo, hacer `git add public/images && git commit -m "feat(content): replace placeholders with curated photography"`.

---

## 7. Si te quedas sin tiempo

Es aceptable lanzar el MVP con algunas (o todas) las plantas usando placeholder, **siempre que el Hero esté curado**. La imagen del Hero carga la primera impresión; las del catálogo se pueden ir reemplazando post-launch.

Prioridad sugerida si tienes tiempo limitado:
1. Hero (no negociable).
2. Las 5 plantas Signature (más caras, más memorables): Alocasia Amazónica, Filodendro Dark Lord, Filodendro Pink Princess, Anturio Cristalino, Filodendro Gloriosum.
3. Las 4 plantas Básicas: Pothos Golden, Aglaonema Rosada, Tillandsia, Maranta Prayer Plant.
4. Las 9 Premium en cualquier orden.
