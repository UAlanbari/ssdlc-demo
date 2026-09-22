# Herramientas de calidad y seguridad

## Base (npm)

| Herramienta | Uso | Comando | Qué guardar como evidencia |
|---|---|---|---|
| ESLint | Errores y convenciones | `npm run lint` | Salida y correcciones aplicadas |
| Vitest/Supertest | Comportamiento y regresiones | `npm test` | Salida y pruebas nuevas |
| npm audit | CVE de dependencias | `npm run audit` | Severidad, paquete y decisión |

Actualizad dependencias de forma deliberada: revisad cambios, ejecutad pruebas y documentad cualquier excepción. No uséis `npm audit fix --force` sin revisión.

## Análisis estático con Semgrep (Docker)

No requiere instalación local:

```bash
docker run --rm -v "$PWD:/src" returntocorp/semgrep semgrep --config p/javascript /src
```

Revisad cada resultado en contexto. Un resultado no es una vulnerabilidad confirmada hasta que se reproduce o se justifica técnicamente.

## Detección de secretos con Gitleaks (Docker)

```bash
docker run --rm -v "$PWD:/repo" zricethezav/gitleaks:latest detect --source=/repo --no-git
```

Si aparece un secreto real, revocadlo y sustituidlo: borrarlo de un archivo no basta si ya se publicó en el historial.

## Análisis de imagen

Tras `npm run docker:build`, si se dispone de Trivy:

```bash
trivy image practica-ssdlc:local
```

El Dockerfile usa una imagen Alpine, dependencias de producción y el usuario no privilegiado `node`. Verificad que esos controles continúan presentes tras cada modificación.
