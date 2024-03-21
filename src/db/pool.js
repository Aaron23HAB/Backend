import mysql from 'mysql2/promise';
import generateError from '../utils/GenerateError.js';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } =
  process.env;

let pool;

const getPool = async () => {
  try {
    if (!pool) {
      pool = await mysql.createPool({
        connectionLimit: 10,
        port: MYSQL_PORT,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: 'Z',
      });
    }

    return await pool;
  } catch (error) {
    generateError('Ha habido un error con la conexión a la base de datos', 500);
  }
};

export default getPool;
