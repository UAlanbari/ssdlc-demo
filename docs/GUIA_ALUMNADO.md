# Guía del alumnado

## Contexto

Sois el equipo que mantiene una API de tareas para un centro educativo. Contiene cuentas, tareas privadas y una ruta de estado. La dirección exige que los cambios pasen controles de seguridad antes de llegar a producción.

Trabajad en equipos de 2–3 personas y entregad los artefactos indicados. El objetivo no es "marcar casillas": cada decisión debe poder justificarse con un riesgo y una evidencia.

## Sesión 1 — Requisitos y diseño (90 min)

1. Leed [REQUISITOS.md](REQUISITOS.md) y transformad cada requisito de seguridad en criterios de aceptación comprobables.
2. Completad el modelo de amenazas de [MODELO_AMENAZAS.md]. Elegid tres amenazas prioritarias y proponed un control para cada una.
3. Abrid una incidencia por amenaza prioritaria: título, impacto, probabilidad, solución y prueba que demostrará el arreglo.

**Entrega:** criterios de aceptación, diagrama de flujo de datos sencillo y registro de riesgos.

## Sesión 2 — Implementación segura (90 min)

1. Instalad dependencias y arrancad el servicio como se indica en el [README](../README.md).
2. Revisad `src/app.js`. Localizad dónde se aplican los controles de autenticación, autorización, validación y tratamiento de errores.
3. Implementad una mejora asignada por el docente (por ejemplo, expiración de sesión, límite de datos, auditoría estructurada o un nuevo rol) sin reducir los controles existentes.
4. Añadid pruebas antes o junto al cambio.

**Regla:** no se aceptan cambios de seguridad sin una prueba automatizada asociada.

## Sesión 3 — Verificación y cadena de suministro (90 min)

Ejecutad:

```bash
npm run lint
npm test
npm run audit
```

Documentad el resultado de cada mandato: fecha, versión de herramienta, resultado, decisión y evidencia (salida o captura). Ejecutad también Semgrep y Gitleaks siguiendo [HERRAMIENTAS.md](HERRAMIENTAS.md).

Para cada hallazgo, clasificadlo como falso positivo, aceptado temporalmente o corregido. Una aceptación temporal necesita responsable y fecha de revisión.

## Sesión 4 — Entrega y operación (60 min)

1. Construid y ejecutad la imagen: `npm run docker:build` y `npm run docker:run`.
2. Verificad desde fuera del contenedor `GET /health` y una operación autenticada.
3. Cumplimentad la lista de [OPERACION.md](OPERACION.md).
4. Haced una revisión cruzada de otro equipo usando la rúbrica resumida.

## Entrega final

- Enlace al repositorio con historial de commits comprensible.
- Carpeta `evidencias/` con resultados de calidad/seguridad y decisiones de hallazgos.
- Modelo de amenazas actualizado.
- Pull request con descripción, pruebas y revisión por pares.
- Demo de 5 minutos: riesgo → control → prueba → resultado.

No incluyáis contraseñas, tokens ni ficheros `.env` en la entrega.
