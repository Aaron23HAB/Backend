import getPool from './pool.js';

const getAllCategories = async () => {
  let connection;
  try {
    connection = await getPool();
    const [rows] = await connection.query('SELECT * FROM categories');
    return rows;
  } finally {
    if (connection) connection.release();
  }
};

const createCategory = async (name) => {
  let connection;
  try {
    connection = await getPool();
    const [result] = await connection.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );
    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

export { getAllCategories, createCategory };
