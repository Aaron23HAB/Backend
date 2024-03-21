import getPool from './pool.js';

const releaseConnection = (pool, connection) => {
  if (pool && pool.releaseConnection) {
    pool.releaseConnection(connection);
  }
};

const createNoteCategoryAssociation = async (noteId, categoryId) => {
  let pool;
  let connection;


  try {
    pool = await getPool();
    connection = await pool.getConnection();

    await connection.query(
      'INSERT INTO note_categories (note_id, category_id) VALUES (?, ?)',
      [noteId, categoryId]
    );
  } finally {
    releaseConnection(pool, connection);
  }
};

export { createNoteCategoryAssociation };
