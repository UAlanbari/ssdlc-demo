# Guía docente

## Propuesta didáctica

Duración: **3 horas como máximo** (30 + 90 + 60 min). Nivel: CFGS DAM/DAW/ASIR o módulos equivalentes. La base ya está implementada: el alumnado se concentra en una mejora pequeña, dos pruebas y el pipeline.

### Bloque 1 — 30 min

Formad parejas. Explicad que iniciar sesión no autoriza a modificar todos los recursos: la autorización comprueba que el recurso pertenece a la persona autenticada. Mostrad en `src/app.js` la comparación `task.ownerId !== req.user.sub` y ejecutad la prueba «aísla las tareas entre dos usuarios». Pedid que completen `RIESGO.md` a partir de la plantilla, no un modelo de amenazas completo.

### Bloque 2 — 90 min

Entregad el reto único: añadir `priority` con `low`, `medium` o `high`. Recordad que deben cambiar el esquema de entrada, el almacenamiento y la respuesta pública. La corrección mínima exige dos pruebas: aceptar `high` y rechazar `urgente` con código 400. Comprobad que conservan la prueba de aislamiento entre usuarios.

### Bloque 3 — 60 min

Haced que ejecuten `npm run check` antes de crear la rama. Después, seguid la guía de GitHub Actions para subir la rama, abrir el pull request y explicar el resultado. Si el workflow falla por una dependencia ajena al reto, utilizadlo para explicar que un pipeline muestra también riesgos de la cadena de suministro; no hagáis que el alumnado intente actualizar dependencias sin supervisión.

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
