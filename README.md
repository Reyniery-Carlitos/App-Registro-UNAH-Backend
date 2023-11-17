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
|     |--- asignaturas
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
|     |--- edificios
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
|     |--- secciones
|     |     |--- controller
|     |     |--- routes
|     |     |--- service
|     |     |--- schema
|     |--- utils
|     |     |--- databaseFunctions
|     |     |--- escribir-csv
|     |     |--- formatearFechas
|     |     |--- generadorId
|     |     |--- generarToken
|     |     |--- transporter
|-----|-----|--- leerCSV
```

## Pruebas API ⚔️​
---
- **Admin**
  - Configurar periodo (Solo administradores tienen permisos): POST http://localhost:3001/api/v1/admin/configuracion-periodo

    JSON con los siguientes datos

  ```
    {
      "periodo": {
        "p_fec_nota_ini": "MM/DD/YY hh:mm:ss",
        "p_fec_nota_fin": "MM/DD/YY hh:mm:ss",
        "p_periodo_periodo": number,
        "p_periodo_anio": "YYYY",
        "p_periodo_duracion_id": string,
        "p_fec_ini_plan": "MM/DD/YY hh:mm:ss",
        "p_fec_final_plan": "MM/DD/YY hh:mm:ss",
        "p_fec_can_exp_ini": "MM/DD/YY hh:mm:ss",
        "p_fec_can_exp_fin": "MM/DD/YY hh:mm:ss",
        "p_fec_periodo_ini": "MM/DD/YY hh:mm:ss",
        "p_fec_periodo_fin": "MM/DD/YY hh:mm:ss"
      },
      "matricula": [
        {
          "p_indice_inicio": number,
          "p_indice_final": number,
          "p_fecha_inicio": "MM/DD/YY hh:mm:ss",
          "p_fecha_final": "MM/DD/YY hh:mm:ss",
          "p_nombre": string,
          "p_periodo_periodo": number,
          "p_periodo_anio": "YYYY",
          "p_periodo_duracion_id": string
        }
      ]
    }
  ```

  - Obtener info siguiente periodo (Solo administradores tienen permisos): GET http://localhost:3001/api/v1/admin/siguiente-periodo?tipoPeriodo=idPeriodo

    idPeriodo = id de un periodo valido por ej. 1
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

- **Asignaturas**
  - Obtener asignaturas por carrera (Solo jefes de depto tienen permisos): GET http://localhost:3001/api/v1/asignaturas/?nEmpleado=nEmpleado

    nEmpleado = Un numero de empleado valido por ej: 20246001040

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

  - Descargar CSV estudiantes admitidos (Solo administradores tienen permisos): GET http://localhost:3001/api/v1/admisiones/estudiantes-admitidos

- **Aulas**
  - Obtener aulas (Solo los jefes de depto tienen permisos): GET http://localhost:3001/api/v1/aulas/?nEmpleado=nEmpleado&edificio=idEdificio

    nEmpleado = nEmpleado ; edificio = idEdificio

    nEmpleado es un numero de empleado valido y edificio es un id de un edificio valido

- **Carreras**
  - Obtener carreras: GET http://localhost:3001/api/v1/carreras/

  - Obtener carreras por id centro: http://localhost:3001/api/v1/carreras/?idCentro=id

    id = id de un centro valido por ej. 1

- **Centros**
  - Obtener centros: GET http://localhost:3001/api/v1/centros/

  - Obtener centros por id Carrera: GET http://localhost:3001/api/v1/centros/?idCarrera=id

    id = id de una carrera valida por ej. 1

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

  - Obtener docentes (Solo administradores y jefes de departamento tienen acceso): GET http://localhost:3001/api/v1/docentes 

  - Obtener docente (Solo docentes tienen acceso): GET http://localhost:3001/api/v1/docentes/nEmpleado

    nEmpleado = Es un numero de empleado valido por ej. 20246001073

- **Edificios**
  - Obtener edificios (Solo los jefes de depto tienen permisos): GET http://localhost:3001/api/v1/edificios/?nEmpleado=nEmpleado

    nEmpleado es un numero de empleado valido por ej. 20246001040

- **Login**: POST http://localhost:3001/api/v1/login
  ```
    {
      "username": string,
      "contrasenia": string
    }
  ```

- **Roles**
  - Obtener roles: GET http://localhost:3001/api/v1/roles/

- **Secciones**
  - Obtener secciones por asignaturas (Solo jefes de depto tienen permisos): GET http://localhost:3001/api/v1/secciones/?cuenta=nCuenta
    
    nCuenta = Un numero de cuenta valido por ej. 20246001040

  - Aumentar cupos (Solo jefes de depto tienen permisos): POST http://localhost:3001/api/v1/secciones/aumentar-cupos

  ```
    {
      "cupos": number,
      "seccion": string
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


