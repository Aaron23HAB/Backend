import generateError from '../../helper.js';
import useDb from './useDb.js';
import getPool from './db.js';
import 'dotenv/config';

const createDb = async () => {
  try {
    const pool = await getPool();
    await pool.query(`
        CREATE DATABASE IF NOT EXIST ${process.env.DATABASE}
        `);
    console.log(
      `La base de datos ${process.env.DATABASE} ha sido creada correctamente`
    );
    await useDb;
  } catch(error) {
    generateError(`Ha habido un error al crear la base de datos ${error}`, 500);
  }
};

createDb();
