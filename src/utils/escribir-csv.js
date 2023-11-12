import {createObjectCsvWriter} from 'csv-writer'

const createCsvWriter = createObjectCsvWriter

const crearCsv = (rutaArchivo) => {
  const csvWriter = createCsvWriter({
    path: rutaArchivo,
    header: [
      {id: 'dni', title: 'dni'},
      {id: 'nombre_completo', title: 'nombre_completo'},
      {id: 'carrera', title: 'carrera'},
      {id: 'direccion', title: 'direccion'},
      {id: 'correo', title: 'correo'},
      {id: 'centro', title: 'centro'}
    ]
  })

  return csvWriter
}

export default crearCsv