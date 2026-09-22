# Modelo de amenazas (plantilla STRIDE ligera)

## Activos que proteger

- Credenciales y hashes de contraseña.
- Token de sesión.
- Propiedad y contenido de las tareas.
- Disponibilidad básica de la API.
- Secretos de configuración.

## Flujo de datos

```text
Navegador/cliente --HTTPS--> API Express --memoria (laboratorio)
                       |             |
                       +--> JWT <----+-- secreto de entorno
```

## Tabla inicial

| Amenaza | Categoría | Ejemplo de impacto | Control inicial | Evidencia esperada |
|---|---|---|---|---|
| Suplantación de identidad | Spoofing | Acceso a cuenta ajena | Hash de contraseñas, tokens firmados y expiración | Prueba de login y token inválido |
| Acceso directo a objeto | Elevación/Divulgación | Leer o cambiar tarea de otro | Comprobación de `ownerId` en cada operación | Prueba con dos cuentas |
| Entrada malformada | Manipulación | Datos inesperados o consumo excesivo | Esquemas Zod, límite de cuerpo | Pruebas de validación |
| Fuerza bruta | Denegación de servicio | Bloqueo o acceso por intentos repetidos | Rate limiting en autenticación | Configuración y prueba manual |
| Secreto en repositorio | Divulgación | Firma de tokens comprometida | `.env` ignorado y Gitleaks en CI | Resultado de Gitleaks |
| Dependencia vulnerable | Cadena de suministro | Ejecución o fuga por librería | Versionado, audit y actualización | Resultado de `npm audit` |

## Actividad

Añadid al menos tres filas: una amenaza a disponibilidad, una a privacidad y una a integridad. Priorizad con Impacto (1–5) × Probabilidad (1–5). Todo riesgo de 12 o más necesita tarea correctiva antes de aprobar la entrega.
