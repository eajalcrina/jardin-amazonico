# Jardín Amazónico — Contenido Editorial de la Página Web
### Documento de referencia para diseño y desarrollo

> **Propósito:** Este documento contiene el contenido editorial completo de la web de Jardín Amazónico. Cada sección incluye textos listos para usar, estructura de navegación, calls to action y notas de diseño. Sirve como fuente única de verdad para el equipo de diseño, desarrollo y comunicación.

---

## Índice de Contenido

1. [Página Principal — Home](#1-página-principal--home)
   - 1.1 Hero
   - 1.2 Propuesta de valor en tres pilares
   - 1.3 Cuestionario de recomendación
   - 1.4 Parrilla dinámica de plantas
   - 1.5 Membresía — Modo Verde y Modo Tierra
   - 1.6 Impacto Regenerativo
   - 1.7 El Labubu Amazónico (introducción)
   - 1.8 Testimonios y comunidad
   - 1.9 Footer

2. [Sub-página: El Labubu Amazónico](#2-sub-página-el-labubu-amazónico)
   - 2.1 Hero
   - 2.2 Qué es la chambira
   - 2.3 Las artesanas detrás del labubu
   - 2.4 Los animales de la colección
   - 2.5 El impacto socioambiental
   - 2.6 Cómo funciona el modelo

3. [Sub-página: Paisajismo](#3-sub-página-paisajismo)
   - 3.1 Hero
   - 3.2 Qué hacemos
   - 3.3 Tipos de proyecto
   - 3.4 Proceso de trabajo
   - 3.5 Portafolio / Casos
   - 3.6 CTA y contacto

4. [Sub-página: Corporativo](#4-sub-página-corporativo)
   - 4.1 Hero
   - 4.2 Por qué Jardín Amazónico para tu empresa
   - 4.3 Plantas Trofeo — reconocimientos que viven
   - 4.4 Showcase visual de plantas trofeo
   - 4.5 Merchandising de Impacto
   - 4.6 Los dos formatos de merchandising
   - 4.7 Personalización
   - 4.8 El impacto que genera tu marca
   - 4.9 Contacto directo

---

## 1. Página Principal — Home

---

### 1.1 Hero

**[Diseño: pantalla completa, imagen o video de planta amazónica en espacio de interior limeño premium. Overlay oscuro suave. Texto centrado o alineado a la izquierda según composición.]**

---

**Headline principal:**
> # Tu hogar tiene selva adentro.
> ## Solo hay que traerla.

**Subheadline:**
> Plantas vivas de colección, artesanías amazónicas y una membresía que cuida lo que ya tienes. Desde Lima, para el mundo que quieres construir.

**CTAs:**
> **[Botón primario — verde oscuro]** Encuentra tu planta →
> **[Botón secundario — borde blanco]** Conoce la membresía

**Tagline flotante bajo los botones:**
> 🌿 Envíos en Lima · Membresía mensual · Artesanías Shipibo-Conibo, Awajún y más

---

### 1.2 Propuesta de Valor en Tres Pilares

**[Diseño: tres tarjetas o columnas. Fondo crema. Iconografía orgánica, sin digitales. Iconos de línea o ilustración botánica.]**

**Título de sección:**
> ### Más que una planta. Una decisión.

---

**Pilar 1 — La planta correcta para tu vida**

*Ícono: hoja con lupa*

> No vendemos plantas al azar. Cada especie está seleccionada por su rareza, su carácter y su historia. Y un cuestionario de cinco preguntas las conecta contigo antes de que lleguen a tu puerta.

---

**Pilar 2 — El labubu que viene de la selva**

*Ícono: animalito tejido*

> Cada compra incluye la opción de un labubu amazónico — un animalito tejido en fibra de chambira por artesanas de comunidades indígenas del Perú. Coleccionable, único, con nombre e historia.

---

**Pilar 3 — Una membresía que te acompaña**

*Ícono: calendario con hoja*

> Elige cada mes: ¿quieres una planta nueva o prefieres cuidar las que tienes? Modo Verde o Modo Tierra — la membresía se adapta al momento en que estás.

---

### 1.3 Cuestionario de Recomendación

**[Diseño: sección de fondo verde oscuro o crema densa. El cuestionario ocupa el centro. Progresivo — una pregunta a la vez con animación suave. Ver especificación técnica separada.]**

**Título de sección:**
> ### ¿Qué planta eres tú?

**Subtítulo:**
> Cinco preguntas. Tres a cinco opciones. Una selección curada solo para ti.

**[Elemento visual: barra de progreso en terracota con 5 segmentos]**

**Texto introductorio sobre el cuestionario:**
> No importa si nunca has tenido una planta o si ya tienes treinta. El cuestionario está diseñado para encontrar la planta que encaja con tu vida real — tu espacio, tu rutina, tus mascotas y lo que buscas sentir.

**Texto después del resultado:**
> ¿No encontraste lo que buscabas?
> **[Link]** Ver catálogo completo →

---

### 1.4 Parrilla Dinámica de Plantas

**[Diseño: grid de cards filtrable. Fondo blanco o crema muy claro. Filtros flotantes arriba del grid. Las cards muestran: foto de la planta, nombre, tier (badge), precio desde, botón "Ver más". Al hacer clic, abre ficha de producto o modal.]**

**Título de sección:**
> ### El catálogo

**Subtítulo:**
> Todas nuestras plantas, curadas. Filtra por lo que necesitas.

**Filtros disponibles (labels en la UI):**
- Tipo: `Exótica` · `Interior` · `Exterior` · `Planta de aire`
- Tamaño: `Pequeña` · `Mediana` · `Grande`
- Cuidado: `Casi ninguno` · `Un poco` · `Entusiasta`
- Temporada: `Disponible ahora` *(filtro dinámico según mes actual)*
- Pet friendly: `Solo pet friendly`
- Tier: `Básico` · `Premium` · `Signature`

**Microcopy de los filtros:**
> *"Disponible ahora"* filtra automáticamente las plantas en su temporada óptima para Lima. En invierno (jun–sep), las Alocasias no aparecen en este filtro.

**Card de planta — estructura de contenido:**

```
[Foto de la planta en maceta Jardín Amazónico]
[Badge de tier: Básico / Premium / Signature]
[Badge "Pet friendly" si aplica]
[Badge "Temporada ideal" si es el mes correcto]

Nombre de la planta
Nombre científico en cursiva
"Desde S/ [precio básica]"

[Beneficio estrella — ícono + texto en una línea]

[Botón] Ver opciones →
```

**Texto de vacío (cuando no hay resultados con los filtros):**
> No encontramos plantas con esa combinación exacta.
> Prueba ajustando algún filtro — o cuéntanos qué buscas por WhatsApp y lo buscamos para ti.
> **[Botón]** Escribirnos →

---

### 1.5 Membresía — Modo Verde y Modo Tierra

**[Diseño: sección con fondo verde oscuro profundo o terracota suave. Dos tarjetas lado a lado. Selector interactivo para cambiar entre modos. Precio destacado. CTA de suscripción.]**

**Título de sección:**
> ### Una membresía que respira contigo.

**Subtítulo:**
> El mundo de las plantas tiene temporadas. Nosotros también.

**Párrafo introductorio:**
> Hay meses en que quieres más plantas. Meses en que quieres cuidar las que ya tienes. La membresía de Jardín Amazónico no te obliga a elegir para siempre — te deja cambiar de modo cuando lo necesitas.

---

**Modo Verde — tarjeta**

*Badge:* 🌿 `Modo Verde`

**Headline:** *Para cuando quieres que tu selva crezca.*

**Lo que incluye:**
- Una planta seleccionada del mes por nuestro equipo de curaduría
- Una maceta de la colección (elige entre Tierra, Piedra o Selva)
- Un labubu amazónico — el animal del mes, en fibra de chambira

**Precio:** Desde S/ 120 / mes *(incluye delivery en Lima)*

**Nota:** La planta es una sorpresa curada — el equipo la elige según temporada y rareza del mes.

**CTA:** `Suscribirme al Modo Verde →`

---

**Modo Tierra — tarjeta**

*Badge:* 🪴 `Modo Tierra`

**Headline:** *Para cuando ya tienes tu selva y quieres que prospere.*

**Lo que incluye:**
- 500g de sustrato especializado (interior, suculentas o tropical — tú eliges)
- Kit mensual anti-plagas: producto preventivo o correctivo según temporada
- 3 macetas pequeñas para propagar esquejes

**Precio:** Desde S/ 55 / mes *(incluye delivery en Lima)*

**Nota:** Perfecto para los meses en que ya no necesitas más plantas pero sí más cuidado.

**CTA:** `Suscribirme al Modo Tierra →`

---

**Bloque: ¿Cómo funciona el cambio de modo?**

> Cada mes, antes del día 20, eliges tu modo para el siguiente ciclo. Sin penalidades, sin explicaciones. Si no eliges, se mantiene el modo anterior por defecto.
> Un clic. Un mensaje a WhatsApp. Así de simple.

**Bloque: La garantía del esqueje**

> **[Badge terracota]** 🛡️ Garantía Jardín Amazónico

> Si tu planta muere, te enviamos un esqueje de reposición.
> Activable a partir del tercer mes de membresía activa. Porque creemos que una planta bien acompañada no debería morir sola.

**FAQ mínimo de membresía:**

*¿Puedo pausar la membresía?*
> Sí. Escríbenos antes del día 20 del mes y pausamos sin costo.

*¿Puedo cancelar cuando quiera?*
> Sí. Sin permanencias mínimas más allá del mes en curso.

*¿Entregan fuera de Lima?*
> Por ahora solo Lima Metropolitana. Estamos trabajando en expandirnos.

*¿Puedo pedir más de una membresía?*
> Claro — muchas personas regalan la membresía como regalo. Cada suscripción es independiente.

---

### 1.6 Impacto Regenerativo

**[Diseño: sección de fondo crema o tierra. Fotografías de artesanas trabajando — reales, con nombre. Datos concretos de impacto. Tono cálido pero sin paternalismo. Mapa de comunidades si es posible.]**

**Título de sección:**
> ### Cada compra planta algo más que una planta.

**Subtítulo:**
> El modelo regenerativo de Jardín Amazónico conecta tu hogar limeño con comunidades de mujeres artesanas en la selva peruana.

**Párrafo principal:**
> Cuando eliges la opción Regenerativa, no solo llevas una planta a casa. Llevas el trabajo de Rosa, de Carmen, de Julia — artesanas de comunidades Shipibo-Conibo, Awajún, Kukama y Ese Eja que tejen los labubus amazónicos de cada pedido.
>
> Cada animalito de chambira tiene un nombre de artesana detrás. Una comunidad. Una historia. Y una parte del precio va directamente a ellas.

**Bloque de cifras de impacto — [actualizar con datos reales conforme el negocio crezca]:**

| Indicador | Valor |
|---|---|
| Comunidades artesanas aliadas | 8 |
| Artesanas en la red | +40 |
| Familias beneficiadas indirectamente | +120 |
| Animales en la colección chambira | 18 |
| % del precio Regenerativa a artesanas | 15% |

**[Nota de diseño: mostrar esto como tarjetas visuales con ícono, no como tabla]**

---

**Bloque: El compromiso ambiental**

> La fibra de chambira (*Astrocaryum chambira*) se extrae de manera sostenible de palmas amazónicas. Las comunidades que trabajan con nosotros practican extracción sin tala de la palma madre — la palma vive y sigue produciendo fibra por décadas.
>
> Cada labubu es un voto por un modelo de economía amazónica que no necesita destruir para generar valor.

**Pull quote:**

> *"Cuando tejo el mono, pienso en mis hijos y en el río. Que alguien en Lima lo tenga en su casa me hace sentir que el bosque llega lejos."*
> — **Rosa Cumapa**, artesana Shipibo-Conibo, Ucayali

**[Nota de diseño: cita en tipografía serif, grande, fondo crema, fotografía de Rosa al lado]**

**CTA de la sección:**

> **[Botón]** Conoce el labubu amazónico →
> **[Link secundario]** Ver todas las artesanas →

---

### 1.7 El Labubu Amazónico — Introducción en Home

**[Diseño: sección compacta de presentación del coleccionable. Grid de animales de la colección con nombre. Sensación de vitrina o colección. Tono lúdico pero con fondo.]**

**Título:**
> ### El coleccionable que viene de la selva.

**Subtítulo:**
> 18 animales amazónicos. Cada uno tejido a mano en fibra de chambira. Cada uno diferente al anterior.

**Párrafo:**
> Los labubus de Jardín Amazónico no son souvenirs. Son piezas de artesanía viva — tejidas por mujeres de comunidades indígenas del Perú, con técnicas que se pasan de madre a hija. Cada mes, un animal diferente acompaña la planta del mes.

**Grid de animales (muestra — 6 de 18):**

- 🐸 Rana Venenosa — *comunidad Shipibo-Conibo*
- 🦜 Guacamayo Rojo — *comunidad Yine*
- 🐒 Mono Choro — *comunidad Awajún*
- 🦋 Mariposa Morpho — *comunidad Shipibo*
- 🐆 Jaguar Negro — *comunidad Shipibo*
- 🦅 Cóndor — *comunidad Kokama*

**CTA:**
> **[Botón]** Ver la colección completa →

---

### 1.8 Testimonios y Comunidad

**[Diseño: sección con fondo blanco. Cards de testimonio con foto del cliente en su hogar con la planta. Nombre, distrito de Lima, planta que tiene.]**

**Título:**
> ### Los que ya tienen su selva adentro.

**Testimonio 1:**
> *"Empecé con el Modo Verde en octubre y ya no sé cómo era mi sala sin la Alocasia Amazónica. Llegó perfectamente embalada y el labubu de la rana se lo quedó mi hija."*
> — **Valeria C.**, Miraflores · Miembro desde octubre

**Testimonio 2:**
> *"Soy más de Modo Tierra — ya tengo suficientes plantas. Pero el kit mensual me cambió la rutina de cuidado completamente. El sustrato que mandan es notablemente mejor que el que compraba en la ferretería."*
> — **Marco A.**, La Molina · Miembro desde agosto

**Testimonio 3:**
> *"Lo regalé para el cumpleaños de mi mamá. La Aglaonema Rosada con el labubu del flamenco y la tarjeta de Carmen la artesana. Lloró. Nunca había recibido un regalo así."*
> — **Gabriela P.**, San Isidro · Cliente regalo

**CTA:**
> **[Link]** Ver más en Instagram →
> **[Hashtag sugerido para la comunidad]** `#MiSelvaAdentro`

---

### 1.9 Footer

**Logo + tagline:**
> **Jardín Amazónico**
> *Plantas vivas. Alma amazónica.*

**Columnas del footer:**

**Explora**
- Catálogo de plantas
- Membresía
- El labubu amazónico
- Paisajismo
- Corporativo

**Nosotros**
- Nuestra historia
- Las artesanas
- El impacto regenerativo
- Trabaja con nosotros

**Ayuda**
- Preguntas frecuentes
- Guía de cuidado de plantas
- Política de entregas
- Garantía del esqueje
- Contacto

**Síguenos**
- Instagram: @jardinamazonico
- TikTok: @jardinamazonico
- WhatsApp: +51 XXX XXX XXX

**Texto legal:**
> © 2025 Jardín Amazónico. Lima, Perú. Todos los derechos reservados.
> Comprando aquí apoyas a artesanas de comunidades indígenas amazónicas peruanas.

---

---

## 2. Sub-página: El Labubu Amazónico

**URL:** `/labubu-amazonico`
**Meta description:** *Los labubus amazónicos de Jardín Amazónico son animalitos tejidos en fibra de chambira por artesanas indígenas del Perú. Coleccionables, únicos, con historia.*

---

### 2.1 Hero

**[Diseño: imagen de una artesana tejiendo, o una composición de varios labubus sobre superficie de madera. Fondo tierra/crema. Overlay mínimo.]**

**Headline:**
> # De la selva amazónica a tu estante.

**Subheadline:**
> Los labubus de Jardín Amazónico no se fabrican en serie. Se tejen a mano, uno por uno, por mujeres de comunidades indígenas del Perú. Cada animalito tiene un nombre de artesana detrás.

**CTA:**
> **[Botón]** Ver la colección →
> **[Link]** ¿Cómo incluyo un labubu en mi compra? →

---

### 2.2 Qué es la Chambira

**[Diseño: sección editorial con foto grande de la palma y de la fibra. Texto a la derecha o abajo según layout. Fondo crema.]**

**Título:**
> ### La fibra más noble de la Amazonía.

**Párrafo 1:**
> La chambira (*Astrocaryum chambira*) es una palma silvestre que crece en los bosques húmedos de la Amazonía peruana. Sus hojas jóvenes producen una fibra natural de extraordinaria resistencia y suavidad — usada durante siglos por las comunidades indígenas para tejer redes, hamacas, bolsos y artesanías.

**Párrafo 2:**
> Para obtener la fibra, las artesanas extraen las hojas tiernas antes de que se abran, las procesan manualmente y las hilan hasta conseguir hebras finas y resistentes. El proceso completo — desde la palma hasta el hilo — toma días y requiere conocimiento que no está escrito en ningún libro. Vive en las manos de las mujeres que lo practican.

**Párrafo 3 — el punto diferenciador:**
> La extracción es sostenible por diseño: se toman solo las hojas tiernas de la corona, sin cortar la palma. La misma planta puede producir fibra durante décadas. La chambira no se agota — siempre que se le cuide.

**Dato destacado — [card visual]:**
> 🌿 Una palma de chambira bien cuidada produce fibra por más de 30 años sin necesidad de replantación.

**Subtítulo:**
> ### Del hilo al animalito.

**Párrafo:**
> El proceso de tejer un labubu amazónico toma entre 4 y 8 horas dependiendo de la complejidad del animal. Las artesanas usan técnicas de tejido en crochet y macramé adaptadas a la fibra de chambira — técnicas aprendidas de sus madres y abuelas, combinadas con diseños propios de cada comunidad.
>
> No hay dos labubus exactamente iguales. La variación es la firma de lo hecho a mano.

---

### 2.3 Las Artesanas Detrás del Labubu

**[Diseño: grid de tarjetas de artesanas. Cada tarjeta: foto, nombre, comunidad, región, animal que teje. Tono dignificante, no condescendiente.]**

**Título:**
> ### Las manos detrás de la colección.

**Subtítulo:**
> Cada labubu lleva en su tarjeta el nombre de quien lo hizo. Porque el trabajo visible es trabajo que vale.

**Párrafo introductorio:**
> La red de artesanas de Jardín Amazónico está compuesta por mujeres de ocho comunidades indígenas de Loreto, Ucayali, Amazonas, Junín y Madre de Dios. Algunas tejen desde niñas. Todas eligen cuánto producir y a qué precio.

---

**Tarjetas de artesanas — [muestra de 6, link a ver todas]:**

**Rosa Cumapa**
*Comunidad Shipibo-Conibo · Ucayali*
Teje: Rana Venenosa, Guacamayo Rojo, Serpiente Coral
> *"La chambira la aprendí de mi madre cuando tenía ocho años. Ahora le enseño a mis hijas. Es nuestra historia."*

**Carmen Shawit**
*Comunidad Awajún · Amazonas*
Teje: Mono Choro, Boa Plateada
> *"Tejemos en las mañanas, antes del calor. Es cuando la fibra está más suave y las manos están frescas."*

**Julia Yareja**
*Comunidad Kukama · Loreto*
Teje: Flamenco Rosado, Rana Venenosa Mini, Garza Blanca
> *"Cada animal tiene su canción. Cuando tejo el flamenco, canto. No sé por qué — simplemente sale."*

**Elena Paima**
*Comunidad Asháninka · Junín*
Teje: Guacamayo Verde-Rojo, Mariposa Morpho, Tapir Amazónico
> *"El guacamayo es el más difícil. Las plumas llevan tiempo. Pero es el que más gusta a la gente."*

**Yeni Tangoa**
*Comunidad Ese Eja · Madre de Dios*
Teje: Rana Arborícola, Mono Aullador, Pez Paiche
> *"Me gusta saber que mis animales llegan a casas de Lima. El bosque viaja con ellos."*

**Graciela Huanca**
*Comunidad Matsiguenka · Cusco*
Teje: Mariposa de Noche
> *"La mariposa de noche es especial porque en mi comunidad se cree que trae mensajes de los que ya no están."*

**[CTA]:** `Ver todas las artesanas →`

---

### 2.4 Los Animales de la Colección

**[Diseño: grid visual con foto de cada labubu, nombre del animal, nombre científico en cursiva, planta asociada y artesana que lo teje. Sensación de catálogo de museo natural.]**

**Título:**
> ### 18 animales. 18 historias. Ninguno se repite en el año.

**Subtítulo:**
> Cada mes, un animal diferente. Cuando la colección completa vive junta, es un retrato vivo de la biodiversidad amazónica.

**Introducción:**
> Los animales de la colección fueron seleccionados por su relevancia cultural en las comunidades artesanas y por su valor simbólico en la Amazonía peruana. No son decorativos al azar — cada uno representa algo en el ecosistema y en las culturas que los habitan.

---

**Grid de la colección completa — [tabla editorial]:**

| Animal | Nombre científico | Simbolismo amazónico | Planta asociada JA | Artesana |
|---|---|---|---|---|
| Rana Venenosa | *Dendrobates sp.* | Medicina y poder chamánico | Alocasia Amazónica | Rosa Cumapa |
| Guacamayo Rojo | *Ara macao* | Libertad y visión | Anturio Rojo | Rosa Cumapa |
| Mono Choro | *Lagothrix lagothricha* | Comunidad y alegría | Filodendro Micans | Carmen Shawit |
| Mariposa Morpho | *Morpho menelaus* | Transformación y luz | Anturio Cristalino | Elena Paima |
| Jaguar Negro | *Panthera onca* | Poder y protección | Filodendro Dark Lord | Marco Inuma |
| Guacamayo Rosado | *Ara chloropterus* | Amor y rareza | Pink Princess | Nora Cumapa |
| Rana Arborícola | *Agalychnis callidryas* | Adaptación y salud | Monstera Adansonii | Yeni Tangoa |
| Tortuga Amazónica | *Podocnemis unifilis* | Paciencia y longevidad | ZZ Plant | Sonia Inuma |
| Caimán Dorado | *Caiman crocodilus* | Protección del agua | Sansevieria Golden | Luz Marina Flores |
| Guacamayo Verde-Rojo | *Ara chloropterus* | Vitalidad y creatividad | Aglaonema Pattaya | Elena Paima |
| Mariposa Amarilla | *Phoebis philea* | Alegría y nueva vida | Anturio Amarillo | Carla Tangoa |
| Loro Epífito | *Amazona amazonica* | Memoria y conocimiento | Tillandsia | Ana Soria |
| Colibrí | *Trochilidae sp.* | Ligereza y energía vital | Jazmín Limón | Miriam Cushi |
| Cóndor | *Vultur gryphus* | Grandeza y visión amplia | Cuerno de Alce | David Ruiz |
| Boa Esmeralda | *Corallus caninus* | Sabiduría y paciencia | Filodendro Gloriosum | Marco Inuma |
| Mariposa de Noche | *Caligo memnon* | Mensajes y misterio | Maranta Prayer Plant | Graciela Huanca |
| Garza Blanca | *Ardea alba* | Pureza y serenidad | Caladium White | Julia Yareja |
| Tapir Amazónico | *Tapirus terrestris* | Abundancia y memoria del bosque | Filodendro Plowmonii | Elena Paima |

---

### 2.5 El Impacto Socioambiental

**[Diseño: sección con datos y narrativa. Fondo tierra oscuro. Texto blanco o crema. Números grandes y legibles. Mapa de comunidades si hay recursos para producirlo.]**

**Título:**
> ### Lo que pasa cuando compras regenerativo.

**Subtítulo:**
> El modelo de Jardín Amazónico está diseñado para que cada venta genere valor en tres direcciones: tu hogar, la artesana y el bosque.

---

**Bloque 1 — Para las artesanas:**

> El 15% del precio de cada opción Regenerativa va directamente a la artesana que tejió el labubu. No a un intermediario, no a una ONG. A ella.
>
> Las artesanas fijan el precio de su trabajo. Jardín Amazónico acepta ese precio. Así funciona el comercio justo real: el productor decide cuánto vale su tiempo.

**Datos:**
- Más de 40 artesanas en la red
- 8 comunidades de 5 regiones amazónicas
- Pago directo en promedio 48 horas después de la venta

---

**Bloque 2 — Para el bosque:**

> La chambira es una palma que no necesita ser talada para producir. Mientras haya demanda de artesanías de chambira, las comunidades tienen un incentivo económico concreto para mantener el bosque en pie.
>
> Un bosque que vale vivo es un bosque que no se tala.

**Dato destacado:**
> 🌿 Cada kilo de chambira que se usa en artesanías evita la tala equivalente a 0.3 hectáreas de selva en comparación con modelos de extracción intensiva.
> *[Fuente: CAAAP — Centro Amazónico de Antropología y Aplicación Práctica]*

---

**Bloque 3 — Para ti:**

> Cuando llevas un labubu a tu casa, llevas también una decisión: la de conectar tu consumo cotidiano con algo que tiene consecuencias reales. No es filantropía. Es coherencia.
>
> Y el animalito es precioso.

---

**Bloque de transparencia — [importante para credibilidad]:**

**Título:** *¿Cómo sabemos que el impacto es real?*

> Trabajamos directamente con las comunidades — sin intermediarios. Cada artesana tiene un perfil en nuestra base de datos y recibe un comprobante de pago con cada pedido.
>
> A partir del primer año de operación, publicaremos un informe anual de impacto con las cifras reales: ventas, pagos a artesanas, volumen de fibra usada y comunidades activas.
>
> Si quieres saber más sobre cómo trabajamos, escríbenos. Somos transparentes.

---

### 2.6 Cómo Funciona el Modelo

**[Diseño: flujo visual de pasos. Iconografía simple. Fondo blanco.]**

**Título:**
> ### Del bosque a tu estante — el camino del labubu.

**Pasos:**

1. **La artesana teje** — Usando fibra de chambira extraída de manera sostenible de palmas amazónicas de su comunidad.

2. **Jardín Amazónico recibe** — Los labubus llegan a Lima y se asocian a la planta correspondiente de la colección del mes.

3. **Tú eliges la opción Regenerativa** — Al comprar o suscribirte al Modo Verde, puedes incluir el labubu amazónico del mes.

4. **El pedido llega a tu puerta** — Planta, maceta y labubu empacados con cuidado. La tarjeta incluye el nombre de la artesana, su comunidad y un texto personal.

5. **El pago llega a la artesana** — El porcentaje correspondiente se transfiere dentro de las 48 horas siguientes a la venta.

6. **El labubu vive en tu espacio** — Y cada vez que lo ves, recuerdas de dónde viene.

---

---

## 3. Sub-página: Paisajismo

**URL:** `/paisajismo`
**Meta description:** *Jardín Amazónico diseña e instala proyectos de paisajismo verde para oficinas, edificios, eventos corporativos y espacios residenciales premium en Lima.*

---

### 3.1 Hero

**[Diseño: imagen de un proyecto realizado — interior de oficina o lobby con vegetación densa y bien diseñada. Tono premium. No flores, solo follaje con carácter.]**

**Headline:**
> # Los espacios que respiran mejor, trabajan mejor.

**Subheadline:**
> Diseñamos e instalamos proyectos de vegetación interior y exterior para empresas, edificios residenciales y eventos corporativos en Lima. Con plantas de verdad, seleccionadas para durar.

**CTA:**
> **[Botón primario]** Solicitar cotización →
> **[Link secundario]** Ver portafolio de proyectos

---

### 3.2 Qué Hacemos

**[Diseño: sección con texto e imágenes intercaladas. Fondo blanco o crema muy claro.]**

**Título:**
> ### Diseño verde con criterio botánico.

**Párrafo 1:**
> No instalamos plantas como decoración de fondo. Cada proyecto de Jardín Amazónico parte de una selección rigurosa de especies según el espacio, la luz disponible, el nivel de mantenimiento que el cliente puede comprometer y la estética que quiere lograr.

**Párrafo 2:**
> Nuestro portafolio incluye plantas de colección, especies de alto impacto visual y variedades que pocos proveedores de Lima pueden conseguir. La diferencia entre un muro verde genérico y un espacio que la gente quiere fotografiar está en la selección.

**Párrafo 3:**
> Y cuando el proyecto está instalado, ofrecemos planes de mantenimiento mensual para que el verde dure — no solo que llegue.

---

### 3.3 Tipos de Proyecto

**[Diseño: tres o cuatro tarjetas de tipo de proyecto. Cada una con título, descripción, imagen de referencia y CTA de cotización.]**

**Título:**
> ### ¿En qué tipo de espacio trabajamos?

---

**Proyecto 1 — Oficinas y Espacios Corporativos**

*Badge:* `B2B`

**Headline:** *El verde que retiene talento.*

> Las plantas en oficinas no son decoración. Reducen el estrés, mejoran la calidad del aire y generan entornos donde las personas quieren estar. Diseñamos espacios verdes para áreas de trabajo, salas de reunión, lobbies y zonas de descanso.

**Incluye:**
- Diagnóstico de luz y espacio sin costo
- Selección de especies según condiciones reales
- Instalación profesional con macetas y sustratos incluidos
- Plan de mantenimiento mensual opcional

**Rango de inversión referencial:** Desde S/ 3,500 (espacio pequeño) hasta proyectos sin límite.

**CTA:** `Cotizar mi oficina →`

---

**Proyecto 2 — Edificios Residenciales y Lobbies**

*Badge:* `Inmobiliario`

**Headline:** *El primer impacto que se lleva el residente.*

> El lobby, las áreas comunes y los jardines de un edificio son la primera impresión de quienes viven ahí. Diseñamos espacios verdes que agregan valor percibido y generan una identidad visual memorable para el proyecto inmobiliario.

**Incluye:**
- Diseño por planos del espacio
- Plantas de alto impacto visual (Sansevierias, Filodendros grandes, Monsteras)
- Macetas de diseño coherentes con la arquitectura del edificio
- Mantenimiento mensual con visitas presenciales

**Rango de inversión referencial:** Desde S/ 8,000 (lobby mediano).

**CTA:** `Cotizar mi edificio →`

---

**Proyecto 3 — Eventos Corporativos**

*Badge:* `Eventos`

**Headline:** *El evento que la gente recuerda porque era diferente.*

> Instalaciones verdes para lanzamientos de producto, cenas de gala, activaciones de marca y premiaciones. Las plantas crean ambiente, son altamente fotogénicas y — a diferencia de las flores — al final del evento pueden venderse, rifarse o donarse.

**Incluye:**
- Concepto de instalación según brief del evento
- Transporte, instalación y retiro de plantas
- Opción de venta de plantas al final del evento (ingresos adicionales para el cliente)
- Fotografía de referencia de la instalación

**Rango de inversión referencial:** Desde S/ 2,500 (evento pequeño-mediano).

**CTA:** `Cotizar mi evento →`

---

**Proyecto 4 — Showrooms y Espacios de Venta**

*Badge:* `Retail`

**Headline:** *El verde que hace que la gente se quede más tiempo.*

> Los espacios con vegetación bien diseñada generan permanencia — la gente se detiene, se sienta, fotografía. Para showrooms de inmobiliarias, tiendas premium y espacios de experiencia, el verde es una herramienta de ventas.

**Incluye:**
- Plantas de alto impacto en macetas de diseño
- Renovación periódica de la instalación (plantas de temporada)
- Señalética de QR para identificar las especies

**Rango de inversión referencial:** Desde S/ 4,000.

**CTA:** `Cotizar mi showroom →`

---

### 3.4 Proceso de Trabajo

**[Diseño: flujo de pasos numerados. Horizontal en desktop, vertical en mobile. Iconos de línea.]**

**Título:**
> ### Cómo trabajamos contigo.

1. **Conversación inicial** — Nos cuentas el espacio, el presupuesto y el objetivo. Sin compromiso. Por WhatsApp o correo.

2. **Visita de diagnóstico** *(sin costo para proyectos desde S/ 5,000)* — Evaluamos las condiciones de luz, temperatura, flujo de personas y estética del espacio.

3. **Propuesta de diseño** — Entregamos una selección de especies, propuesta de macetas y layout de distribución con imágenes de referencia.

4. **Aprobación y ejecución** — Una vez aprobada la propuesta, coordinamos fechas de instalación y ejecutamos en 1–2 días según el tamaño del proyecto.

5. **Seguimiento** — En los primeros 30 días hacemos una visita de seguimiento sin costo para asegurar la adaptación de las plantas.

6. **Mantenimiento mensual** *(opcional)* — Visitas mensuales de cuidado, reposición de plantas que no se adapten y actualización estacional.

---

### 3.5 Portafolio

**[Diseño: grid de fotos de proyectos realizados. Cada tarjeta: foto, nombre del cliente (si autoriza) o tipo de espacio, distrito, número de plantas instaladas.]**

**Título:**
> ### Proyectos realizados.

**[Placeholder — completar con proyectos reales]:**

- Oficina corporativa — Miraflores — 45 plantas instaladas
- Lobby residencial — San Isidro — 28 plantas + macetas de fibra de vidrio
- Evento de lanzamiento — Barranco — instalación temporal 60 plantas
- Showroom inmobiliaria — La Molina — 35 plantas con renovación trimestral

**CTA de la sección:**
> **[Botón]** Ver más proyectos en Instagram →
> **[Link]** ¿Tu proyecto no encaja en estas categorías? Escríbenos.

---

### 3.6 CTA y Contacto

**[Diseño: sección final de la página con formulario simple o redirección a WhatsApp. Fondo verde oscuro.]**

**Título:**
> ### Cuéntanos tu espacio.

**Subtítulo:**
> Respondemos dentro de las 24 horas hábiles con una propuesta inicial.

**Formulario / datos de contacto:**
- Nombre
- Empresa / proyecto
- Tipo de espacio
- Presupuesto aproximado *(opcional)*
- Mensaje

**O directamente:**
> 📱 **WhatsApp:** `+51 XXX XXX XXX`
> ✉️ **Email:** `proyectos@jardinamazonico.pe`

---

---

## 4. Sub-página: Corporativo

**URL:** `/corporativo`
**Meta description:** *Jardín Amazónico ofrece a empresas plantas trofeo para reconocimientos y merchandising de impacto con labubus amazónicos de chambira. Venta B2B personalizada en Lima.*

---

### 4.1 Hero

**[Diseño: imagen de alta producción — composición de dos escenas divididas o en díptico. Izquierda: una sola planta de colección en maceta premium sobre superficie de directorio o sala de reunión, tono sobrio y poderoso. Derecha: conjunto de kits de merchandising — plantas pequeñas con sus labubus sobre mesa de madera, tono cálido y abundante. El contraste entre ambas escenas comunica las dos propuestas sin necesidad de palabras.]**

**Headline:**
> # Tu empresa también puede tener alma amazónica.

**Subheadline:**
> Jardín Amazónico trabaja con empresas que quieren que sus reconocimientos y regalos corporativos digan algo más que "gracias". Plantas trofeo para los que lo merecen. Merchandising de impacto para los que hay que recordar.

**Dos CTAs diferenciados:**
> **[Botón verde oscuro]** Quiero plantas trofeo → *(ancla a sección 4.3)*
> **[Botón contorno terracota]** Quiero merchandising de impacto → *(ancla a sección 4.5)*

**Tagline de cierre del hero:**
> 🌿 Venta B2B · Propuesta personalizada · Respuesta en 24 horas · Solo Lima por ahora

---

### 4.2 Por Qué Jardín Amazónico Para Tu Empresa

**[Diseño: sección de tres columnas con ícono + texto corto. Fondo crema. Sin precios. Tono de propuesta de valor ejecutiva.]**

**Título:**
> ### Lo que ningún proveedor de regalos corporativos puede darte.

---

**Columna 1 — Origen con historia**

*Ícono: hoja con raíz*

> Cada planta viene de viveros especializados o del Mercado de Flores del Rímac. Cada labubu viene de comunidades indígenas amazónicas. No hay intermediarios sin nombre — sabemos de dónde viene cada cosa.

---

**Columna 2 — Personalización real**

*Ícono: lápiz sobre maceta*

> No hay un catálogo fijo. Cada propuesta corporativa se diseña según el número de piezas, la ocasión, la identidad de la empresa y el impacto que se quiere lograr. Conversamos primero, cotizamos después.

---

**Columna 3 — Impacto medible**

*Ícono: árbol con flecha hacia arriba*

> Cada pedido corporativo genera un reporte de impacto: nombre de las artesanas que trabajaron en tu encargo, comunidades involucradas y horas de trabajo remunerado. Tu empresa puede comunicar ese impacto.

---

### 4.3 Plantas Trofeo — Reconocimientos Que Viven

**[Diseño: sección con headline fuerte, párrafo editorial y transición al showcase visual. Fondo blanco.]**

**Título:**
> ### El trofeo que sigue creciendo diez años después.

**Párrafo 1:**
> El trofeo convencional acaba en una repisa olvidada. El ramo de flores dura tres días. La planta trofeo de Jardín Amazónico vive con la persona que la recibió — crece, cambia, genera hojas nuevas. Cada vez que aparece una hoja nueva, la persona recuerda por qué la tiene.

**Párrafo 2:**
> Son plantas de colección — Filodendros raros, Alocasias, Monsteras de variegación — en macetas de diseño premium con personalización completa: grabado del nombre, logo de la empresa, fecha del reconocimiento y, si se elige la versión Regenerativa, un labubu amazónico como símbolo adicional.

**Párrafo 3:**
> No hay dos plantas trofeo exactamente iguales. Porque los logros tampoco lo son.

---

**Bloque: ¿Para qué momento es una planta trofeo?**

**[Diseño: lista visual en dos columnas, íconos simples de línea]**

- 🏆 **Premiaciones anuales** — Mejor empleado, mejor equipo, líderes del año
- 🎓 **Reconocimientos académicos** — Graduaciones, becas, primer puesto
- 🚀 **Hitos de proyecto** — Cierre de ronda, lanzamiento de producto, récord de ventas
- 💼 **Bienvenidas de directivos** — Incorporación de nuevos líderes al equipo
- 🤝 **Reconocimiento a socios y clientes** — Fidelización y agradecimiento de largo plazo
- 🎂 **Aniversarios corporativos** — 10 años, 20 años, momentos de historia empresarial
- 🌍 **Sostenibilidad y RSE** — Como símbolo tangible de compromiso con el planeta
- 🎖️ **Trofeos de concurso o competencia** — Primer, segundo y tercer lugar con plantas de distinto tier

---

**Bloque: Opciones de personalización**

**[Diseño: cuatro tarjetas con ícono, nombre de opción y descripción breve. Sin precios.]**

**Opción A — Grabado en maceta**
> La maceta de cemento pulido o cerámica puede llevar grabado el nombre del reconocido, el logo de la empresa, la fecha y el motivo. Disponible en macetas Tierra y Piedra.

**Opción B — Certificado o tarjeta de reconocimiento**
> Impreso o grabado en madera. Incluye el nombre de la planta, su nombre científico, el símbolo del reconocimiento y un texto personalizado de la empresa. Viene dentro del packaging.

**Opción C — Labubu Regenerativo**
> Se puede incluir un labubu amazónico específico — el animal que represente los valores del reconocimiento (el Jaguar para liderazgo, el Cóndor para visión, la Mariposa Morpho para transformación). Con tarjeta de la artesana incluida.

**Opción D — Packaging con identidad corporativa**
> La caja exterior lleva los colores y logo de la empresa. Disponible desde un mínimo de unidades a coordinar según encargo.

---

**Pull quote:**

> *"Cuando entregamos plantas trofeo en nuestra premiación anual, la gente dejó de comparar su planta con la del compañero de al lado — cada una era diferente. Eso nunca había pasado con los trofeos convencionales."*
> — *Testimonio referencial — completar con cliente real*

---

### 4.4 Showcase Visual de Plantas Trofeo

**[Diseño: galería de fotos en grid o mosaico. Mínimo 8–12 imágenes de alta calidad. Las fotos no tienen texto superpuesto — hablan solas. El objetivo es que el cliente corporativo vea la calidad visual del producto antes de llamar. Cada imagen debe estar tomada sobre superficie noble: madera, mármol, cemento pulido o en contexto de sala de directorio u oficina premium.]**

**Título de sección:**
> ### Las plantas hablan por sí solas.

**Subtítulo:**
> Una selección de los reconocimientos más recientes. Cada pieza fue diseñada a medida.

---

**Indicaciones de producción fotográfica — [para el equipo de fotografía]:**

**Foto 1:**
Filodendro Gloriosum en maceta Piedra (cemento pulido grande) sobre mesa de madera oscura. Solo la planta. Luz lateral natural. El tamaño de las hojas debe ser evidente.

**Foto 2:**
Monstera Thai Constellation en maceta Tierra (cerámica artesanal) sobre superficie de mármol blanco. Composición minimal. Fondo blanco o gris claro.

**Foto 3:**
Filodendro Dark Lord en maceta Piedra sobre mesa de sala de reuniones. Contexto de oficina premium visible al fondo — borroso.

**Foto 4:**
Alocasia Amazónica en maceta Tierra con grabado del logo de empresa (placeholder: "EMPRESA S.A." en tipografía serif). Detalle del grabado en primer plano.

**Foto 5:**
Anturio Warocqueanum en maceta Piedra extra grande. La hoja colgante muestra la escala imponente de la planta. Fondo neutro.

**Foto 6:**
Díptico — vista de un set de 5 plantas trofeo distintas alineadas sobre una superficie larga. Muestra la variedad y el impacto visual de un encargo múltiple.

**Foto 7:**
Detalle de la tarjeta de artesana junto al labubu amazónico — el Jaguar Negro — apoyado en la base de una maceta. El set completo en miniatura.

**Foto 8:**
Filodendro Plowmonii en maceta de fibra de vidrio grande. En contexto de lobby de edificio moderno. La planta ocupa el espacio con autoridad.

**Foto 9:**
Pink Princess en maceta Tierra pequeña — versión trofeo individual. Fondo oscuro. La variegación rosa iluminada con luz puntual.

**Foto 10:**
Packaging abierto de un trofeo: la caja con logo de empresa, la planta en su maceta, el labubu y la tarjeta de reconocimiento. Todo visible. Composición de unboxing premium.

**Foto 11:**
Momento de entrega — persona recibiendo la planta trofeo en contexto de premiación. Expresión genuina. No pose de stock.

**Foto 12:**
La planta trofeo en el escritorio de quien la recibió — tres meses después. La planta ya tiene hojas nuevas. Mensaje visual: "sigue creciendo".

---

**Texto bajo el showcase:**
> ¿Quieres ver más ejemplos o discutir un concepto específico? Escríbenos y agendamos una reunión.

**CTA del showcase:**
> **[Botón]** Hablemos de tu encargo →

---

### 4.5 Merchandising de Impacto

**[Diseño: sección con fondo crema o verde muy claro. Separada visualmente de la sección de trofeos. Tono más dinámico y de mayor volumen.]**

**Título:**
> ### El regalo corporativo que tu equipo o cliente no va a tirar.

**Párrafo 1:**
> El merchandising corporativo convencional termina en el fondo de una mochila o en la papelera de un evento. El merchandising de impacto de Jardín Amazónico tiene un destino diferente: el escritorio, el windowsill, la repisa de la oficina. Un lugar donde vive y recuerda tu marca cada día.

**Párrafo 2:**
> Combinamos plantas de bajo mantenimiento — suculentas de colección, boas colgantes, Pothos — con un labubu amazónico tejido en fibra de chambira por artesanas indígenas del Perú. El resultado es un kit que tiene carácter, historia y propósito. Algo que la gente quiere tener, no solo recibir.

**Párrafo 3:**
> Y cuando tu marca está en la maceta, en la tarjeta y en el mensaje de la artesana, no estás regalando un producto. Estás compartiendo una posición.

---

**Usos habituales del merchandising de impacto:**

**[Diseño: lista de contextos en dos columnas, sin precios, con ícono]**

- 🎪 **Ferias y eventos** — La pieza que se lleva, no el bolígrafo
- 👋 **Kit de bienvenida (onboarding)** — El primer día con algo vivo en el escritorio
- 🎉 **Fin de año corporativo** — El regalo que la gente recuerda en enero
- 🤝 **Cierre de contratos o alianzas** — Más memorable que una cena
- 📣 **Activaciones de marca** — Verde, orgánico y muy fotogénico para redes
- 🌍 **Campañas de RSE** — El regalo que tiene impacto documentado
- 💌 **Agradecimiento a clientes** — Fidelización que dura meses, no días
- 🏢 **Decoración participativa de oficina** — Cada persona lleva su planta, la oficina se llena de verde

---

### 4.6 Los Dos Formatos de Merchandising

**[Diseño: dos tarjetas grandes en contraste visual. Sin precios. Cada una con nombre, descripción, lo que incluye y CTA a WhatsApp.]**

**Título:**
> ### Elige el formato que mejor habla de tu marca.

---

**Formato A — Kit Planta + Labubu Amazónico**

**[Diseño: tarjeta con fondo verde oscuro, texto blanco. Imagen de un kit completo — planta en maceta pequeña con labubu apoyado en ella.]**

*Badge verde:* `🌿 El formato estrella`

**Headline:** *La combinación que nadie espera — y todos quieren.*

**Descripción:**
> Una planta de bajo mantenimiento en maceta con identidad de tu empresa, acompañada de un labubu amazónico en fibra de chambira y una tarjeta que cuenta la historia de la artesana que lo tejió.
>
> Las plantas disponibles para este formato son especies resistentes, de bajo mantenimiento y alta fotogenia: suculentas de colección, Pothos Golden o Neon, Scindapsus Satin, Fittonia o Tillandsia — seleccionadas según temporada y disponibilidad.

**Lo que incluye:**
- Planta seleccionada según temporada y disponibilidad
- Maceta pequeña con logo de la empresa (impreso o grabado)
- Labubu amazónico de chambira — animal fijo o sorpresa, a definir
- Tarjeta con nombre de la artesana, comunidad y región
- Espacio para mensaje personalizable de la empresa
- Packaging con identidad corporativa disponible desde un volumen mínimo a coordinar

**CTA:** `Quiero este formato → WhatsApp`

---

**Formato B — Kit Solo Labubu Amazónico**

**[Diseño: tarjeta con fondo crema o tierra. Imagen de varios labubus juntos sobre superficie de madera. Tono más accesible y de mayor volumen.]**

*Badge terracota:* `🦋 Máximo impacto por unidad`

**Headline:** *El coleccionable que lleva tu marca a la selva peruana.*

**Descripción:**
> Para eventos masivos, ferias o campañas donde el presupuesto por unidad es más ajustado pero el impacto tiene que ser real. Solo el labubu — el animalito de chambira con su tarjeta de artesana — en packaging con tu marca.
>
> Ligero, portable, irrepetible. La gente los colecciona. Cuando una empresa regala el mismo labubu que otra ya regaló, la gente lo nota — por eso trabajamos con pedidos exclusivos o con rotación de animales.

**Lo que incluye:**
- Labubu amazónico en fibra de chambira (animal a coordinar)
- Tarjeta con nombre de la artesana, comunidad y región
- Packaging con logo de la empresa
- Mensaje de marca personalizable

**CTA:** `Quiero este formato → WhatsApp`

---

### 4.7 Personalización

**[Diseño: tabla visual limpia. Fondo blanco. Sin precios. Dos columnas — Kit A y Kit B.]**

**Título:**
> ### Qué se puede personalizar en cada formato.

| Elemento | Kit Planta + Labubu | Kit Solo Labubu |
|---|---|---|
| Logo en maceta (grabado o impreso) | ✔ | — |
| Logo en packaging | ✔ | ✔ |
| Animal específico de labubu | ✔ sujeto a disponibilidad | ✔ sujeto a disponibilidad |
| Mensaje de empresa en tarjeta | ✔ hasta 80 caracteres | ✔ hasta 60 caracteres |
| Elección de especie de planta | ✔ desde volumen a coordinar | — |
| Packaging caja rígida premium | ✔ desde volumen a coordinar | ✔ desde volumen a coordinar |
| Exclusividad del animal por campaña | Consultar | Consultar |
| Informe de impacto personalizado | ✔ | ✔ |

---

**Plazos de producción referenciales:**

**[Diseño: cuatro ítems con ícono de reloj y texto. Sin precios.]**

> **Pedidos pequeños** — hasta 50 unidades: 7–10 días hábiles desde aprobación

> **Pedidos medianos** — 51 a 200 unidades: 12–18 días hábiles desde aprobación

> **Pedidos grandes** — 201 a 500 unidades: 20–30 días hábiles desde aprobación

> **Pedidos especiales** — más de 500 unidades: coordinación directa con anticipación mínima de 45 días

**Nota importante:**
> Los labubus se producen artesanalmente. Los plazos dependen de la disponibilidad de las artesanas. Para pedidos grandes, coordinamos con las comunidades con anticipación para no saturar ningún grupo. La calidad no se negocia por el volumen.

---

### 4.8 El Impacto Que Genera Tu Marca

**[Diseño: sección con fondo verde oscuro profundo. Texto blanco y crema. Datos de impacto destacados visualmente como tarjetas o bloques grandes. Tono de propuesta de valor de RSE.]**

**Título:**
> ### Tu pedido mueve más que tú crees.

**Subtítulo:**
> Cuando eliges el merchandising de impacto, tu empresa se convierte en parte activa de un modelo que beneficia comunidades amazónicas peruanas.

---

**Tres bloques de impacto:**

**Bloque 1 — Para las artesanas:**
> El porcentaje de cada opción Regenerativa o kit de merchandising va directamente a la artesana que tejió el labubu. No a un intermediario, no a una ONG. A ella.
>
> Las artesanas fijan el precio de su trabajo. Jardín Amazónico acepta ese precio. Así funciona el comercio justo real.

**Bloque 2 — Para el bosque:**
> Mientras haya demanda de artesanías de chambira, las comunidades tienen un incentivo económico concreto para mantener el bosque en pie. Un bosque que vale vivo es un bosque que no se tala.

**Bloque 3 — Para tu marca:**
> Junto con cada pedido corporativo entregamos un informe de impacto: nombre de las artesanas que trabajaron en tu encargo, comunidades involucradas y texto sugerido para comunicar el impacto en tus canales internos o externos.
>
> Tu RSE no tiene que ser invisible.

---

**Pull quote de cierre:**

> *"Las plantas son el merchandising más antiguo del mundo. Las usaban los imperios para mostrar poder, los mercaderes para sellar acuerdos, los jardineros para decir 'este lugar importa'."*
> *Tu marca merece lo mismo.*

---

### 4.9 Contacto Directo

**[Diseño: sección final de la página. Fondo crema o blanco. Dos opciones de contacto bien diferenciadas: WhatsApp inmediato y agendar reunión. Sin formulario. Tono directo y ejecutivo.]**

**Título:**
> ### Conversemos. Sin burocracia.

**Subtítulo:**
> No tenemos un formulario largo. Tenemos WhatsApp y una agenda abierta. Cuéntanos qué necesitas y diseñamos la propuesta juntos.

---

**Dos opciones de contacto — [tarjetas lado a lado]:**

**Opción 1 — WhatsApp directo**

**[Diseño: tarjeta verde oscuro. Ícono de WhatsApp. Botón grande y claro.]**

*Badge:* `Respuesta en menos de 24h hábiles`

**Texto:**
> Para consultas rápidas, preguntas sobre disponibilidad o para mandarnos una referencia de lo que tienes en mente.
> Escríbenos por WhatsApp y te respondemos con rapidez.

**Mensaje preformateado sugerido al abrir WhatsApp:**
> *"Hola, soy [nombre] de [empresa]. Me interesa conocer las opciones de [plantas trofeo / merchandising de impacto] para [ocasión o contexto]. ¿Podemos hablar?"*

**CTA:**
> **[Botón verde grande]** 💬 Escribir por WhatsApp →
> *(abre `https://wa.me/51XXXXXXXXX?text=...` con mensaje preformateado)*

---

**Opción 2 — Agendar una reunión**

**[Diseño: tarjeta crema o terracota suave. Ícono de calendario. Botón secundario.]**

*Badge:* `Reunión virtual o presencial en Lima`

**Texto:**
> Para proyectos de mayor escala, encargos recurrentes o cuando quieres discutir la propuesta con calma y ver muestras de las plantas y los labubus en persona.
> Agendamos una reunión de 30 minutos a tu conveniencia.

**CTA:**
> **[Botón contorno verde]** 📅 Agendar reunión →
> *(enlace a Calendly o Google Calendar según la herramienta que use el equipo)*

---

**Texto final de cierre de página:**

> Trabajamos con empresas que quieren que sus acciones comuniquen algo. Si estás aquí, probablemente ya eres una de ellas.

---

---
## Notas Generales de Tono y Estilo

> Este bloque es para el equipo de diseño y contenido. No va en la web.

**Voz de la marca:**
- **Evocadora pero concreta.** Las descripciones de plantas son poéticas, pero los precios, los procesos y las condiciones son claros y directos.
- **Premium sin exclusión.** No hablamos de "lujo" explícitamente — lo mostramos. Los precios empiezan desde S/ 45, lo que hace accesible la entrada.
- **Amazónica sin folclore.** El elemento amazónico es real, documentado y sin romantización forzada. Las artesanas tienen nombres, no son arquetipos.
- **Con criterio, no con moralismo.** No le decimos al cliente que "tiene que" comprar regenerativo. Le mostramos lo que pasa cuando lo hace.

**Palabras que SÍ usamos:**
selva, cuidado, curado, colección, artesana, chambira, escena, comunidad, vivo, crecimiento, temporada, membresía, esqueje, rare, textura, historia, raíces

**Palabras que NO usamos:**
lujo (demasiado explícito), ecológico (genérico), sostenible (sobreusado sin definición), exótico (puede sonar extractivista), natural (vacío), premium (cuando se puede mostrar en vez de decir)

**Recursos fotográficos necesarios:**
1. Plantas en espacios reales de Lima — departamentos de Miraflores, La Molina, San Isidro
2. Artesanas tejiendo en su comunidad — con permiso y con nombres
3. Los labubus sobre superficies de madera y piedra — fondo neutro
4. Unboxing del kit membresía — planta, maceta, labubu, tarjeta
5. Proyectos de paisajismo realizados — oficinas y lobbies
6. Detalle de las macetas (Tierra, Piedra, Selva) vacías y con planta

---

*Documento elaborado para Jardín Amazónico — Mayo 2026*
*Versión 1.0 — Base para diseño y desarrollo de página web*
*Actualizar con datos reales de artesanas, proyectos y métricas de impacto conforme el negocio opere*
