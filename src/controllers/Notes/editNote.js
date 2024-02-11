import generateError from '../../../helper.js';
import { getNotebyId, updateNote } from '../../db/notes.js';

const editNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const note = await getNotebyId(id);

    if (!note) {
      throw generateError('La nota no se encontró', 404);
    }
    if (req.userId !== note.user_id) {
      throw generateError(
        'Estás intentando editar una nota que no es tuya',
        401
      );
    }

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
