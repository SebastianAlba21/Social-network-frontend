# Red social
## Descripción

La red social está desarrollada en React y cuenta con diferentes rutas para la navegación de los usuarios. Los usuarios pueden acceder a la red social a través de la página de inicio y registrarse para obtener una cuenta o iniciar sesión si ya tienen una cuenta creada. Una vez que los usuarios han iniciado sesión, pueden acceder a diferentes secciones de la red social, como su feed de noticias, la configuración de su perfil, la lista de personas a las que siguen, sus seguidores, y los perfiles de otros usuarios. También tienen la opción de cerrar sesión en cualquier momento.
Rutas

- /: Página de inicio que muestra el formulario de inicio de sesión y el formulario de registro.
- /login: Formulario de inicio de sesión.
- /register: Formulario de registro.
- /social: Página principal de la red social para usuarios autenticados.
- /feed: Muestra las publicaciones de los usuarios a los que sigues.
- /logout: Cierra la sesión del usuario.
- /people: Muestra una lista de personas que podrías seguir.
- /settings: Configuración del perfil de usuario.
- /myfollowing/:userId: Muestra a las personas que sigue el usuario con ID especificado.
- /myfollowers/:userId: Muestra a los seguidores del usuario con ID especificado.
- /profile/:userId: Muestra el perfil del usuario con el ID especificado.
- *: Página de error 404 que se muestra cuando se intenta acceder a una ruta inexistente.

## Instalación

1- Clonar este repositorio.
2- Abrir una terminal y navegar al directorio raíz del proyecto.
3- Ejecutar el comando npm install para instalar las dependencias.
4- Ejecutar el comando npm start para iniciar la aplicación.

## Contribuciones

Las contribuciones son bienvenidas y agradecidas. Si desea contribuir, puede enviar un pull request con sus cambios o informar de algún problema o sugerencia en la sección de issues. Licencia

## Licencia

Este proyecto está bajo la Licencia MIT. Puede consultar el archivo LICENSE para más detalles.
