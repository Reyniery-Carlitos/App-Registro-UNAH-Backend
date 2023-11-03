import * as fs from "fs";
import parser from "csv-parser";

// Lee el archivo csv
export function leerCSV(archivo) {
  return new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream(archivo)
      .pipe(
        parser({
          separator: ",",
          newline: "\n",
          cast: true,
          comment: "#"
        })
      )
      
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

