import getPool from './pool.js';

const createNoteCategoryAssociation = async (noteId, categoryId) => {
  const connection = await getPool(); 

  try {
    await connection.query(
      'INSERT INTO note_categories (note_id, category_id) VALUES (?, ?)',
      [noteId, categoryId]
    );
  } finally {
    connection.release(); 
  }
};

export { createNoteCategoryAssociation };
