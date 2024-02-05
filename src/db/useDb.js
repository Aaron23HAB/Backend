import generateError from '../../helper.js';
import getPool from './db.js';
import 'dotenv/config';

const useDb = async () => {
  try {
    const pool = await getPool();
    await pool.query(
      `
        USE ${process.env.DATABASE}
        `,
      500
    );
    console.log('Base de datos en uso');
  } catch (error) {
    generateError('No se puede acceder a la base de datos', 500);
  }
};

export default useDb;
