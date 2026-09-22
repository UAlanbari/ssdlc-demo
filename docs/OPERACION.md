# Lista de comprobación para operación

## Antes de desplegar

- [ ] `NODE_ENV=production`.
- [ ] `JWT_SECRET` es aleatorio, tiene al menos 32 caracteres y procede de un gestor de secretos.
- [ ] `.env` no se ha versionado ni copiado a la imagen Docker.
- [ ] `ALLOWED_ORIGIN` es un origen concreto, no un comodín.
- [ ] El proxy inverso obliga HTTPS y establece redirección desde HTTP.
- [ ] `npm run check` finaliza correctamente.
- [ ] Semgrep, Gitleaks y el escaneo de imagen se han revisado.
- [ ] No hay vulnerabilidades altas/críticas sin excepción aprobada.

## Monitorización mínima

Registrar de forma estructurada: marca temporal, ruta, código HTTP y un identificador de petición. Nunca registrar contraseñas, tokens, cookies, cuerpos completos ni datos personales innecesarios.

Alertar ante: aumento de errores 5xx, crecimiento de 401/429, caída de `/health`, vulnerabilidades nuevas de dependencias y cambios no autorizados de configuración.

## Respuesta a un incidente

1. Contener: limitar exposición o retirar la versión afectada.
2. Preservar evidencias: logs y versión desplegada, con acceso restringido.
3. Erradicar: corregir causa y rotar secretos potencialmente expuestos.
4. Recuperar: desplegar versión verificada y vigilar indicadores.
5. Aprender: registrar causa, impacto, acciones y una prueba que evite regresión.
