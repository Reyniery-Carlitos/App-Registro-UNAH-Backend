import MySql from 'mysql';

const connection = MySql.createConnection({
    host: '192.168.191.114',
    user: 'userchat',
    password: '1234',
    database: 'chatregistro'
});

connection.connect((err) => {
    if (err) {
        console.log('Error de conexión a la base de datos: ', err);
        return;
    } else {
        console.log('Conexión a la base de datos exitosa')
    }
});

export default connection;