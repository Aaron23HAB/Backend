import generateError from '../../helper.js';
import getPool from './db.js';
import 'dotenv/config';

let pool = await getPool();

const dropDb = async () => {
  try {
    await pool.query(`DROP DATABASE IF EXISTS ${process.env.DATABASE}`);

    console.log(
      `La base de datos ${process.env.DATABASE} ha sido eliminada correctamente`
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
