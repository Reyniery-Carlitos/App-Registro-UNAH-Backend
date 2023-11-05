import OracleDB from "oracledb";

export async function fnSPGet(pool, nameSP, estructureSP, inSP) {
  let connection;

  try {
    connection = await pool.getConnection();

    const bindVARS = {
      outVAR: { type: OracleDB.CURSOR, dir: OracleDB.BIND_OUT },
    };

    for (let i = 0; i < inSP.length; i++) {
      bindVARS["variable" + (i + 1)] = inSP[i];
    }

    // Sentencia Dinámica
    let sql = "BEGIN " + nameSP + "(:outVAR";
    for (let i = 0; i < inSP.length; i++) {
      sql += ", :variable" + (i + 1);
    }
    sql += "); END;";

    const result = await connection.execute(sql, bindVARS);

    const resultSet = result.outBinds.outVAR;
    const rows = await resultSet.getRows();

    const queryArray = [];

    for (let i = 0; i < rows.length; i++) {
      let obj = {};

      for (let j = 0; j < estructureSP.length; j++) {
        obj[estructureSP[j]] = rows[i][j];
      }

      queryArray.push(obj);
    }

    await resultSet.close();
    // return JSON.stringify(queryArray, null);
    return queryArray
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error("Error al cerrar la conexión:", error);
      }
    }
  }
}

export async function fnSPCUD(pool, nameSP, inSP) {
  let connection;
  try {
    connection = await pool.getConnection();

    const bindVARS = {
      outVAR: { type: OracleDB.STRING, dir: OracleDB.BIND_OUT },
    };

    for (let i = 0; i < inSP.length; i++) {
      bindVARS["variable" + (i + 1)] = inSP[i];
    }

    // Setnecia Dinámica
    let sql = "BEGIN " + nameSP + "(:outVAR";
    for (let i = 0; i < inSP.length; i++) {
      sql += ", :variable" + (i + 1);
    }
    sql += "); END;";

    const result = await connection.execute(sql, bindVARS);

    const resultSet = result.outBinds.outVAR;

    const queryArray = { mensaje: resultSet };

    return queryArray
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error("Error al cerrar la conexión:", error);
      }
    }
  }
}
