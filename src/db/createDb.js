import generateError from '../utils/GenerateError.js';
import useDb from './useDb.js';
import getPool from './pool.js';
import 'dotenv/config';

const createDb = async () => {
  try {
    const pool = await getPool();
    await pool.query(`
        CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}
        `);
    console.log(
      `La base de datos ${process.env.MYSQL_DATABASE} ha sido creada correctamente`
    );
    await useDb();
  } catch(error) {
    generateError(`Ha habido un error al crear la base de datos ${error}`, 500);
  }
};

createDb();
