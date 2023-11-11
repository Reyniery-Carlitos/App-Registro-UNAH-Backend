const formatearFecha = (fecha) => {
  const fechaAArreglo = fecha.split('/')
  const dia = fechaAArreglo[1]
  const mes = fechaAArreglo[0]
  const anio = fechaAArreglo[2]

  return dia + '/' + mes + '/' + anio
}

export default formatearFecha