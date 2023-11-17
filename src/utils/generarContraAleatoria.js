const caracteres = '123456780abcdefghijklmnopqrstuvwxyz'

const generarContraAleatoria = (tam) => {
  let resultado = ''
  for(let i = 0; i <= tam; i++) {
    resultado += caracteres.at(Math.floor(Math.random() * caracteres.length))
  }

  return resultado
} 

export default generarContraAleatoria