import {createObjectCsvWriter} from 'csv-writer'

const createCsvWriter = createObjectCsvWriter

const crearCsv = (rutaArchivo) => {
  const csvWriter = createCsvWriter({
    path: rutaArchivo,
    header: [
      {id: 'DNI', title: 'DNI'},
      {id: 'PRIORIDAD', title: 'PRIORIDAD'}
    ]
  })

  return csvWriter
}

export default crearCsv