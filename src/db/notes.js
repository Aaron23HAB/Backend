import generateError from '../../helper.js';
import getPool from './pool.js';

const newNote = async (user_id, title, text, categorie_id) => {
  let connection;
  try {
    connection = await getPool();
    const [result] = await connection.query(
      `
        INSERT INTO notes (user_id, title, text, categorie_id)
        VALUES (?,?,?,?)
        `,
        [user_id, title, text, categorie_id]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const getAllNotes = async () => {
  let connection;

  try {
    connection = await getPool();
    const [result] = await connection.query(`
    SELECT * FROM notes
    `);
    if (result && result.length > 0){
      return result;
    } else {
      return [];
    }
  } finally {
    if (connection) connection.release;
  }
};

const getNotebyId = async (id) => {
  let connection;

  try {
    connection = await getPool();
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
    if (connection) connection.release();
  }
};

const deleteNotes = async (id) => {
  let connection;

  try {
    connection = await getPool();
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
    if (connection) connection.release();
  }
};

const updateNote = async (newTexto, newTitle, id, userId) => {
  let connection;

  try {
    connection = await getPool();
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
    if (connection) connection.release();
  }
};

export { getAllNotes, getNotebyId, deleteNotes, updateNote };
export default newNote;
