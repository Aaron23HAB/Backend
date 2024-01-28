import generateError from '../../../helper';
import newNote from '../../db/notes';

const createNote = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      throw generateError('Es necesario insertar un texto', 400);
    }

    const id = await newNote(req.userId, text);
    res.send({
      status: 'ok',
      message: `Nota con id ${id} creada correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

export default createNote;