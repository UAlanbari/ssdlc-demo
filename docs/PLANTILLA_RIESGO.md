# Riesgo: acceso a tareas ajenas

## Qué podría ocurrir

Explicad en una o dos frases qué podría hacer una persona si la API no comprobase quién es el propietario de una tarea.

## Cómo lo evita la aplicación

Indicad que la API compara `task.ownerId` con `req.user.sub` antes de actualizar o eliminar una tarea. Explicad qué representa cada valor.

## Cómo lo demostramos

Indicad el nombre de la prueba que usa dos personas distintas y el resultado esperado: la segunda persona recibe `404` y no modifica la tarea de la primera.
