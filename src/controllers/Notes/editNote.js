import { editNoteValidate } from '../../utils/joi.js';
import { getNotebyId, updateNote } from '../../db/notes.js';

const editNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const note = await getNotebyId(id);

    const { title, text, category } = note;

    editNoteValidate({ title, text, category })

    note.content = content;
    await updateNote(id, note);

    res.status(200).json({
      status: 'ok',
      message: `La nota con el id ${id} ha sido editada correctamente`,
      editedNote: {
        id: id,
        content: content
      }
    });
  } catch (error) {
    next(error);
  }
};

export default editNote;
