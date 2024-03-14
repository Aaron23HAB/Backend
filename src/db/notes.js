import generateError from '../utils/GenerateError.js'
import getPool from './pool.js';

const newNote = async (user_id, title, text, categorie_id) => {
  let pool;
  let connection;
  try {
    pool = await getPool();
    const connection = await pool.getConnection();
    
    const [result] = await connection.query(
      `
        INSERT INTO notes (user_id, title, text, categorie_id)
        VALUES (?,?,?,?)
        `,
        [user_id, title, text, categorie_id]
    );

    return result.insertId;
  } finally {
    if (pool && pool.releaseConnection) {
      pool.releaseConnection(connection);
    }
  }
};

const getAllNotes = async () => {
  let pool;
  let connection;

  try {
    pool = await getPool();
    const connection = await pool.getConnection();

    const [result] = await connection.query(`
    SELECT * FROM notes
    `);
    if (result && result.length > 0){
      return result;
    } else {
      return [];
    }
  } finally {
    if (pool && pool.releaseConnection) {
      pool.releaseConnection(connection);
    }
  }
};

const getNotebyId = async (id) => {
  let pool;
  let connection;

  try {
    pool = await getPool();
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      `
    SELECT * FROM notes WHERE id = ?
    `,[id]
    );

    if (result.length === 0) {
      throw generateError(`La nota con id: ${id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (pool && pool.releaseConnection) {
      pool.releaseConnection(connection);
    }
  }
};

const deleteNotes = async (id) => {
  let pool;
  let connection;

  try {
    pool = await getPool();
    connection = await pool.getConnection();

    const [result] = await connection.query(
      `
    DELETE FROM notes WHERE id = ?
    `,[id]
    );

    if (result.affectedRows === 0) {
      throw generateError(`La nota con id: ${id} no existe`, 404);
    }

    return result;
  } finally {
    if (pool && pool.releaseConnection) {
      pool.releaseConnection(connection);
    }
  }
};

const updateNote = async (newTexto, newTitle, id, userId) => {
  let pool;
  let connection;

  try {
    pool = await getPool();
    connection = await pool.getConnection();

    const [result] = await connection.query(
      `
    UPDATE notes SET texto = ?, title = ? WHERE id = ? AND user_id = ?
    `,[newTexto, newTitle, id, userId]
    );

    if (result.affectedRows === 0) {
      throw generateError(`No se encontró ninguna nota con el id: ${id}`, 404);
    }

    return result;
  } catch (error) {
    console.error('Error al actualizar la nota:', error);
    throw new Error('Ocurrió un error al actualizar la nota ');
  } finally {
    if (pool && pool.releaseConnection) {
      pool.releaseConnection(connection);
    }
  }
};

export { getAllNotes, newNote, getNotebyId, deleteNotes, updateNote };

