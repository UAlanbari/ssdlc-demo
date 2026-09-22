# GitHub Actions: activación y comprobación

El workflow está en `.github/workflows/calidad.yml`. GitHub lo ejecuta al hacer `push` a `main`, al abrir o actualizar un pull request y también manualmente desde la pestaña **Actions**.

## Pasos para el alumnado

1. Cread un repositorio en GitHub y subid este proyecto, incluida la carpeta oculta `.github`.
2. Cread una rama, por ejemplo `feature/priority`.
3. Haced el cambio y confirmad que `npm run check` termina correctamente en vuestro equipo.
4. Haced push y abrid un pull request hacia `main`.
5. En el pull request, abrid **Checks**. El resultado esperado es **Calidad SSDLC** en verde.

El pipeline instala las versiones bloqueadas con `npm ci` y ejecuta lint, pruebas y auditoría de dependencias. Si falla, abrid el log del paso rojo, corregid el problema y subid un commit nuevo.

## Configuración recomendada para el docente

En **Settings → Branches → Add branch protection rule**, elegid `main` y marcad:

- Require a pull request before merging.
- Require status checks to pass before merging.
- Seleccionad el check `Calidad SSDLC` después de su primera ejecución.

Esta configuración requiere permisos de administración. Si no están disponibles, el estado verde del workflow sigue siendo la evidencia solicitada.
