# Guía del alumnado — práctica de 3 horas

## Contexto y objetivo

Sois el equipo que mantiene una API de tareas para un centro educativo. Trabajad en parejas durante **un máximo de 3 horas**. El objetivo es aplicar una mejora pequeña, demostrar que está probada y ver cómo GitHub Actions comprueba la entrega.

El riesgo central es que una persona pueda leer o modificar la tarea de otra. La API ya incluye una defensa frente a ese riesgo; debéis localizarla y aseguraros de no romperla.

## Bloque 1 — Entender el riesgo (30 min)

1. Leed [REQUISITOS.md](REQUISITOS.md).
2. En [MODELO_AMENAZAS.md](MODELO_AMENAZAS.md), completad solamente la fila de acceso a tarea ajena: impacto, control y prueba.
3. Cread una incidencia breve o un archivo `RIESGO.md`: qué puede ocurrir, cómo lo evitáis y cómo demostraréis que funciona. Máximo media página.

## Bloque 2 — Cambio y prueba (90 min)

1. Instalad dependencias y arrancad el servicio siguiendo el [README](../README.md).
2. Revisad `src/app.js` y localizad la comprobación que impide modificar una tarea ajena.
3. Añadid a las tareas el campo `priority`, con los valores permitidos `low`, `medium` o `high`.
4. Añadid dos pruebas: una que acepte un valor válido y otra que rechace un valor incorrecto.

**Regla:** el cambio no puede reducir los controles existentes ni las pruebas que ya pasan.

## Bloque 3 — Verificación y GitHub Actions (60 min)

Ejecutad:

```bash
npm run check
```

Subid el cambio a una rama y abrid un pull request hacia `main`. Seguid [GITHUB_ACTIONS.md](GITHUB_ACTIONS.md): el workflow **Calidad SSDLC** debe quedar en verde.

## Entrega final

- Enlace al pull request.
- Cambio de `priority` y sus dos pruebas.
- `RIESGO.md` o incidencia breve.
- Captura o enlace de GitHub Actions en verde.

No incluyáis contraseñas, tokens ni ficheros `.env` en la entrega.
