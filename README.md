# App-Registro-UNAH-Backend v1.0.0 💯​
---
Proyecto final clase Ingenieria de software 

- **Catedratico:** Ing. Nestor Luque
- **Comienzo:** 27/10/23
- **Entrega del proyecto:** 06/12/23

## Acerca del proyecto 🔥​
---

Aplicacion backend registro de estudiantes UNAH en la cual se podra realizar un proceso de admision, registro de estudiantes al sistema, administracion de planificacion academica, etc.

## Descripcion ​💥​
---

- Login
  - Autenticacion de usuarios
  - JWT para manejo de tokens de inicios de sesion
- Modulo Administracion
  - Configuracion de usuarios docentes
  - Configuracion de planificacion academica
  - Ingreso de notas y datos para la creacion de estudiantes
- Modulo Docentes
  - Administracion de su propio usuario
  - Ingreso de calificaciones al sistema
- Modulo de Jefe de depto.
  - A
- Modulo de Coordinador
  - A
- Modulo de estudiantes
  - Administrar su propio usuario
  - Ver calificaciones
  - Calificar docentes
  - Realizar matriculas
  - Ver clases restantes
- Modulo de aspirantes
  - Registrarse para un proceso de admision a la UNAH
  - Ver si aprobo o reprobo en su proceso de admision

## Estructuras de carpetas ​👀​
---

Estructura de carpetas modular

```
|--- src
|     |--- admin
|     |     |--- controller
|     |     |--- routes
|     |     |--- service
|     |     |--- schema
|     |--- admisiones
|     |     |--- controller
|     |     |--- routes
|     |     |--- service
|     |     |--- schema
|     |--- aspirantes
|     |     |--- controller
|     |     |--- routes
|     |     |--- service
|     |     |--- schema
|     |--- carreras
|     |     |--- controller
|     |     |--- routes
|     |     |--- service
|     |     |--- schema
|     |--- centros
|     |     |--- controller
|     |     |--- routes
|     |     |--- service
|     |     |--- schema
|     |--- database
|     |     |--- config
|     |--- docentes
|     |     |--- controller
|     |     |--- routes
|     |     |--- service
|     |     |--- schema
|     |--- estudiantes
|     |     |--- controller
|     |     |--- routes
|     |     |--- service
|     |     |--- schema
|     |--- login
|     |     |--- controller
|     |     |--- routes
|     |     |--- service
|     |     |--- schema
|     |--- middlewares
|     |     |--- almacenarArchivo
|     |     |--- validarJWT
|     |     |--- validarRoles
|     |--- public
|     |     |--- csv
|     |     |--- uploads
|     |--- roles
|     |     |--- controller
|     |     |--- routes
|     |     |--- service
|     |     |--- schema
|     |--- utils
|     |     |--- databaseFunctions
|     |     |--- formatearFechas
|     |     |--- generadorId
|     |     |--- generarToken
|-----|-----|--- leerCSV
```

## Pruebas API ⚔️​
---
- **Login**: POST http://localhost:3001/api/v1/login
  ```
    {
      "username": string,
      "contrasenia": string
    }
  ```
- **Docentes:**
  - Crear docentes (Solo administradores tienen permisos): POST http://localhost:3001/api/v1/docentes 

      Formulario con las siguientes opciones
  
  ```
    {
      "dni": string,
      "primer_nombre": string,
      "segundo_nombre": string,
      "primer_apellido": string,
      "segundo_apellido": string,
      "direccion": string,
      "correo_electronico": string,
      "rol_id": string,
      "carrera": string,
      "telefono": string,
      "contrasenia": string,
      "foto_empleado": image
    }
  ```

- **Apirantes:** 
  - Crear aspirantes (Registrarse como aspirante): POST http://localhost:3001/api/v1/apirantes
  
  Formulario con las siguientes opciones
  
  ```
    {
      "dni": string,
      "primer_nombre": string,
      "segundo_nombre": string,
      "primer_apellido": string,
      "segundo_apellido": string,
      "direccion": string,
      "correo_electronico": string,
      "centro_id": string,
      "carrera_principal_id": string,
      "carrera_secundaria_id": string,
      "telefono": string,
      "foto_certificado": image
    }
  ```

## Tecnologias 🛠️
---

- Nodejs
- Expressjs
- OracleDB
- Helmet
- JWT
- Morgan
- Nodemailer
- Multer
- Cors
- StatusCodes

## Scripts ⚒️​
---

### `npm run dev`
Levantar el proyecto en modo de desarrollo

## Desarrolladores ​🦾​
[Carlos Rubio](https://github.com/Reyniery-Carlitos) ​🐺​

