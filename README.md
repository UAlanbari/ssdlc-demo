# Práctica SSDLC: Gestor de tareas seguro

Proyecto didáctico para alumnado de Formación Profesional. Simula el ciclo de vida de desarrollo seguro (SSDLC) mediante una API REST de un gestor de tareas.

> **Uso exclusivamente educativo y local.** No contiene secretos reales ni debe desplegarse en producción.

## Objetivos

Al terminar, el alumnado podrá:

1. convertir requisitos en criterios de seguridad verificables;
2. identificar riesgos con un modelo de amenazas ligero;
3. implementar validación de entrada, autenticación, autorización y manejo de errores;
4. ejecutar pruebas, análisis de código y auditoría de dependencias;
5. comprobar automáticamente una entrega con GitHub Actions.

## Inicio rápido

Requisitos: Node.js 20 LTS o superior y npm 10 o superior. Docker es opcional y queda fuera de la actividad básica.

```bash
npm install
cp .env.example .env
npm run dev
```

La API se expone en `http://localhost:3000`. Comprueba su estado con `curl http://localhost:3000/health`.

Para ejecutar todas las verificaciones locales:

```bash
npm run check
```

## Itinerario de la práctica

La secuencia y los entregables están en [docs/GUIA_ALUMNADO.md](docs/GUIA_ALUMNADO.md). El profesorado dispone de la planificación, rúbrica y solución esperada en [docs/GUIA_DOCENTE.md](docs/GUIA_DOCENTE.md).

| Fase SSDLC | Artefacto | Herramienta |
|---|---|---|
| Requisitos | Historias y criterios de aceptación | `docs/REQUISITOS.md` |
| Diseño | Modelo de amenazas y decisiones | `docs/MODELO_AMENAZAS.md` |
| Implementación | API con controles de seguridad | Express, Zod, bcrypt |
| Verificación | Pruebas automatizadas | Vitest, Supertest |
| Verificación | Resultado de calidad y dependencias | ESLint, Vitest, npm audit |
| Entrega | Pipeline automático | GitHub Actions |

## Rutas principales

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado de servicio, sin datos sensibles |
| POST | `/api/auth/register` | Crea una cuenta local de laboratorio |
| POST | `/api/auth/login` | Inicia sesión y devuelve un token de corta duración |
| GET | `/api/tasks` | Lista únicamente las tareas del usuario autenticado |
| POST | `/api/tasks` | Crea una tarea del usuario autenticado |
| PATCH | `/api/tasks/:id` | Actualiza una tarea propia |
| DELETE | `/api/tasks/:id` | Elimina una tarea propia |

## Herramientas incluidas

- **Vitest + Supertest:** pruebas unitarias e integración.
- **ESLint:** calidad de código.
- **npm audit:** vulnerabilidades conocidas de dependencias.
- **GitHub Actions:** ejecuta esas tres comprobaciones en cada push y pull request.

Consulta [docs/HERRAMIENTAS.md](docs/HERRAMIENTAS.md) y [docs/GITHUB_ACTIONS.md](docs/GITHUB_ACTIONS.md) para ejecutar y activar la práctica.

## Estructura

```text
src/                 API y controles de seguridad
tests/               pruebas automatizadas
docs/                material docente, amenazas y entregables
.github/workflows/   pipeline CI de referencia
Dockerfile           imagen de ejecución mínima
```

## Licencia y adaptación

Material preparado para clase. Se puede adaptar citando el origen y conservando el aviso de uso educativo.
