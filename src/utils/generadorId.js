export const generarNumeroCuenta = (lastId) => {
  return new Date().getFullYear() + '1' + (lastId + 1).toString().padStart(6, '0')
}

export const generarNumeroEmpleado = (lastId) => {
  return new Date().getFullYear() + '6' + (lastId + 1).toString().padStart(6, '0')
}

export const generarId = () => {
  return Math.floor(Math.random() * 99999999).padStart(8, '0')
}