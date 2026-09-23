# GitHub Actions: qué hace y cómo usarlo

GitHub Actions es el sistema que ejecuta tareas automáticamente en los servidores de GitHub. En esta práctica sustituye la revisión manual repetitiva: cada vez que alguien propone un cambio, ejecuta las mismas comprobaciones que habéis ejecutado con `npm run check`.

El archivo que define esa automatización es `.github/workflows/calidad.yml`. Debe estar dentro del repositorio, con ese nombre y esa ruta exacta, para que GitHub lo detecte.

## Antes de crear el pull request

1. Comprobad que tenéis una cuenta de GitHub y acceso de escritura al repositorio. Si el docente os ha dado un repositorio plantilla, cread primero vuestro repositorio desde esa plantilla o aceptad la invitación.
2. Confirmad que la carpeta `.github` está en vuestro proyecto. En terminal podéis comprobarlo con `ls -la .github`.
3. Ejecutad `npm run check`. Es preferible resolver los errores localmente, porque el mismo error también haría fallar la comprobación remota.

## Crear la rama y subir el cambio

Desde la carpeta del proyecto:

```bash
git switch -c feature/priority
git add src tests RIESGO.md
git commit -m "Añade prioridad validada a las tareas"
git push -u origin feature/priority
```

Una rama permite proponer el cambio sin modificar `main` directamente. El comando `git push -u` envía esa rama a GitHub y hace que aparezca la opción de abrir un pull request.

En la página de GitHub, pulsad **Compare & pull request**. Verificad que:

- la rama base es `main`;
- la rama comparada es `feature/priority`;
- el título explica el cambio;
- la descripción indica una prueba válida y una no válida que habéis añadido.

## Leer el resultado

Abríd la pestaña **Checks** del pull request. El trabajo **Calidad SSDLC** contiene estos pasos:

1. Obtiene el código del pull request.
2. Instala Node.js 20 y las dependencias bloqueadas con `npm ci`.
3. Ejecuta el análisis de código (`npm run lint`).
4. Ejecuta las pruebas (`npm test`).
5. Revisa vulnerabilidades de dependencias (`npm run audit`).

Un icono verde significa que todos los pasos han terminado correctamente. Un icono rojo significa que al menos uno falló. Pulsad sobre el paso rojo: el log indica el fichero, la línea o el paquete que ha causado el fallo. Corregidlo en vuestra rama, haced un nuevo commit y `git push`; no hace falta crear otro pull request.

## Configuración del docente: impedir fusiones sin revisión

Tras la primera ejecución correcta, quien administre el repositorio puede ir a **Settings → Branches → Add branch protection rule** y elegir `main`. Activad:

- **Require a pull request before merging**: nadie modifica `main` directamente.
- **Require status checks to pass before merging**: no se puede fusionar si la comprobación falla.
- Seleccionad **Calidad SSDLC** como comprobación obligatoria.

Esto convierte el workflow en una regla real de entrega. Si no tenéis permisos de administración, el resultado verde sigue siendo una evidencia válida para la práctica.
