import { StatusCodes } from "http-status-codes";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: './src/public/uploads',
  filename: function(_, file, cb) {
    const sufijoUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + sufijoUnico + ext);
  }
});

function filtrarImgs(_, file, cb ) {
  const extPermitidas = ['.jpeg', '.jpg', '.png']
  const extArchivo = path.extname(file.originalname)
  const esExtValida = extPermitidas.includes(extArchivo.toLowerCase())

  if (esExtValida) {
    cb(null, true)
  } else {
    cb(new Error(`Tipo de archivo invalido`), false)
  }
}

export function errorHandler(err, req, res, next) {
  // if (err instanceof multer.MulterError) {
  return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
}

const upload = multer({ storage: storage, fileFilter: filtrarImgs });

export default upload
