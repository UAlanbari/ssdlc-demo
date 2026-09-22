# Guía docente

## Propuesta didáctica

Duración: **3 horas como máximo** (30 + 90 + 60 min). Nivel: CFGS DAM/DAW/ASIR o módulos equivalentes. La base ya está implementada: el alumnado se concentra en una mejora pequeña, dos pruebas y el pipeline.

1. Formar parejas y entregar el reto único: añadir `priority` con tres valores permitidos.
2. Guiar los primeros 30 minutos con el requisito RS-02 y la prueba existente de dos usuarios.
3. Reservar la última hora para crear el pull request y revisar el resultado de GitHub Actions.

## Rúbrica (100 puntos)

| Dimensión | Puntos | Evidencia |
|---|---:|---|
| Riesgo identificado | 20 | Explica impacto, control y prueba |
| Implementación | 35 | Prioridad validada; no reduce controles existentes |
| Pruebas | 25 | Caso válido y caso inválido |
| GitHub Actions | 20 | Pull request con workflow en verde |

Para aprobar, deben obtener al menos la mitad en «Implementación» y «Pruebas», aunque el total sea igual o superior a 50.

## Ampliación opcional

Si un equipo termina antes, puede añadir filtrado por estado. Debe validar el parámetro y no permitir ver tareas ajenas.

## Observaciones

- El almacenamiento es efímero por diseño; no es un patrón de producción.
- El secreto de `.env.example` es un marcador docente. Exigid una variable aleatoria fuera de local.
- En una red de aula sin Internet, preparad previamente `node_modules`; GitHub Actions necesitará conectividad.
