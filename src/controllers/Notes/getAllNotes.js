import { getAllNotes } from '../../db/notes.js';

const getAllNote = async (req, res, next) => {
  try {
    const notes = await getAllNotes();
    res.status(200).json({
      status: 'ok',
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllNote;
