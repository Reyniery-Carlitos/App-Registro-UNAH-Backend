
import jwt from 'jsonwebtoken'

export default function generarToken2(data) {
  // Establecer el tiempo de expiración en 2 minutos (120 segundos)
  const tiempoExpiracion = 300;

  return jwt.sign(data, 'secretpassword', { expiresIn: tiempoExpiracion });
}