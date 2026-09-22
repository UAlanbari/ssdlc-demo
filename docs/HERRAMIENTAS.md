# Herramientas de la práctica

| Herramienta | Uso | Comando |
|---|---|---|
| ESLint | Revisa errores de código | `npm run lint` |
| Vitest/Supertest | Ejecuta las pruebas | `npm test` |
| npm audit | Busca vulnerabilidades conocidas | `npm run audit` |
| GitHub Actions | Repite las tres comprobaciones en GitHub | Pull request |

Para comprobar todo en local, ejecutad `npm run check`. El pipeline de GitHub Actions usa los mismos comandos; los detalles para activarlo están en [GITHUB_ACTIONS.md](GITHUB_ACTIONS.md).

Docker, Semgrep, Gitleaks y Trivy son útiles en proyectos mayores, pero se han excluido de esta versión para mantenerla realizable en tres horas.
