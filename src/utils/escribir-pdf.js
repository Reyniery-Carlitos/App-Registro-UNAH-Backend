import { PDFDocument,StandardFonts, rgb,degrees } from 'pdf-lib';
import * as fs from 'fs/promises';



const crearPDF = async (rutaArchivoPDF, datos) => {
  const pdfDoc = await PDFDocument.create();

  
  const page = pdfDoc.addPage([1100, 600]);
 
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBOLDFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
 
  const fontSize = 10;
  const crearColorRGB = (r, g, b) => rgb(r / 255, g / 255, b / 255);

  
  // Ejemplo de colores personalizables
  const colorHeader = crearColorRGB(34, 88, 173);


  // Creacion de los bordes del header
  page.drawRectangle({ x: 48, y: 545,    width: 1002,    height: 20,    color: colorHeader,    borderColor: rgb(0, 0, 0), borderWidth: 0.5 });

  //Creacion de los headers
  page.drawText('CODIGO_ASIGNATURA', { x: 50 , y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });
  page.drawText('ASIGNATURA', { x: 172, y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });
  page.drawText('SECCION', { x: 340, y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });
  page.drawText('N_EMPLEADO', { x: 395, y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });
  page.drawText('DOCENTE', { x: 475, y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });
  page.drawText('CUPOS', { x: 682, y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });
  page.drawText('EDIFICIO', { x: 724, y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });
  page.drawText('AULA', { x: 775, y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });
  page.drawText('HORA_INICIO', { x: 815, y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });
  page.drawText('HORA_FINAL', { x: 890, y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });
  page.drawText('MATRICULADOS', { x: 963, y: 550,size: fontSize, font:helveticaBOLDFont , color: rgb(1, 1, 1) });

  // Add data
  datos.forEach((fila, index) => {
    const yPosition = 530 - index * 20; // Adjust the vertical position as needed
    page.drawText(fila.CODIGO_ASIGNATURA, { x: 51 , y: yPosition, size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 48  ,y:yPosition-5,width: 122,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 });
    page.drawText(fila.ASIGNATURA, { x: 173, y: yPosition, size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 170 ,y:yPosition-5,width: 168,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 });
    page.drawText(fila.SECCION, { x: 341, y: yPosition, size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 338 ,y:yPosition-5,width: 55,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 });
    page.drawText(fila.N_EMPLEADO, { x: 396, y: yPosition, size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 393 ,y:yPosition-5,width: 80,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 });
    page.drawText(fila.DOCENTE, { x: 476, y: yPosition, size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 473 ,y:yPosition-5,width: 207,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 });
    page.drawText(fila.CUPOS.toString(), { x: 683, y: yPosition , size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 680 ,y:yPosition-5,width: 42,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 });
    page.drawText(fila.EDIFICIO, { x: 725, y: yPosition , size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 722 ,y:yPosition-5,width: 51,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 });
    page.drawText(fila.AULA, { x: 776, y: yPosition , size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 773 ,y:yPosition-5,width: 41,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 });
    page.drawText(fila.HORA_INICIO, { x: 817, y: yPosition , size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 814 ,y:yPosition-5,width: 75,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 })
    page.drawText(fila.HORA_FINAL, { x: 892, y: yPosition , size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 889 ,y:yPosition-5,width: 73,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 });
    page.drawText(fila.MATRICULADOS.toString(), { x: 965 ,y: yPosition , size: fontSize, font:helveticaFont });
    page.drawRectangle({ x: 962 ,y:yPosition-5,width: 88,height: 20,borderColor: rgb(0, 0, 0), borderWidth: 0.2 });

  });

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(rutaArchivoPDF, pdfBytes);
};
 
const crearPDF2 = async (rutaArchivoPDF,encabezado,historial) => {


  const pdfDoc = await PDFDocument.create();
const contador=1;
let UVS=0;
let NOTAUV=0;
const selloUNAHImg = await fs.readFile('./src/utils/UNAH-sello.png');
const logoUNAHImg = await fs.readFile('./src/utils/UNAH-escudo.png');

  
  const page = pdfDoc.addPage([595, 742]);
  const crearColorRGB = (r, g, b) => rgb(r / 255, g / 255, b / 255);
  // Ejemplo de color del fondo de agua
  const colorLOGO = crearColorRGB(232, 235, 240);
  const colorPerfil = crearColorRGB(0.30,0.33,0.51);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const selloUNAH = await pdfDoc.embedPng(selloUNAHImg);
    const logoUNAH = await pdfDoc.embedPng(logoUNAHImg);
  const helveticaBOLDFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);


  page.drawImage(logoUNAH, {    x: 30,y: 635,width: 50,height: 80 });


  const fontSize = 210;
  const fontSize2 = 18;
  const fontSize3 = 15;
  const fontSize4 = 15;
  const fontSize5 = 12;
  const fontSize6 = 10;

//MARCA DE AGUA




  //HEADER PRINCIPAL
  const texto = 'UNAH';
  const widthFont = helveticaBOLDFont.widthOfTextAtSize(texto, fontSize);

  page.drawText(texto, { x:  295-widthFont/8, y: 401-fontSize*1.6,size: fontSize, font:helveticaBOLDFont , color: colorLOGO,rotate: degrees(60) });
  page.drawRectangle({ x: 40, y: 540,    width: 235,    height: 80,    color: colorPerfil,opacity:0.1});
  page.drawRectangle({ x: 280, y: 540,    width: 275,    height: 80,    color: colorPerfil,opacity:0.1});
  page.drawRectangle({ x: 40, y: 500,    width: 515,    height: 22,    color: colorPerfil,opacity:0.1});
  page.drawImage(selloUNAH, {    x: 245,y: 321,width: 100,height: 150 });
  const widthFont2 = helveticaBOLDFont.widthOfTextAtSize('Universidad Nacional Autónoma de Honduras', fontSize2);
  page.drawText('Universidad Nacional Autónoma de Honduras', { x:  300-widthFont2/2, y: 690,size: fontSize2, font:helveticaBOLDFont , color: rgb(0,0,0) });
  const widthFont3 = helveticaBOLDFont.widthOfTextAtSize('Dirección de Ingresos Permanencia y Promoción', fontSize3);
  page.drawText('Dirección de Ingresos Permanencia y Promoción', { x:  300-widthFont3/2, y: 670,size: fontSize3, font:helveticaBOLDFont , color: rgb(0,0,0) });
  const widthFont4 = helveticaBOLDFont.widthOfTextAtSize('Historial Académico', fontSize4);
  page.drawText('Historial Académico', { x:  297.5-widthFont4/2, y: 650,size: fontSize4, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('Cuenta:', { x:  60, y: 590,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('Nombre:', { x:  60, y: 575,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('Apellido:', { x:  60, y: 560,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('Carrera Actual:', { x:  300, y: 590,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('Centro:', { x:  300, y: 575,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('Indice:', { x:  300, y: 560,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });


  //RELLENO DATOS PERFIL
const nombre = encabezado[0].NOMBRE_ALUMNO.split(' ');

  page.drawText(encabezado[0].N_CUENTA, { x:  120, y: 590,size: fontSize6, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText(nombre[0].toUpperCase() + " " + nombre[1].toUpperCase(), { x:  120, y: 575,size: fontSize6, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText(nombre[2].toUpperCase() + " " + nombre[3].toUpperCase(), { x:  120, y: 560,size: fontSize6, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText(encabezado[0].CARRERA.toUpperCase(), { x:  395, y: 590,size: fontSize6, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText(encabezado[0].CENTRO.toUpperCase(), { x:  350, y: 575,size: fontSize6, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText(encabezado[0].INDICE.toString(), { x:  345, y: 560,size: fontSize6, font:helveticaBOLDFont , color: rgb(0,0,0) });

  historial.forEach((fila, index) => {
  
    
  const widthFont5 = helveticaBOLDFont.widthOfTextAtSize(encabezado[0].CARRERA, fontSize3);
  page.drawText(encabezado[0].CARRERA, { x:  297.5-widthFont5/2, y: 506,size: fontSize3, font:helveticaBOLDFont , color: rgb(0,0,0) });
  const widthFont6 = helveticaBOLDFont.widthOfTextAtSize('____________________________'+fila.AÑO.toString()+'____________________________', fontSize3);
  page.drawText('____________________________'+fila.AÑO.toString()+'____________________________', { x:  297.5-widthFont6/2, y: 470,size: fontSize3, font:helveticaBOLDFont , color: rgb(0,0,0) });
 
  //HISTORIAL COMO TAL
  page.drawText('CODIGO', { x:  45, y: 440,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('NOMBRE', { x:  100, y: 440,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('UV', { x:  404, y: 440,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('PERIODO', { x:  426, y: 440,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('NOTA', { x:  486, y: 440,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });
  page.drawText('OBS', { x:  525, y: 440,size: fontSize5, font:helveticaBOLDFont , color: rgb(0,0,0) });

  console.log(fila.AÑO)

  const posiciony = index*16;
  page.drawText(fila.ASIGNATURA_COD, { x:  45, y: 420 - posiciony,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  page.drawText(fila.NOMBRE_ASIGNATURA, { x:  100, y: 420 - posiciony,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  page.drawText(fila.UV.toString(), { x:  407, y: 420 - posiciony,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  page.drawText(fila.PERIODO.toString(), { x:  452, y: 420 - posiciony,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  page.drawText(fila.CALIFICACION.toString(), { x:  497, y: 420 - posiciony,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  
  let obs;
  if(fila.CALIFICACION==0){
    obs='NSP'
  }else if(fila.CALIFICACION>=65){
    obs='APR'
  }else{
    obs='RPD'
  }

  UVS+=fila.UV
  NOTAUV+=fila.UV*fila.CALIFICACION;
  page.drawText(obs, { x:  526, y: 420 - posiciony,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  page.drawText('"La Educación es la Primera Necesidad UNAH de La República"', { x:  20, y: 20,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  page.drawText("Pagina "+ contador, { x:  530, y: 20 ,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });  
  
  });

  const pageEnd = pdfDoc.addPage([595, 742]);

  pageEnd.drawText(nombre[0].toUpperCase() + " "+ nombre[1].toUpperCase() + " " +nombre[2].toUpperCase() + " "+ nombre[3].toUpperCase(), { x:  20, y: 710,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  const widthFont7 = helveticaFont.widthOfTextAtSize('_____________________________________________________', fontSize2);
  pageEnd.drawText("_____________________________________________________", { x:  297.5-widthFont7/2, y: 705,size: fontSize2, font:helveticaFont , color: rgb(0,0,0) });
  pageEnd.drawText(encabezado[0].N_CUENTA, { x:  510, y: 710,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  pageEnd.drawText('CALCULO DE INDICE ACADEMICO', { x:  40, y: 665,size: fontSize6, font:helveticaBOLDFont , color: rgb(0,0,0) });
  pageEnd.drawText('SUMA UVxNOTA:', { x:  40, y: 640,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  pageEnd.drawText('SUMA UV:', { x:  40, y: 625,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  pageEnd.drawText('INDICE ACADEMICO:', { x:  40, y: 610,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  //resultados
  pageEnd.drawText(NOTAUV.toString(), { x:  160, y: 640,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  pageEnd.drawText(UVS.toString(), { x:  160, y: 625,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  const INDICEFINAL=NOTAUV/UVS;

  pageEnd.drawText(NOTAUV.toString()+"/"+ UVS.toString()+" = "+INDICEFINAL.toString(), { x: 160, y: 610,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  pageEnd.drawText(texto, { x:  295-widthFont/8, y: 401-fontSize*1.6,size: fontSize, font:helveticaBOLDFont , color: colorLOGO,rotate: degrees(60) });
  pageEnd.drawImage(selloUNAH, {    x: 245,y: 321,width: 100,height: 150 }); 
  pageEnd.drawText('"La Educación es la Primera Necesidad UNAH de La República"', { x:  20, y: 20,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });
  pageEnd.drawText("Pagina "+ (contador + 1), { x:  530, y: 20 ,size: fontSize6, font:helveticaFont , color: rgb(0,0,0) });  
  
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(rutaArchivoPDF, pdfBytes);
};



export { crearPDF,crearPDF2 };
