
## RESTful API para Gestión de Posts

Esta API fue creada para perimitir a los usuarios interactuar con publicaciones (Posts) en una red social, ofreciendo diferentes operaciones según si el usuario está registrado o no.

<img src="https://github.com/carusi99/Notes/assets/151582174/1d3f7320-1e62-4e8c-873c-e6cd4f380717" width="800">

# Requerimientos Técnicos
- **Lenguaje**: TypeScript
- **Backend**: Express.js
- **Autenticación/Autorización**: JWT
- **Arquitectura**: Tres capas (routers, servicios, acceso a datos)
- **Base de Datos**: PostgreSQL
- **Acceso a Datos**: Uso de pg
- **Migraciones**: Implementación con umzug
- **Testing**: Pruebas de endpoints con vitest y supertest
- **Validación de Input**: Uso de Zod
- **Manejo de Errores**: Middleware centralizado
- **Manejo de Entorno**: Uso de variables de entorno con - dotenv
## Características Principales
### Esquema de Base de Datos
La base de datos incluye tres tablas principales: Users, Posts y Likes, cada una con sus respectivos campos y relaciones.

### Especificación de API
La API ofrece endpoints para visualizar posts, interactuar con usuarios registrados, gestionar perfiles de usuario, y registro y autenticación de usuarios.

Para cada endpoint se detalla su descripción, parámetros, respuesta y ejemplos de uso.



## Instalación

- Asegúrese de que sus versiones de NodeJS y npm estén actualizadas para Express ^4.19.2

- Instalar dependencias: npm install or yarn Una pequeña introducción sobre la instalación.

Clone este repositorio

```bash
  git clone https://github.com/codeableorg/postable-carusi99.git
```

Ir al directorio del proyecto

```bash
  cd my-project
```

Instalar dependencias

```bash
  npm install
```

```bash
 Configura las variables de entorno en un archivo .env.
```

Iniciar el servidor

```bash
  npm run start
```
## Cómo probar tu Api de Posts
### utiliza los comandos que estan en tu Package.json para utilizar las migraciones crear tu base de datos, e insertar información a ella.
![Captura de pantalla 2024-05-06 133924](https://github.com/carusi99/Notes/assets/151582174/405c2717-0c92-42fe-b5fe-f54a5e71e35c)

#### Así ejecutas los comandos en la terminal
![Captura de pantalla 2024-05-06 133702](https://github.com/carusi99/Notes/assets/151582174/7460f738-cac8-450e-a787-73ee0e4ca55b)

> [!IMPORTANT]
> debes tener instalada la base de datos de código abierto PostgreSQL.

#### Cómo puedes verificar los servivios:

👩‍💻 Insomnia es una aplicación de escritorio multiplataforma que te permite probar y depurar API RESTful y otros servicios web de una manera fácil y eficiente.

- Instalación de Insomnia: Primero, descarga e instala Insomnia desde su sitio web oficial: [Insomnia](https://insomnia.rest/download)

- Crear un nuevo espacio de trabajo: Abre Insomnia y crea un nuevo espacio de trabajo si aún no tienes uno. - Puedes nombrarlo como desees y organizar tus solicitudes en él.
- Crear una nueva solicitud: Dentro de tu espacio de trabajo, puedes crear una nueva solicitud haciendo clic en el botón "+" en la barra lateral izquierda y seleccionando "New Request". Luego, ingresa la URL de la solicitud y selecciona el método HTTP adecuado (GET, POST, etc.).

![Captura de pantalla 2024-05-06 134530](https://github.com/carusi99/Notes/assets/151582174/3af76f2c-27e9-43f7-ba2f-368032f96cc2)

## Paquetes usados:

- [bcrypt (^5.1.1)](https://www.npmjs.com/package/bcrypt)
- [dotenv (^16.3.1)](https://www.npmjs.com/package/dotenv)
- [express (^4.19.2)](https://www.npmjs.com/package/express)
- [jsonwebtoken (^9.0.2)](https://www.npmjs.com/package/jsonwebtoken)
- [pg (^8.11.5)](https://www.npmjs.com/package/pg)
- [umzug (^3.8.0)](https://www.npmjs.com/package/umzug)
- [vitest (^1.6.0)](https://www.npmjs.com/package/vitest)
- [zod (^3.23.4)](https://www.npmjs.com/package/zod)





## Guía de Contribución
Si deseas contribuir al proyecto, sigue estos pasos:

- Realiza un fork del repositorio.
- Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
- Realiza tus cambios y haz commits (git commit -am 'Agrega nueva funcionalidad').
- Sube tus cambios a la rama (git push origin feature/nueva-funcionalidad).
- Crea un nuevo Pull Request.

## Créditos
Este proyecto fue desarrollado por paolapachecocarusi@gmail.com y se basa en las especificaciones proporcionadas por Codeable Academy.

