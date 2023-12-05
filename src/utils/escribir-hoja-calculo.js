import ExcelJS from 'exceljs';

const crearXLSX = async (rutaArchivoXLSX, datos) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Hoja1');

  // Agregar encabezados con estilo
  const encabezadosRow = worksheet.getRow(1);
  encabezadosRow.font = { color: { argb: 'FFFFFFFF' }, bold: true };


  worksheet.columns = [
    { header: 'CUENTA', key: 'N_CUENTA', width: 15 },
    { header: 'NOMBRE', key: 'NOMBRE_COMPLETO', width: 80 },
    { header: 'CORREO', key: 'CORREO', width: 80 }
  ];

  // Agregar datos
  datos.forEach((fila) => {
    worksheet.addRow(fila);
  });

  // Establecer bordes para todas las celdas
  worksheet.eachRow((row) => {
    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

      // Aplicar color azul marino claro (celeste) solo a A1, B1 y C1
      if (row.number === 1 && (colNumber === 1 || colNumber === 2 || colNumber === 3)) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '104d96' } };
      }
    });
  });

  // Escribir el libro en el archivo XLSX
  await workbook.xlsx.writeFile(rutaArchivoXLSX);
};


const crearXLSX2 = async (rutaArchivoXLSX, datos) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Hoja1');

  // Agregar encabezados con estilo
  const encabezadosRow = worksheet.getRow(1);
  encabezadosRow.font = { color: { argb: 'FFFFFFFF' }, bold: true };


  worksheet.columns = [
    
    { header: 'CODIGO_ASIGNATURA', key: 'CODIGO_ASIGNATURA', width: 22 },
    { header: 'ASIGNATURA', key: 'ASIGNATURA', width: 30 },
    { header: 'SECCION', key: 'SECCION', width: 12 },
    { header: 'N_EMPLEADO', key: 'N_EMPLEADO', width: 14 },
    { header: 'DOCENTE', key: 'DOCENTE', width: 40 },
    { header: 'CUPOS', key: 'CUPOS', width: 8 },
    { header: 'EDIFICIO', key: 'EDIFICIO', width: 12 },
    { header: 'AULA', key: 'AULA', width: 8 },
    { header: 'HORA_INICIO', key: 'HORA_INICIO', width: 13 },
    { header: 'HORA_FINAL', key: 'HORA_FINAL', width: 13 },
    { header: 'MATRICULADOS', key: 'MATRICULADOS', width: 15 }
  ];

  // Agregar datos
  datos.forEach((fila) => {
    worksheet.addRow(fila);
  });

  // Establecer bordes para todas las celdas
  worksheet.eachRow((row) => {
    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

      // Aplicar color azul marino claro (celeste) solo a A1, B1 y C1
      if (row.number === 1 && colNumber >= 1 && colNumber <= 11) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '104d96' } };
      }
    });
  });

  // Escribir el libro en el archivo XLSX
  await workbook.xlsx.writeFile(rutaArchivoXLSX);
};

export { crearXLSX, crearXLSX2};