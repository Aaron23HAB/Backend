import generateError from '../utils/GenerateError.js';
import getPool from './pool.js';
import 'dotenv/config';

let pool = await getPool();

const dropDb = async () => {
  try {
    await pool.query(`DROP DATABASE IF EXISTS ${process.env.MYSQL_DATABASE}`);

    console.log(
      `La base de datos ${process.env.MYSQL_DATABASE} ha sido eliminada correctamente`
    );
  } catch (error) {
    generateError(
      'Se ha producido un error al intentar eliminar la base de datos',
      500
    );
  } finally {
    process.exit();
  }
};

dropDb();
