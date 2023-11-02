import OracleDB from 'oracledb';

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
};

let pool;

async function createPool() {
    try {
        pool = await OracleDB.createPool(dbConfig);
        console.log('Pool de conexiones exitosos');
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