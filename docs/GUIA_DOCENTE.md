# Guía docente

## Propuesta didáctica

Duración: 4 sesiones de 60–90 minutos. Nivel: CFGS DAM/DAW/ASIR o módulos equivalentes. El proyecto ya aporta una implementación de referencia para que el foco esté en proceso, evidencia y razonamiento de seguridad.

### Dinámica sugerida

1. Formar equipos y asignar roles rotatorios: desarrollo, revisión y responsable de seguridad.
2. Entregar una mejora funcional por equipo y exigir que definan el riesgo antes de programar.
3. Hacer que otro equipo revise el pull request con la rúbrica.
4. Cerrar con una demo donde se muestra una prueba negativa (acceso no autorizado) y la prueba de que se bloquea.

## Retos graduados

| Nivel | Reto | Pistas para evaluación |
|---|---|---|
| Inicial | Añadir prioridad a una tarea | Validación, límite y prueba de entrada incorrecta |
| Intermedio | Añadir filtrado por estado | Evitar parámetros no validados; no filtrar tareas ajenas |
| Intermedio | Registrar eventos de seguridad | No registrar secretos ni datos completos |
| Avanzado | Añadir rol de docente | Matriz explícita de permisos y pruebas por rol |
| Avanzado | Sustituir memoria por BD | Consultas parametrizadas, mínimo privilegio y migraciones |

## Rúbrica (100 puntos)

| Dimensión | Puntos | Evidencia |
|---|---:|---|
| Requisitos y amenazas | 20 | Criterios verificables, amenazas priorizadas |
| Implementación segura | 25 | Controles correctos, código legible, sin secretos |
| Pruebas | 20 | Casos positivos y negativos, regresión de seguridad |
| Herramientas y supply chain | 15 | Resultados revisados y decisiones justificadas |
| Documentación y operación | 10 | Checklist y plan de respuesta realista |
| Revisión por pares y demo | 10 | Comentarios útiles y explicación de evidencia |

Para aprobar, deben obtener al menos la mitad en "Implementación segura" y "Pruebas", aunque el total sea igual o superior a 50.

## Observaciones

- El almacenamiento es efímero por diseño; no presentarlo como patrón de producción.
- El secreto del `.env.example` es un marcador docente. Exigid una variable aleatoria al ejecutar fuera de local.
- En una red de aula sin Internet, pueden ejecutarse ESLint y Vitest tras preparar previamente `node_modules`; los analizadores de contenedor pueden demostrarse en el equipo docente.
