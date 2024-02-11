import generateError from '../../../helper.js';
import newNote from '../../db/notes.js';

const createNote = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      throw generateError('Es necesario insertar un texto', 400);
    }

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
