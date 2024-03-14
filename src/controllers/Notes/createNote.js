import {newNote} from '../../db/notes.js';
import { createNoteValidate } from '../../utils/joi.js';

const createNote = async (req, res, next) => {
  try {
    const { title, text, category } = req.body;

    createNoteValidate({ title, text, category })

    const id = await newNote(req.userId, text);
    res.status(201).json({
      status: 'ok',
      message: `Nota con id ${id} creada correctamente`,
      id: id,
      text: text,
    });
  } catch (error) {
    next(error);
  }
};

export default createNote;
