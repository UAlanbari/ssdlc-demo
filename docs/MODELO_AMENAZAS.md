# Modelo de amenazas: una única situación

Un modelo de amenazas sirve para pensar qué podría salir mal antes de modificar el código. En una práctica corta no vamos a analizar toda la aplicación: nos centraremos en la propiedad de una tarea.

## Situación a analizar

Ana y Bruno tienen cuentas distintas. Ana crea una tarea que recibe el identificador `1`. Bruno intenta enviar una petición para modificar la tarea `1` usando su propio token.

| Pregunta | Respuesta esperada |
|---|---|
| ¿Qué activo se protege? | El contenido y el estado de las tareas de cada persona. |
| ¿Qué podría salir mal? | Bruno podría leer, modificar o borrar la tarea de Ana. |
| ¿Qué impacto tendría? | Pérdida de privacidad e integridad de la información. |
| ¿Qué control existe? | La API compara el propietario guardado con la persona autenticada. |
| ¿Cómo se comprueba? | Una prueba crea dos usuarios; Bruno recibe `404` al intentar cambiar la tarea de Ana. |

## Vuestra tarea

Explicad esta misma situación con vuestras palabras en `RIESGO.md`, usando [PLANTILLA_RIESGO.md](PLANTILLA_RIESGO.md). No añadáis más amenazas ni puntuaciones: lo importante es entender la relación entre riesgo, control y prueba.
