import generateError from '../../helper.js';
import getPool from './db.js';
//import generateError from '../../helper.js';

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

const getAllNotes = async () => {
  let connection;

  try {
    connection = await getPool();
    const [result] = await connection.query(`
    SELECT * FROM ntoes ORDER BY created_at DESC
    `);
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const getNotebyId = async (id) => {
  let connection;

  try {
    connection = await getPool();
    const [result] = await connection.query(`
    SELECT * FROM notes ORDER BY created_at DESC
    `[id]);

    if(result.length === 0){
      throw generateError(`La nota con id: ${id} no existe`, 404);
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const deleteNotes = async (id) => {
  let connection;

  try {
    connection = await getPool();
    const [result] = await connection.query(`
    SELECT * FROM notes WHERE id = ?
    `[id]);

    if(result.length === 0){
      throw generateError(`La nota con id: ${id} no existe`, 404);
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

export { newNote, getAllNotes, getNotebyId, deleteNotes };


