import getPool from './db.js';

const newNote = async (user_id, title, text, categorie_id) => {
  let connection;
  try {
    connection = await getPool();
    const [result] = await connection.query(
      `
        INSERT INTO notes (user_id, title, text, categorie_id)
        VALUES (?,?,?,?)
        `[(user_id, title, text, categorie_id)]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

export default newNote;