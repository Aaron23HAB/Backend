[![nodejs](https://img.shields.io/badge/Node.js-V20.10.0-green)](https://nodejs.org/en)
[![express](https://img.shields.io/badge/express-V4.18.2-olive)](https://www.npmjs.com/package/express)
[![mysql2](https://img.shields.io/badge/mysql2-V3.6.5-aqua)](https://www.npmjs.com/package/mysql2)
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-V9.0.2-silver)](https://www.npmjs.com/package/jsonwebtoken)
[![bcrypt](https://img.shields.io/badge/bcrypt-V5.1.1-blue)](https://www.npmjs.com/package/bcrypt)
[![dotenv](https://img.shields.io/badge/dotenv-V16.3.1-red)](https://www.npmjs.com/package/dotenv)
[![morgan](https://img.shields.io/badge/mysql2-V1.10.0-aqua)](https://www.npmjs.com/package/morgan)
[![cors](https://img.shields.io/badge/jsonwebtoken-V2.8.5-olive)](https://www.npmjs.com/package/cors)

# App de Notas Backend

**Primera Parte: Desarrollo de una API Backend**

En este documento determina la primera parte del proyecto de la App de Notas, que se enfoca en el desarrollo del Backend. Esta parte es fundamental para el proyecto, ya que esta parte es la encargada de manejar la lógica, almacenamiento y la sincronización con el Frontend.

En esta primera parte tengo como principal objetivo el establecer una solida base técnica que me permita la gestión de los usuarios, el almacenamiento de información de dichos usuarios como pueden ser sus datos principales como las notas que crea, permitiendole editar dichas notas.

En este primer proyecto trabajaremos en lo siguiente:
-Desarrollo de los endpoints que conectaran la parte de node.js con la segunda parte del trabajo que será en react.
-Funcionalidades que utilizará la API, como la gestión de usuarios, de tablas de base de datos y como interactuan entre ellos.
-

# Instrucciones

> [!NOTE]
> Instalar Node.js en su última versión para continuar con los siguiente pasos.

## Primer paso
Instale las dependencias que contiene el proyecto con el siguiente comando
~~~
npm i
~~~
## Segundo Paso
Renombre el archivo .envexample por .env y completa los valores a escepción del apartado del token y la contraseña

## Tercer Paso
Para crear la base de datos hay que introducir el siguiente comando:
```
npm run initDb
```
## Cuarto Paso
Una vez creadas las tablas y la base de datos arrancaremos el proyecto con el siguiente comando:
```
npm start
```

# Dependecias Utilizadas

En este proyecto, a través de Node.js, instalamos en nuestro proyecto una serie de dependencias que utilizaremos para desarrollar nuestra API. Las dependencias son las siguientes:

- bcrypt: "v.5.1.1", bcrypt se encarga de encriptar las contraseñas de nuestros usuarios.
- cors: "v.2.8.5", Cors nos proporciona información sobre peticiones que se realizan a la API.
- dotenv: "v.16.4.1", crea una conexión en el archivo .env.
- express: "v.4.18.2", express nos ayuda en la creación de la API enrutando, ejecutando endpoints y demás ayuda.
- jsonwebtoken: "v.9.0.2", Con esta dependencia crearemos un Token que va asociado a un usuario.
- morgan: "v.1.10.0", gestiona peticiones HTTP.
- mysql2: "v.3.7.0", permite comunicación entre nuestra API y la base de datos.
- eslint: "v.8.56.0", nos ayuda a detectar problemas de escritura de código.
- nodemon: "v.3.0.3", nos permite mantener nuestra API conectada.
- prettier: "v.3.2.2", crea un estandar a la hora de escribir código para que todo tenga la misma forma.

# Scripts

- start: Para arrancar la aplicación.
- dev: para arrancar la aplicación especificamente para el desarrollo de esta.
- initDb: crea la base de datos y sus tablas.
- dropDb: Elimina la base de datos y todo lo que contiene.
- createDb: crea las tablas en una base de datos.

# Funcionamiento de la Aplicación

La aplicacion funciona desde app.js que funciona como entry point, es el archivo encargado de gestionar todas las funcionalidades, rutas y demás.

## Controllers

Tenermos tres tipos de controllers, organizados en carpetas para según que uso se le de. Son los siguientes:
- Controllers de users: Donde están las funcionalidades de cara al usuario tales como el registro, el logearse o el editar perfil.
- Controllers de Notas: estas controlan las funcionalidades de las notas que escriban los usuarios, como crear nota, editarla o borrarla.
- Controllers de categoria: manejan la categoria de las notas.

## Middlewares

Aquí se encuentran las funcionalidades que actúan como intermediarias de las peticiones que se le harán a la aplicación:
- Manejo de errores
- Ruta no encontrada
- Autenticación

## Endpoints

Los endpoints son los elementos a los que se realizan las peticiones por parte de los usuarios a la aplicación. Encontramos dos tipos de endpoints:

### Endpoints de Usuario:

- Registro
- Login
- Edicion de perfil


### Endpoints de Notas:

- crear una nueva nota
- eliminar una nota
- editar una nota
- mostrar una nota completa
- mostrar todas las notas