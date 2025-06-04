# 🎵 App Inmersión Musical

Esta es una aplicación básica creada con **Express.js** que servirá como base para desarrollar una plataforma de contenido musical. El objetivo es estructurar bien el proyecto desde el inicio, incluyendo rutas, controladores y recursos multimedia.

---

## 📁 Estructura del proyecto

```
|APPINMERSIONMUSICAL
|    ├──node_modules
|    ├──public
|    |    ├── documents
|    |    ├── images
|    |    ├── others
|    ├──src
|    |    ├── config                # Configuraciones de la app (base de datos, variables)
|    |    ├── controllers           # Lógica que controla las rutas, recibe y responde peticiones
|    |    ├── models                # Definición de los modelos y esquemas para la base de datos
|    |    ├── routes                # Definición de las rutas y endpoints de la aplicación
|    |    ├── templates             # Plantillas o vistas para renderizar HTML
|    ├── .env
|    ├── .gitignore
|    ├── package-lock.json
|    ├── package.json
|    ├── README.md
```


## 🚀 Requisitos previos

- [Node.js](https://nodejs.org/) (versión 14 o superior recomendada)
- npm (ya viene con Node.js)

- [PosgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) (versión 16 o superior recomendada)
- Para que la conexión funcione correctamente, se debe crear un .env con las siguientes variables de entorno
    ```
    -DB_USER=postgres
    -DB_PASSWORD=tu_contraseña
    -DB_HOST=localhost
    -DB_PORT=5432
    -DB_NAME=nombre_de_la_base_de_datos
    ```
---

## 🔧 Instalación

1. Clona el repositorio o descarga los archivos.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Ejecuta:

```bash
npm install
```

4. Luego, ejecuta:

```bash
npm start
```

5. Al final solo abre el enlace de localhost que te proporciona la terminal 'Server is running on http://localhost:3000'


