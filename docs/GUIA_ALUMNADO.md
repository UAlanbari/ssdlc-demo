# Guía del alumnado — práctica SSDLC de 3 horas

## Qué vais a hacer y por qué

Una aplicación que guarda información de distintas personas debe impedir que una persona acceda a los datos de otra. Este principio se llama **autorización**. No basta con iniciar sesión: después de identificarse, el servidor debe comprobar en cada acción que la tarea pertenece a quien la solicita.

En esta práctica trabajaréis en parejas como un equipo de desarrollo. Partís de una API ya protegida y añadiréis una mejora pequeña: un campo de prioridad para cada tarea. El aprendizaje no está en añadir el campo, sino en hacerlo sin debilitar la protección existente y demostrarlo con pruebas automáticas.

La duración máxima es de **3 horas**. El resultado final será un pull request con el cambio, sus pruebas y una comprobación automática en GitHub.

## Antes de empezar (10 min)

Abríd una terminal en la carpeta del proyecto y ejecutad:

```bash
npm install
cp .env.example .env
npm run dev
```

`npm install` descarga las bibliotecas del proyecto. El segundo comando crea vuestra configuración local a partir del ejemplo; el archivo `.env` no debe subirse a GitHub. El último comando inicia la API.

En otra terminal, comprobad que funciona:

```bash
curl http://localhost:3000/health
```

La respuesta esperada es `{"status":"ok"}`. Si no aparece, avisad al docente antes de continuar.

## Bloque 1 — Entender el riesgo (30 min)

### 1. Leed el requisito importante

En [REQUISITOS.md](REQUISITOS.md), localizad **RS-02: Autorización**. Dice que una persona no puede leer ni modificar una tarea de otra. Si este requisito fallase, una persona podría cambiar tareas ajenas solo con conocer o adivinar su identificador.

### 2. Mirad la defensa que ya existe

Abríd `src/app.js` y buscad `task.ownerId !== req.user.sub`. Esa condición compara:

- `task.ownerId`: la cuenta propietaria de la tarea guardada;
- `req.user.sub`: la cuenta que viene dentro del token de la petición.

Cuando no coinciden, la API devuelve `404`. Así no cambia la tarea y tampoco confirma que exista para otra persona.

### 3. Explicad el riesgo con vuestras palabras

Copiad [PLANTILLA_RIESGO.md](PLANTILLA_RIESGO.md) como `RIESGO.md` en la raíz del proyecto y completad sus tres apartados. No hace falta investigar más amenazas: en esta práctica solo evaluamos esta.

**Al terminar este bloque debéis tener:** un `RIESGO.md` breve y saber señalar la comprobación de propiedad en `src/app.js`.

## Bloque 2 — Añadir prioridad de forma segura (90 min)

### Objetivo funcional

Cada tarea tendrá un campo opcional llamado `priority`. Solo admite estos textos: `low`, `medium` o `high`. Si no se envía, la API puede elegir `medium` como valor por defecto.

### 1. Localizad qué modificar

- En `src/app.js`, el objeto `taskSchema` define qué datos acepta la API. Añadid ahí la validación de `priority`.
- En `src/store.js`, `addTask` crea el objeto que se guarda. Conservad la prioridad al crear la tarea.
- En `src/app.js`, `publicTask` define lo que devuelve la API. Incluid también la prioridad para que el cliente pueda verla.

No aceptéis textos libres para la prioridad. Una lista cerrada de valores evita datos inconsistentes, como `urgente`, `HIGH` o valores muy largos.

### 2. Escribid las pruebas

En `tests/api.test.js`, añadid dos pruebas dentro de `describe('API segura de tareas', ...)`:

1. Una petición autenticada que cree una tarea con `priority: 'high'` y compruebe que la respuesta contiene `priority: 'high'`.
2. Una petición autenticada que intente crear una tarea con `priority: 'urgente'` y espere el código HTTP `400`.

Ejecutad las pruebas mientras trabajáis:

```bash
npm test
```

La prueba ya existente «aísla las tareas entre dos usuarios» no debe modificarse ni dejar de pasar. Es vuestra evidencia de que la mejora no rompe la autorización.

### 3. Revisad vuestro cambio

Antes de pasar al bloque siguiente, comprobad que:

- una prioridad válida se guarda y se devuelve;
- una prioridad no permitida devuelve `400`;
- las seis pruebas originales siguen pasando;
- no habéis añadido secretos ni valores de `.env` al código.

**Al terminar este bloque debéis tener:** código de prioridad, dos pruebas nuevas y todas las pruebas en verde.

## Bloque 3 — Comprobar y entregar con GitHub Actions (60 min)

### 1. Ejecutad la revisión local completa

```bash
npm run check
```

Este comando ejecuta tres controles: `lint` busca errores de estilo, `test` busca regresiones y `audit` consulta vulnerabilidades conocidas en las dependencias. Corregid cualquier fallo causado por vuestro cambio antes de subirlo.

### 2. Preparad el pull request

Si el repositorio ya está conectado a GitHub, usad estos comandos sustituyendo el nombre de rama si queréis:

```bash
git switch -c feature/priority
git add src tests RIESGO.md
git commit -m "Añade prioridad validada a las tareas"
git push -u origin feature/priority
```

No ejecutéis `git add .`: podría incluir archivos locales que no forman parte de la entrega. En GitHub, pulsad **Compare & pull request**, elegid como destino `main` y describid brevemente qué validáis y qué pruebas añadisteis.

### 3. Interpretad el resultado automático

En el pull request, abrid la pestaña **Checks**. El workflow **Calidad SSDLC** instalará las dependencias exactamente como están bloqueadas en `package-lock.json` y ejecutará lint, pruebas y auditoría.

- Verde: las comprobaciones han pasado; adjuntad el enlace o una captura.
- Rojo: abrid el paso que falla, leed el mensaje, corregid el problema y haced `git add`, `git commit` y `git push` de nuevo. GitHub vuelve a ejecutar el workflow automáticamente.

Las instrucciones detalladas para activar el repositorio están en [GITHUB_ACTIONS.md](GITHUB_ACTIONS.md).

## Entrega final

- Enlace al pull request.
- Archivo `RIESGO.md` completado.
- Cambio de `priority` y las dos pruebas solicitadas.
- Workflow **Calidad SSDLC** en verde.

No incluyáis contraseñas, tokens ni el fichero `.env` en la entrega.
