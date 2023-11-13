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

      Formulario con los siguientes datos
  
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
  
    Formulario con los siguientes datos
  
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

  - Obtener datos aspirante: GET http://localhost:3001/api/v1/apirantes/dni 

    dni: es una dni valida del aspirante que se quiera obtener la info por ej. 0801200100569

- **Admisiones**
  - Cargar notas (Solo administradores tienen permisos): POST http://localhost:3001/api/v1/admisiones/cargar-notas

    Formulario con los siguientes datos

  ```
    {
      "notas_aspirantes": csv 
    }
  ``` 

  - Registrar estudiantes (Solo administradores tienen permisos): POST http://localhost:3001/api/v1/admisiones/registrar-estudiantes

    Formulario con los siguientes datos
  
  ```
    {
      "datos_estudiantes": csv
    }
  ```

  - Descargar CSV estudiantes admitidos (Solo administradores tienen permisos): GET http://localhost:3001/api/v1/admisiones/estudiantes-admitidos

- **Centros**
  - Obtener centros: GET http://localhost:3001/api/v1/centros/

  - Obtener centros por id Carrera: GET http://localhost:3001/api/v1/centros/?idCarrera=id

    id = id de una carrera valida por ej. 1

- **Admin**
  - Configurar periodo (Solo administradores tienen permisos): POST http://localhost:3001/api/v1/admin/configuracion-periodo

    Formulario con los siguientes datos

  ```
    {
      "p_fec_nota_ini": "MM/DD/YY",
      "p_fec_nota_fin": "MM/DD/YY",
      "p_periodo_periodo": number,
      "p_periodo_anio": "YYYY",
      "p_periodo_duracion_id": string,
      "p_fec_ini_plan": "MM/DD/YY",
      "p_fec_final_plan": "MM/DD/YY",
      "p_fec_can_exp_ini": "MM/DD/YY",
      "p_fec_can_exp_fin": "MM/DD/YY",
      "p_fec_periodo_ini": "MM/DD/YY",
      "p_fec_periodo_fin": "MM/DD/YY"
    }
  ```

- **Carreras**
  - Obtener carreras: GET http://localhost:3001/api/v1/carreras/

  - Obtener carreras por id centro: http://localhost:3001/api/v1/carreras/?idCentro=id

    id = id de un centro valido por ej. 1

- **Roles**
  - Obtener roles: GET http://localhost:3001/api/v1/roles/

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
- http-status-codes
- csv-writer
- csv-parser
- bcrypt 
- Joi 
- ESLINT

## Scripts ⚒️​
---

### `npm run dev`
Levantar el proyecto en modo de desarrollo

## Desarrolladores ​🦾​

Backend: 

[Carlos Rubio](https://github.com/Reyniery-Carlitos) ​🐺​

Base de datos:

[Luis Lainez](https://github.com/L015) ​​🚀​

[Alex Espinoza](https://github.com/Darnai) ​​🚀​

Frontend:

[Mario Zelaya](https://github.com/MarioZ18) ​​🚀​

[Joel Rodriguez](https://github.com/joelr-2002) ​​🚀​


