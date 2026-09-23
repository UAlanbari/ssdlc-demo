# Riesgo: acceso a tareas ajenas

## Qué podría ocurrir

Explicad en una o dos frases qué podría hacer una persona si la API no comprobase quién es el propietario de una tarea.

Si la API no comprobase quién es el propietario de una tarea, una persona podría leer, modificar o eliminar tareas que pertenecen a otra simplemente conociendo o adivinando su identificador. Esto permitiría manipular información ajena sin autorización.

## Cómo lo evita la aplicación

Indicad que la API compara `task.ownerId` con `req.user.sub` antes de actualizar o eliminar una tarea. Explicad qué representa cada valor.

La API compara task.ownerId con req.user.sub antes de actualizar o eliminar una tarea.

task.ownerId representa la cuenta propietaria de la tarea almacenada.

req.user.sub representa la identidad del usuario que hace la petición, obtenida del token JWT.

Si no coinciden, la API devuelve 404, evitando revelar la existencia de la tarea y bloqueando cualquier modificación.

## Cómo lo demostramos

Indicad el nombre de la prueba que usa dos personas distintas y el resultado esperado: la segunda persona recibe `404` y no modifica la tarea de la primera.

La prueba automática “una persona no puede modificar tareas de otra” usa dos usuarios distintos. El primer usuario crea una tarea y el segundo intenta modificarla. El resultado esperado es que el segundo usuario recibe 404 y la tarea del primero permanece sin cambios.