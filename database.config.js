import OracleDB from 'oracledb';

const dbConfig = {
    user: 'C##DBAUNAH',
    password: '1234',
    connectString: '192.168.191.113:1521/XE',
};

let pool;

async function createPool() {
    try {
        pool = await OracleDB.createPool(dbConfig);
        return pool; // Devolvemos el pool para poder usarlo fuera del módulo
        
    } catch (error) {
        console.error("Error al crear el pool de conexiones:", error);
        throw error; // Lanzamos el error para manejarlo fuera del módulo
    }
}

process.on('SIGINT', async () => {
    try {
        await pool.close();
        console.log("Pool de conexiones cerrado.");
    } catch (error) {
        console.error("Error al cerrar el pool de conexiones:", error);
    } finally {
        process.exit(0);
    }
});

export default createPool;