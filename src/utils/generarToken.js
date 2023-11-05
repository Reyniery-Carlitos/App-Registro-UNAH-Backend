import jwt from 'jsonwebtoken'

export default function generarToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET);
}