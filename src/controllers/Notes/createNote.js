import {newNote} from '../../db/notes.js';
import { createNoteValidate } from '../../utils/joi.js';
import { createNoteCategoryAssociation } from '../../db/noteCategories.js';

const createNote = async (req, res, next) => {
  try {
    const { title, text, categoryIds } = req.body;

    createNoteValidate({ title, text, categoryIds })

    const noteId = await newNote(req.userId, text);

    for (const categoryId of categoryIds) {
      await createNoteCategoryAssociation(noteId, categoryId);
    }

    res.status(201).json({
      status: 'ok',
      message: `Nota con id ${noteId} creada correctamente`,
      id: noteId,
      text: text,
    });
  } catch (error) {
    next(error);
  }
};

export default createNote;
