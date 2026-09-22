# Requisitos y criterios de aceptación

## Requisitos funcionales

- RF-01: una persona puede registrar una cuenta con correo y contraseña.
- RF-02: una persona autenticada puede crear, listar, actualizar y borrar sus tareas.
- RF-03: el servicio ofrece un estado mínimo para supervisión técnica.

## Requisitos de seguridad

| ID | Requisito | Criterio de aceptación verificable |
|---|---|---|
| RS-01 | Autenticación | Toda ruta `/api/tasks` devuelve 401 sin un token válido. |
| RS-02 | Autorización | Un usuario no puede leer ni modificar una tarea de otro; se devuelve 404 para no revelar su existencia. |
| RS-03 | Contraseñas | Se exige un mínimo de 12 caracteres y solo se almacena un hash con coste adecuado. |
| RS-04 | Validación | Los campos se validan en servidor, se rechazan propiedades extra y se limitan tamaños. |
| RS-05 | Sesión | Los tokens expiran, tienen emisor y solo se aceptan con el algoritmo esperado. |
| RS-06 | Exposición | Respuestas y errores no devuelven hashes, secretos, trazas ni detalles internos. |
| RS-07 | Abuso | Registro e inicio de sesión disponen de limitación de peticiones. |
| RS-08 | Transporte | Fuera del entorno local, el servicio debe publicarse exclusivamente tras HTTPS. |
| RS-09 | Dependencias | No se liberan vulnerabilidades de severidad alta o crítica sin excepción documentada. |

## Fuera de alcance

Persistencia real, recuperación de contraseña, administración de usuarios y multi-tenancy completo. Si se implementan, deben llevar requisitos y pruebas de seguridad nuevos.
